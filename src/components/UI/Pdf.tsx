import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

interface PdfProps {
  uri: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

const PdfComponent: React.FC<PdfProps> = ({ uri }) => (
  <View style={styles.container}>
    <Pdf source={{ uri }} onLoadComplete={() => {}} onPageChanged={() => {}} onError={() => {}} style={styles.pdf} />
  </View>
);

export default PdfComponent;
