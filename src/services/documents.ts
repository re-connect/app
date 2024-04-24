import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Platform } from 'react-native';
import { apiEndpoint } from '../appConstants';
import { DocumentInterface } from '../types/Documents';
import { ImageInterface } from '../types/Image';
import { handleError } from './errors';
import { checkNetworkConnection } from './networking';
import { makeAuthenticatedUrlv2, makeRequestv2 } from './requests';

export const addDocumentsToFormData = (data: any, documents: Partial<ImageInterface & File>[]): FormData => {
  documents.forEach(document => {
    if (document.path) {
      const fileData = {
        name: document.filename ? document.filename : `${new Date().getTime()}.jpg`,
        type: !document.type ? 'image/jpeg' : document.type,
        size: !document.size ? 0 : document.size,
        uri: Platform.OS === 'android' ? document.path : document.path.replace('file://', ''),
      };
      data.append('files[]', fileData);
    }
  });

  return data;
};

/* istanbul ignore next */
export const addBase64ToFormData = (data: any, image: string): FormData => {
  data.append('files[]', {
    name: `scan-${format(new Date(), 'dd-MM-yyyy')}.jpeg`,
    type: 'image/jpeg',
    uri: `data:image/jpeg;base64,${image}`,
  });

  return data;
};

/* istanbul ignore next */
export const uploadBase64 = async (image: string, beneficiaryId: number) => {
  try {
    const isConnected = await checkNetworkConnection();
    if (!isConnected) {
      return;
    }

    const token = await AsyncStorage.getItem('accessToken');
    const data = new FormData();
    const body = addBase64ToFormData(data, image);
    const response = await fetch(`${apiEndpoint}/beneficiaries/${beneficiaryId}/documents?access_token=${token}`, {
      method: 'POST',
      body: body,
    });
    const json = await response.json();
    return json.files;
  } catch (error: any) {
    handleError(error);
  }
};

export const uploadDocuments = async (
  images: Partial<ImageInterface & File>[],
  beneficiaryId: number,
  folderId?: number,
) => {
  try {
    const isConnected = await checkNetworkConnection();
    if (!isConnected) {
      return;
    }

    const token = await AsyncStorage.getItem('accessToken');
    const data = new FormData();
    const body = addDocumentsToFormData(data, images);

    const response = await fetch(`${apiEndpoint}/beneficiaries/${beneficiaryId}/documents?access_token=${token}`, {
      method: 'POST',
      body: body,
    });
    const files = await response.json();

    if (folderId) {
      Promise.all(
        files.map(async (file: { id: number; folder_id?: number }) => {
          file.folder_id = folderId;
          await makeRequestv2(`/documents/${file.id}/folder/${folderId}`, 'PATCH');
        }),
      );
    }

    return files;
  } catch (error: any) {
    handleError(error);

    return null;
  }
};

export const showDocument = async (documentId: number, size?: string): Promise<string | undefined> => {
  try {
    const endpoint = !size ? `/documents/${documentId}` : `/documents/${documentId}/${size}`;
    const url = await makeAuthenticatedUrlv2(endpoint);

    return url;
  } catch (error: any) {
    handleError(error);
    return;
  }
};

export const findFolderDocuments = (documents: DocumentInterface[], folderId: number): DocumentInterface[] => {
  const folder = documents.find(
    (document: DocumentInterface): boolean => document.id === folderId && !!document.is_folder,
  );
  if (!folder || !folder.documents) {
    return [];
  }

  return folder.documents;
};

export const renameItem = async (document: DocumentInterface, name: string) => {
  try {
    const url = `/${document.is_folder ? 'folders' : 'documents'}/${document.id}/name`;
    const response = await makeRequestv2(url, 'PATCH', { name });

    return response;
  } catch (error: any) {
    handleError(error);

    return null;
  }
};
