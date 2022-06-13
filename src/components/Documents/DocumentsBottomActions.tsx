import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import { useUploadDocument } from '../../hooks/DocumentsHooks';
import { useCreateFolder } from '../../hooks/FoldersHooks';
import { colors } from '../../style';
import IconButton from '../UI/IconButton';

const styles = StyleSheet.create({
  leftButton: { position: 'absolute', right: 70, bottom: 5, zIndex: 1 },
  rightButton : { position: 'absolute', right: 5, bottom: 5, zIndex: 1 },
  smallIcon: { position: 'absolute', right: 6, top: 6 },
  bigIcon: { position: 'absolute', fontSize: 16, right: 10, top: 10 },
});

interface Props {
  folderId?: number;
}

const DocumentsBottomActions: React.FC<Props> = ({ folderId }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const { isUploadingDocument, triggerDocumentUpload } = useUploadDocument(current?.subject_id, folderId);
  const { isCreatingFolder, triggerCreateFolder } = useCreateFolder(current?.subject_id, folderId);
  return(
    <>
      <View style={styles.leftButton}>
        <IconButton
          size={40}
          isLoading={isCreatingFolder}
          solid
          iconName="folder-open"
          onPress={triggerCreateFolder}
        />
        {isCreatingFolder ? null : (
          <Icon name="plus" color={colors.white} style={styles.smallIcon} />
        )}
      </View>
      <View style={styles.rightButton}>
        <IconButton
          isLoading={isUploadingDocument.value}
          solid
          size={60}
          iconName="file"
          onPress={triggerDocumentUpload}
        />
        {isUploadingDocument.value ? null : (
          <Icon name="plus" color={colors.white} style={styles.bigIcon} />
        )}
      </View>
    </>
  );
}


export default DocumentsBottomActions;