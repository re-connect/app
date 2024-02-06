import * as React from 'react';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import DocumentContext from '../../context/DocumentContext';
import FolderContext from '../../context/FolderContext';
import { findBy } from '../../helpers/dataHelper';
import { useFetchDocuments, useOpenItem } from '../../hooks/DocumentsHooks';
import { useFetchFolders } from '../../hooks/FoldersHooks';
import { AnyDataInterface } from '../../types/Data';
import { DocumentInterface } from '../../types/Documents';
import List from '../UI/List';
import DocumentCardActions from './DocumentCardActions';
import { UseBooleanActions, useBoolean } from 'react-hanger/array';

export interface DocumentsListWrapperProps {
  folderId?: number;
}

const getDocumentName = (item: AnyDataInterface) => item.nom;
const getRightComponent =
  (
    item: DocumentInterface,
    setCurrentDocument: (document: AnyDataInterface) => void,
    openModalActions: UseBooleanActions,
  ) =>
  () => (
    <DocumentCardActions document={item} setCurrentDocument={setCurrentDocument} openModalActions={openModalActions} />
    );
const getEndpoint = (item?: AnyDataInterface) => (item && item.is_folder ? 'folders' : 'documents');
const getDataContext = (item?: AnyDataInterface) => (item && item.is_folder ? FolderContext : DocumentContext);

const DocumentsListWrapper: React.FC<DocumentsListWrapperProps> = ({ folderId }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const fetchDocuments = useFetchDocuments(current?.subject_id);
  const fetchFolders = useFetchFolders(current?.subject_id);
  const documentContext = React.useContext(DocumentContext);
  const folderContext = React.useContext(FolderContext);
  const openItem = useOpenItem();
  const [isModalOpen, openModalActions] = useBoolean(false);

  let isFetching = fetchFolders.isFetching || fetchDocuments.isFetching;
  const documents = findBy(documentContext.list, { folder_id: folderId });
  const [currentDocument, setCurrentDocument] = React.useState<AnyDataInterface | null>(null);
  const folders = folderContext.list.filter(item => item.is_folder && item?.dossier_parent?.id === folderId);
  const list = [...folders, ...documents];

  const fetchDocumentsAndFolders = async () => {
    await fetchDocuments.triggerFetch();
    await fetchFolders.triggerFetch();
    isFetching = fetchFolders.isFetching || fetchDocuments.isFetching;
  };

  const onPress = (item: AnyDataInterface) => openItem(item);

  return (
    <List
      currentDocument={currentDocument}
      isModalOpen={isModalOpen}
      openModalActions={openModalActions}
      data={list}
      onItemPress={onPress}
      isFetchingData={isFetching}
      triggerFetchData={fetchDocumentsAndFolders}
      hasThumbnail
      getName={getDocumentName}
      getItemRightComponent={(item: AnyDataInterface) => getRightComponent(item, setCurrentDocument, openModalActions)}
      getDataContext={getDataContext}
      getLeftActionEndpoint={getEndpoint}
      getRightActionEndpoint={getEndpoint}
    />
  );
};

export default DocumentsListWrapper;
