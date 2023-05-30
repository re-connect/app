import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
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
    <Pdf
      source={{ uri }}
      onLoadComplete={() => {}}
      onPageChanged={() => {}}
      onError={() => {}}
      style={styles.pdf}
      trustAllCerts={!(Platform.OS === 'android')} //hack only for android, fix pdf loading
    />
  </View>
);

export default PdfComponent;
