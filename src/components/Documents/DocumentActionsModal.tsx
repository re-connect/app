import * as React from 'react';
import { Linking } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import DocumentContext from '../../context/DocumentContext';
import FolderContext from '../../context/FolderContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { useMoveDocumentOutOfFolder, useRenameItem, useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import ActionsModalContent from './Components/ActionsModalContent';
import PickFolder from './Components/PickFolder';
import Rename from './Components/Rename';
import SendByEmailForm from './SendByEmailForm';
// import ReactNativeBlobUtil from 'react-native-blob-util';

interface Props {
  document: DocumentInterface;
  close: () => void;
}

const DocumentActionsModal: React.FC<Props> = ({ document, close }) => {
  const { documentUrl } = useShowDocument(document.id);
  const [pickingFolder, pickingFolderActions] = useBoolean(false);
  const [showSendEmailForm, showSendEmailFormActions] = useBoolean(false);
  const { triggerRenameDocument, showForm, showFormActions, isUpdating, hasBeenRenamed } = useRenameItem(document);
  const itemEndpoint = document.is_folder ? `folders/${document.id}` : `documents/${document.id}`;
  const itemContext = document.is_folder ? FolderContext : DocumentContext;
  const { deleteItem, isDeleting, hasBeenDeleted } = useDeleteData(itemContext, itemEndpoint, document.id);
  const { isMovingOut, triggerMoveDocumentOutOfFolder, hasBeenMoved } = useMoveDocumentOutOfFolder(document);
  const isLoading = isMovingOut || isUpdating || isDeleting;

  const needToCloseModal = hasBeenDeleted || hasBeenMoved || hasBeenRenamed;

  needToCloseModal && close();

  const actions = {
    delete: deleteItem,
    view: () => {},
    moveOut: triggerMoveDocumentOutOfFolder,
    pickFolder: pickingFolderActions.setTrue,
    showRenameForm: showFormActions.setTrue,
    showSendEmailForm: showSendEmailFormActions.setTrue,
  };

  if (showSendEmailForm) {
    return <SendByEmailForm document={document} close={close} onSubmit={showSendEmailFormActions.setFalse} />;
  }

  if (!document.is_folder) {
    actions.view = () => Linking.openURL(documentUrl).then(() => close());
  }

  if (showForm) {
    return (
      <Rename
        close={showFormActions.setFalse}
        closeModal={close}
        onSubmit={triggerRenameDocument}
        document={document}
      />
    );
  }

  if (pickingFolder) {
    return <PickFolder document={document} onPick={pickingFolderActions.setFalse} close={close} />;
  }

  return <ActionsModalContent document={document} close={close} isLoading={isLoading} actions={actions} />;
};

export default DocumentActionsModal;
