import {
  basicDocument,
  basicDocumentInFolder,
  documentsAndFoldersList,
  documentsList,
} from '../../fixtures/documentsFixtures';
import { findFolders, updateDocumentInList } from '../documentsHelper';

describe('updateDocumentInList', () => {
  it('should update the b_prive field in the object', () => {
    const initialList = [...documentsList, basicDocument];
    expect(initialList.length).toBe(3);
    expect(initialList[2].b_prive).toBe(false);
    const updatedDocument = { ...basicDocument, b_prive: true };
    const newList = updateDocumentInList(initialList, updatedDocument);
    expect(newList.length).toBe(3);
    expect(newList[2].b_prive).toBe(true);
  });
  it('should return the list if the folder document is not found', () => {
    const initialList = [...documentsAndFoldersList, basicDocumentInFolder];
    const updatedDocument = { ...basicDocumentInFolder, folder_id: 9999 };
    const newList = updateDocumentInList(initialList, updatedDocument);
    expect(newList).toEqual(initialList);
  });
  it('should not add the document if it does not exist', () => {
    expect(documentsList.length).toBe(2);
    const newList = updateDocumentInList(documentsList, basicDocument);
    expect(newList.length).toBe(2);
  });
  it('should update the document in a folder', () => {
    expect(documentsAndFoldersList.length).toBe(3);
    const newDocument = { ...basicDocumentInFolder, b_prive: true };
    expect(documentsAndFoldersList[2].documents.length).toBe(3);
    expect(documentsAndFoldersList[2].documents[1].b_prive).toBe(false);
    const newList = updateDocumentInList(documentsAndFoldersList, newDocument);
    expect(newList).toBeDefined();
    expect(newList.length).toBe(3);
    expect(newList[2].documents[1].b_prive).toBe(true);
  });
});

describe('findFolders', () => {
  it('Should return only folders', () => {
    const list = [...documentsAndFoldersList];
    expect(list.length).toBe(3);
    const folders = findFolders(list);
    expect(folders.length).toBe(1);
    expect(folders[0].is_folder).toBeTruthy();
  });
  it('Should return only folders', () => {
    const list = [...documentsList];
    expect(list.length).toBe(2);
    const folders = findFolders(list);
    expect(folders.length).toBe(0);
  });
});
