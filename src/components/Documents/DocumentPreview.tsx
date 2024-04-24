import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import PdfComponent from '../UI/Pdf';
import { useNavigation } from '@react-navigation/native';

const DocumentPreview: React.FC<{ document: DocumentInterface }> = ({ document }) => {
  const { previewUrl, documentUrl } = useShowDocument(document.id);
  const { navigate } = useNavigation<any>();

  const isPreviewUrlEmpty = previewUrl === '';

  if (isPreviewUrlEmpty) {
    return null;
  }

  return document.extension !== 'pdf' ? (
    <TouchableOpacity onPress={() => navigate('Image', {uri: documentUrl})}>
      <Image style={styles.imageWrapper} source={{ uri: previewUrl }} />
    </TouchableOpacity>
  ) : (
    <View style={styles.pdfWrapper}>{document.url && <PdfComponent uri={document.url} />}</View>
  );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  pdfWrapper: { flex: 1 },
  imageWrapper: { height: height - 200, resizeMode: 'contain' },
});

export default DocumentPreview;
