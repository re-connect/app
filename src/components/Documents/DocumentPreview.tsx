import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import PdfComponent from '../UI/Pdf';

const DocumentPreview: React.FC<{ document: DocumentInterface }> = ({ document }) => {
  const { previewUrl } = useShowDocument(document.id);
  const isPreviewUrlEmpty = previewUrl === '';

  return !isPreviewUrlEmpty && document.extension !== 'pdf' ? (
    <Image style={styles.imageWrapper} source={{ uri: previewUrl }} />
  ) : !isPreviewUrlEmpty ? (
    <View style={styles.pdfWrapper}>{document.url && <PdfComponent uri={document.url} />}</View>
  ) : null;
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  pdfWrapper: {
    flex: 1,
  },
  imageWrapper: { height: height - 200, resizeMode: 'contain' },
});

export default DocumentPreview;
