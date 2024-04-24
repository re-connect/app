import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import DocumentContext from '../context/DocumentContext';
import { uploadBase64 } from '../services/documents';
import t from '../services/translation';

/* istanbul ignore next */
export const useUploadScan = (beneficiaryId: number, folderId?: number) => {
  const [isUploading, isUploadingActions] = useBoolean(false);
  const { list, setList } = React.useContext(DocumentContext);
  const navigation = useNavigation<any>();

  const triggerUpload = React.useCallback(
    async (image: string) => {
      try {
        isUploadingActions.setTrue();
        const response = await uploadBase64(image, beneficiaryId);
        if (response) {
          setList([...response, ...list]);
          Alert.alert(t.t('file_added'));
          navigation.goBack();
        }
        isUploadingActions.setFalse();
      } catch (error) {
        Alert.alert(t.t('error_adding_file'));
        isUploadingActions.setFalse();
      }
    },

    [list, beneficiaryId, setList, isUploadingActions, folderId, navigation],
  );

  return { isUploading, triggerUpload };
};
