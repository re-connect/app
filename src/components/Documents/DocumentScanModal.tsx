import React from 'react';
import CustomModal from '../UI/CustomModal';
import t from '../../services/translation';
import { ImageInterface } from '../../types/Image';
import ItemModal from './Components/ItemModal';
import { ScannedGeniusDocumentInterface } from '../../types/Documents';

const DocumentScanModal: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
  triggerDocumentUpload: (images: Partial<ImageInterface & File>[]) => void;
  geniusScannedDocument: ScannedGeniusDocumentInterface;
}> = ({ visible, setVisible, geniusScannedDocument, triggerDocumentUpload }) => {
  const handleDocumentUpload = (singleFile: boolean) => {
    setVisible(false);
    const images: Partial<ImageInterface & File>[] = [];
    if (singleFile) {
      images.push({ path: geniusScannedDocument.multiPageDocumentUrl, filename: `${new Date().getTime()}.pdf` });
    } else {
      geniusScannedDocument.scans.map(enhancedImage => {
        images.push({
          path: enhancedImage.enhancedUrl,
        });
      });
    }
    triggerDocumentUpload(images);
  };
  return (
    <CustomModal
      title={t.t('scan_document_choice')}
      visible={visible}
      setVisible={setVisible}
      content={
        <>
          <ItemModal
            iconName='file-pdf'
            label={t.t('save_file_to_one_pdf')}
            onPress={() => handleDocumentUpload(true)}
          />
          <ItemModal
            iconName='images'
            label={t.t('save_file_to_pictures')}
            onPress={() => handleDocumentUpload(false)}
          />
        </>
      }
    />
  );
};

export default DocumentScanModal;
