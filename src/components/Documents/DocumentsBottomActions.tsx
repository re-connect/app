import React, { useState } from 'react';
import { useBoolean } from 'react-hanger';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import { useScanDocument, useUploadDocument } from '../../hooks/DocumentsHooks';
import { useCreateFolder } from '../../hooks/FoldersHooks';
import { colors } from '../../style';
import { ScannedGeniusDocumentInterface } from '../../types/Documents';
import IconButton from '../UI/IconButton';
import DocumentScanModal from './DocumentScanModal';
import DocumentUploadModal from './DocumentUploadModal';

const styles = StyleSheet.create({
  leftButton: { position: 'absolute', right: 70, bottom: 5, zIndex: 1 },
  rightButton: { position: 'absolute', right: 5, bottom: 5, zIndex: 1 },
  smallIcon: { position: 'absolute', right: 6, top: 6 },
  bigIcon: { position: 'absolute', fontSize: 16, right: 10, top: 10 },
});

interface Props {
  folderId?: number;
}

const DocumentsBottomActions: React.FC<Props> = ({ folderId }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const { isUploadingDocument, triggerDocumentUpload } = useUploadDocument(current?.subject_id, folderId);
  const { triggerScanDocument } = useScanDocument();
  const { isCreatingFolder, triggerCreateFolder } = useCreateFolder(current?.subject_id, folderId);
  const isModalDocumentVisible = useBoolean(false);
  const isModalScanVisible = useBoolean(false);
  const [imagesScanned, setImagesScanned] = useState<ScannedGeniusDocumentInterface>();

  const handleScanDocument = async () => {
    isModalDocumentVisible.setFalse();
    const scannedPictures = await triggerScanDocument();
    setImagesScanned(scannedPictures);
    const images: { path: any }[] = [];

    if (scannedPictures.scans.length > 1) {
      isModalScanVisible.setTrue();
    } else {
      scannedPictures.scans.map((enhancedImage: any) => {
        images.push({
          path: enhancedImage.enhancedUrl,
        });
      });
      triggerDocumentUpload(images);
    }
  };

  return (
    <>
      <DocumentUploadModal
        visible={isModalDocumentVisible.value}
        setVisible={isModalDocumentVisible.setValue}
        triggerDocumentUpload={triggerDocumentUpload}
        handleScanDocument={handleScanDocument}
      />
      {imagesScanned && (
        <DocumentScanModal
          triggerDocumentUpload={triggerDocumentUpload}
          geniusScannedDocument={imagesScanned}
          visible={isModalScanVisible.value}
          setVisible={isModalScanVisible.setValue}
        />
      )}
      <View style={styles.leftButton}>
        <IconButton size={40} isLoading={isCreatingFolder} solid iconName='folder-open' onPress={triggerCreateFolder} />
        {isCreatingFolder ? null : <Icon name='plus' color={colors.white} style={styles.smallIcon} />}
      </View>
      <View style={styles.rightButton}>
        <IconButton
          isLoading={isUploadingDocument.value}
          solid
          size={60}
          iconName='file'
          onPress={() => isModalDocumentVisible.setTrue()}
        />
        {isUploadingDocument.value ? null : <Icon name='plus' color={colors.white} style={styles.bigIcon} />}
      </View>
    </>
  );
};

export default DocumentsBottomActions;
