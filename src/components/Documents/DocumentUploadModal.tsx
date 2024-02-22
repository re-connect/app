import React from 'react';
import CustomModal from '../UI/CustomModal';
import t from '../../services/translation';
import ItemModal from './Components/ItemModal';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImageInterface } from '../../types/Image';
import { geniusSdkLicense } from '../../appConstants';
//@ts-ignore
import RNGeniusScan from '@thegrizzlylabs/react-native-genius-scan';

const DocumentUploadModal: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleScanDocument: () => void;
  triggerDocumentUpload: (files: Partial<ImageInterface & File>[]) => void;
}> = ({ visible, setVisible, handleScanDocument, triggerDocumentUpload }) => {
  const handleChooseFile = async () => {
    await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] })
      .then(res => {
        if (res) {
          const file: Partial<ImageInterface & File> = {
            filename: res.name,
            path: res.uri,
            size: res.size ?? 0,
            type: res.type ?? '', // mime type
          };
          triggerDocumentUpload([file]);
        }
      })
      .catch(err => {
        // Do nothing
      })
      .finally(() => {
        //prevent autoclosing the modal before user has selected a file
        setVisible(false);
      });
  };

  const handleScanPicture = async () => {
    setVisible(false);
    await RNGeniusScan.setLicenseKey(geniusSdkLicense, /* autoRefresh = */ true);
    const res = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 1,
    });
    const geniusImageScanned = await RNGeniusScan.scanWithConfiguration({
      source: 'image',
      sourceImageUrl: res.assets && res.assets[0].uri,
      multiPage: false,
      defaultFilter: 'none',
    });
    const images: Partial<ImageInterface & File>[] = [];
    geniusImageScanned.scans.map((enhancedImage: any) => {
      images.push({
        path: enhancedImage.enhancedUrl,
      });
    });
    triggerDocumentUpload(images);
  };

  return (
    <CustomModal
      title={t.t('choose_picture')}
      visible={visible}
      setVisible={setVisible}
      content={
        <>
          <ItemModal
            iconName='file-invoice'
            label={t.t('scan_document')}
            onPress={() => {
              handleScanDocument();
            }}
          />
          <ItemModal iconName='file' label={t.t('choose_file')} onPress={() => handleChooseFile()} />
          <ItemModal iconName='image' label={t.t('choose_picture')} onPress={() => handleScanPicture()} />
        </>
      }
    />
  );
};

export default DocumentUploadModal;
