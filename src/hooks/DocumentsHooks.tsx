import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useBoolean } from 'react-hanger';
import { useBoolean as useBooleanArray } from 'react-hanger/array';
import { Alert } from 'react-native';
//@ts-ignore
import RNGeniusScan from '@thegrizzlylabs/react-native-genius-scan';
import { geniusSdkLicense } from '../appConstants';
import DocumentContext from '../context/DocumentContext';
import FolderContext from '../context/FolderContext';
import { updateDatumInList } from '../helpers/dataHelper';
import { renameItem, showDocument, uploadDocuments } from '../services/documents';
import { makeRequestv2 } from '../services/requests';
import t from '../services/translation';
import { DocumentInterface, ScannedGeniusDocumentInterface } from '../types/Documents';
import { FolderInterface } from '../types/Folder';
import { ImageInterface } from '../types/Image';

export const useFetchDocuments = (beneficiaryId?: number) => {
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const { list, setList } = React.useContext(DocumentContext);
  const triggerFetch = React.useCallback(async () => {
    try {
      setIsFetching(true);
      if (beneficiaryId) {
        const documents = await makeRequestv2(`/beneficiaries/${beneficiaryId}/documents`, 'GET');
        if (documents && JSON.stringify(documents) !== JSON.stringify(list)) {
          setList(documents);
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      Alert.alert(t.t('error_fetching_documents'));
    }
  }, [beneficiaryId, list, setList]);

  React.useEffect(() => {
    triggerFetch();
  }, []);

  return { list, isFetching, triggerFetch };
};

export const useScanDocument = () => {
  const triggerScanDocument = async (): Promise<ScannedGeniusDocumentInterface> => {
    await RNGeniusScan.setLicenseKey(geniusSdkLicense, /* autoRefresh = */ true);
    const geniusImageScanned: ScannedGeniusDocumentInterface = await RNGeniusScan.scanWithConfiguration({
      source: 'camera',
      jpegQuality: 100,
      multiPageFormat: 'pdf',
      pdfPageSize: 'a4',
      defaultFilter: 'none',
    });

    return geniusImageScanned;
  };

  return { triggerScanDocument };
};

export const useUploadDocument = (beneficiaryId?: number, folderId?: number) => {
  const isUploadingDocument = useBoolean(false);
  const { list, setList } = React.useContext(DocumentContext);

  const triggerDocumentUpload = async (images: Partial<ImageInterface & File>[]) => {
    isUploadingDocument.setTrue();
    if (!beneficiaryId) {
      isUploadingDocument.setFalse();
      return;
    }
    const response = await uploadDocuments(images, beneficiaryId, folderId);
    if (response) {
      setList([...response, ...list]);
      Alert.alert(images.length > 1 ? t.t('files_added') : t.t('file_added'));
    } else {
      Alert.alert(t.t('error_loading_document'));
      throw new Error('Error uploading documents');
    }
    isUploadingDocument.setFalse();
  };

  return { isUploadingDocument, triggerDocumentUpload };
};

export const useShowDocument = (documentId: number) => {
  const [documentUrl, setDocumentUrl] = React.useState<string>('');
  const [previewUrl, setDocumentPreviewUrl] = React.useState<string>('');

  const memoizedShowDocument = React.useCallback(async () => {
    try {
      const url = await showDocument(documentId);
      const previewUrl = await showDocument(documentId, 'large');
      setDocumentUrl(!url ? '' : url);
      setDocumentPreviewUrl(!previewUrl ? '' : previewUrl);
    } catch (error) {
      Alert.alert(t.t('error_fetching_documents'));
    }
  }, [documentId]);

  React.useEffect(() => {
    memoizedShowDocument();
  }, [memoizedShowDocument]);

  return { documentUrl, previewUrl };
};

export const useShowThumbnail = (document: DocumentInterface) => {
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>('');

  const memoizedShowThumbnail = React.useCallback(async () => {
    try {
      const url = await showDocument(document.id, 'thumbnails');
      setThumbnailUrl(!url ? '' : url);
    } catch (error) {
      Alert.alert(t.t('error_fetching_documents'));
    }
  }, [document.id]);

  React.useEffect(() => {
    memoizedShowThumbnail();
  }, [memoizedShowThumbnail]);

  return thumbnailUrl;
};

export const useShowPreview = (documentId: number) => {
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>('');

  const showPreview = React.useCallback(async () => {
    try {
      const url = await showDocument(documentId, 'thumbnails');
      setThumbnailUrl(!url ? '' : url);
    } catch (error) {
      Alert.alert(t.t('error_fetching_documents'));
    }
  }, [documentId]);

  React.useEffect(() => {
    showPreview();
  }, [showPreview]);

  return thumbnailUrl;
};

export const useOpenItem = () => {
  const navigation: any = useNavigation<any>();

  const triggerOpenItem = React.useCallback(
    (item: DocumentInterface | FolderInterface) => {
      if (!item) {
        return;
      }
      if (item.is_folder && item.beneficiaire) {
        navigation.push('Folder', {
          folderId: item.id,
          beneficiaryId: item.beneficiaire.id,
        });
      } else {
        navigation.push('Document', {
          id: item.id,
        });
      }
    },
    [navigation],
  );

  return triggerOpenItem;
};

export const useRenameItem = (item: DocumentInterface | FolderInterface) => {
  const { list: documentsList, setList: setDocumentsList } = React.useContext(DocumentContext);
  const { list: foldersList, setList: setFoldersList } = React.useContext(FolderContext);
  const [showForm, showFormActions] = useBooleanArray(false);
  const [isUpdating, isUpdatingActions] = useBooleanArray(false);
  const hasBeenRenamed = useBoolean(false);

  const triggerRenameDocument = async (name: string): Promise<void> => {
    try {
      isUpdatingActions.setTrue();
      const renamedItem = await renameItem(item, name);
      if (renamedItem) {
        if (item.is_folder) {
          setFoldersList(updateDatumInList(foldersList, item.id, { ...item, nom: name }));
        } else {
          setDocumentsList(updateDatumInList(documentsList, item.id, { ...item, nom: name }));
        }
      }
      isUpdatingActions.setFalse();
      showFormActions.setFalse();
      hasBeenRenamed.setTrue();
    } catch {
      Alert.alert(t.t('error_renaming_document'));
      isUpdatingActions.setFalse();
    }
  };

  return {
    triggerRenameDocument,
    showForm,
    showFormActions,
    isUpdating,
    hasBeenRenamed: hasBeenRenamed.value,
  };
};

export const useMoveDocumentInFolder = () => {
  const { list, setList } = React.useContext(DocumentContext);
  const [isMovingIn, isMovingActions] = useBooleanArray(false);
  const hasMoved = useBoolean(false);
  const openItem = useOpenItem();

  const triggerMoveDocumentIntoFolder = async (document: DocumentInterface, folder: DocumentInterface) => {
    try {
      isMovingActions.setTrue();
      const updatedFile = await makeRequestv2(`/documents/${document.id}/folder/${folder.id}`, 'PATCH');
      setList([
        ...list.map((document: DocumentInterface) => {
          return document.id === updatedFile.id ? updatedFile : document;
        }),
      ]);
      openItem(folder);
      isMovingActions.setFalse();
      hasMoved.setTrue();
    } catch {
      isMovingActions.setFalse();
      Alert.alert(t.t('error_generic'));
    }
  };

  return { isMovingIn, triggerMoveDocumentIntoFolder, hasMoved: hasMoved.value };
};

export const useMoveDocumentOutOfFolder = (document: DocumentInterface) => {
  const { list, setList } = React.useContext(DocumentContext);
  const navigation = useNavigation<any>();
  const [isMovingOut, setIsMovingOut] = React.useState<boolean>(false);
  const hasBeenMoved = useBoolean(false);

  const triggerMoveDocumentOutOfFolder = async () => {
    try {
      setIsMovingOut(true);
      const folderId = document.folder_id;
      if (folderId) {
        const newDocument = await makeRequestv2(`/documents/${document.id}/get-out-from-folder`, 'PATCH');
        setList([
          ...list.map((document: DocumentInterface) => {
            return document.id === newDocument.id ? newDocument : document;
          }),
        ]);
        setIsMovingOut(false);
        hasBeenMoved.setTrue();
      }
      navigation.goBack();
    } catch {
      setIsMovingOut(false);
      Alert.alert(t.t('error_generic'));
    }
  };

  return { isMovingOut, triggerMoveDocumentOutOfFolder, hasBeenMoved: hasBeenMoved.value };
};

export const useSendDocumentByEmail = (document: DocumentInterface) => {
  const [isSending, isSendingActions] = useBooleanArray(false);
  const isSent = useBoolean(false);

  const triggerSendDocumentByEmail = async (email: string) => {
    try {
      if (!email) {
        return;
      }
      isSendingActions.setTrue();
      await makeRequestv2(`/documents/${document.id}/share`, 'POST', { email });
      isSendingActions.setFalse();
      Alert.alert(t.t('document_successfully_sent_by_email') + email);
      isSent.setTrue();
    } catch {
      isSendingActions.setFalse();
      Alert.alert(t.t('error_generic'));
    }
  };

  return { isSending, triggerSendDocumentByEmail, isSent: isSent.value };
};
