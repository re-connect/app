import { DocumentInterface } from '../types/Documents';

const removeDocumentById = (list: DocumentInterface[], documentId: number) => [
  ...list.filter((item: DocumentInterface) => item.id !== documentId),
];

export const findNestedDocument = (list: DocumentInterface[], documentId: number) =>
  [
    ...list.filter((document: DocumentInterface) => !document.is_folder),
    ...list
      .filter((document: DocumentInterface) => document.is_folder)
      .map((document: DocumentInterface) => document.documents || [])
      .flat(1),
  ].find((document: DocumentInterface) => document.id === documentId);

export const findNestedItem = (list: DocumentInterface[], documentId: number) =>
  [
    ...list,
    ...list
      .filter((document: DocumentInterface) => document.is_folder)
      .map((document: DocumentInterface) => document.documents || [])
      .flat(1),
  ].find((document: DocumentInterface) => document.id === documentId);

const findDocumentById = (list: DocumentInterface[], id: number) =>
  list.find((item: DocumentInterface) => item.id === id);

const findDocumentInFolderById = (list: DocumentInterface[], id: number, folderId: number) => {
  const folder = list.find((document: DocumentInterface) => document.id === folderId);
  if (!folder || !folder.documents) {
    return null;
  }

  return folder.documents.find((document: DocumentInterface) => document.id === id);
};

export const findDocument = (list: DocumentInterface[], id: number, folderId?: number) =>
  folderId ? findDocumentInFolderById(list, id, folderId) : findDocumentById(list, id);

const updateDocument = (list: DocumentInterface[], newDocument: DocumentInterface) =>
  list.reduce((accumulator: DocumentInterface[], item: DocumentInterface) => {
    if (item.id === newDocument.id) {
      return [...accumulator, newDocument];
    } else {
      return [...accumulator, item];
    }
  }, []);

export const updateDocumentInList = (list: DocumentInterface[], document: DocumentInterface) => {
  if (document.folder_id) {
    const folder = findDocumentById(list, document.folder_id);
    if (!folder || !folder.documents) {
      return list;
    }
    return [
      ...removeDocumentById(list, folder.id),
      {
        ...folder,
        documents: updateDocument(folder.documents, document),
      },
    ];
  }
  return updateDocument(list, document);
};

export const findFolders = (list: DocumentInterface[]) =>
  list.filter((document: DocumentInterface) => !!document.is_folder);
