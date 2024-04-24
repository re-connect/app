import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import prompt from 'react-native-prompt-android';
import FolderContext from '../context/FolderContext';
import { makeRequestv2 } from '../services/requests';
import t from '../services/translation';
import { useFetchData } from './DataHooks';

export const useFetchFolders = (id?: number) => {
  return useFetchData(FolderContext, !id ? null : `beneficiaries/${id}/folders`);
};

export const useCreateFolder = (beneficiaryId?: number, parentFolderId?: number) => {
  const [isCreatingFolder, actions] = useBoolean(false);
  const { list, setList } = React.useContext(FolderContext);

  const triggerCreateFolder = React.useCallback(async () => {
    try {
      actions.setTrue();
      if (beneficiaryId) {
        prompt(
          t.t('folder_name'),
          '',
          [
            { text: 'Cancel', onPress: () => {}, style: 'cancel' },
            {
              text: 'OK',
              onPress: async (name: string) => {
                const params: { nom: string; dossier_parent_id?: number } = { nom: name };
                if (parentFolderId) {
                  params.dossier_parent_id = parentFolderId;
                }
                const createdFolder = await makeRequestv2(`/beneficiaries/${beneficiaryId}/folders`, 'POST', params);
                if (createdFolder) {
                  setList([createdFolder, ...list]);
                }
              },
            },
          ],
          {
            type: 'plain-text',
            cancelable: false,
            defaultValue: '',
            placeholder: '',
          },
        );
      }
      actions.setFalse();
    } catch (error: any) {
      actions.setFalse();
      Alert.alert(t.t('error_creating_folder'));
    }
  }, [beneficiaryId, list, setList, actions, parentFolderId]);

  return { triggerCreateFolder, isCreatingFolder };
};
