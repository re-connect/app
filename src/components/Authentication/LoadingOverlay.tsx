import * as React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { colors } from '../../style';

interface Props {
  isShown: boolean;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
  },
});

const LoadingOverlay: React.FC<Props> = ({ isShown }) => (
  <Modal animationType="none" transparent={true} visible={isShown}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  </Modal>
);

export default LoadingOverlay;
