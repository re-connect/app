import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import PdfComponent from '../UI/Pdf';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pdfWrapper: {
    flex: 1,
  },
  imageWrapper: { height: height - 200, resizeMode: 'contain' },
});

const DocumentPreview: React.FC<{ previewUrl: string; extension: string }> = ({ previewUrl, extension }) => {
  const isPreviewUrlEmpty = previewUrl === '';
  return !isPreviewUrlEmpty && extension !== 'pdf' ? (
    <Image style={styles.imageWrapper} source={{ uri: previewUrl }} />
  ) : !isPreviewUrlEmpty ? (
    <View style={styles.pdfWrapper}>
      <PdfComponent uri={previewUrl} />
    </View>
  ) : null;
};

export default DocumentPreview;
