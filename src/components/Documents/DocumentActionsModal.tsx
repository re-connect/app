import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import DocumentContext from '../../context/DocumentContext';
import FolderContext from '../../context/FolderContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { useMoveDocumentOutOfFolder, useRenameItem } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import ActionsModalContent from './Components/ActionsModalContent';
import PickFolder from './Components/PickFolder';
import Rename from './Components/Rename';
import SendByEmailForm from './SendByEmailForm';

interface Props {
  document: DocumentInterface;
  isSingleDocumentAction?: boolean;
  close: () => void;
}

const DocumentActionsModal: React.FC<Props> = ({ document, isSingleDocumentAction, close }) => {
  const [pickingFolder, pickingFolderActions] = useBoolean(false);
  const [showSendEmailForm, showSendEmailFormActions] = useBoolean(false);
  const { triggerRenameDocument, showForm, showFormActions, isUpdating } = useRenameItem(document);
  const itemEndpoint = document.is_folder ? `folders/${document.id}` : `documents/${document.id}`;
  const itemContext = document.is_folder ? FolderContext : DocumentContext;
  const { deleteItem, isDeleting } = useDeleteData(itemContext, itemEndpoint, document.id);
  const { isMovingOut, triggerMoveDocumentOutOfFolder } = useMoveDocumentOutOfFolder(document);
  const isLoading = isMovingOut || isUpdating || isDeleting;
  const actions = {
    delete: deleteItem,
    moveOut: triggerMoveDocumentOutOfFolder,
    pickFolder: pickingFolderActions.setTrue,
    showRenameForm: showFormActions.setTrue,
    showSendEmailForm: showSendEmailFormActions.setTrue,
  };

  if (showSendEmailForm) {
    return <SendByEmailForm document={document} onSubmit={showSendEmailFormActions.setFalse} />;
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

  return (
    <ActionsModalContent
      document={document}
      close={close}
      isLoading={isLoading}
      actions={actions}
      isSingleDocumentAction={!!isSingleDocumentAction}
    />
  );
};

export default DocumentActionsModal;
