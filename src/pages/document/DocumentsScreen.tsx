import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DocumentsBottomActions from '../../components/Documents/DocumentsBottomActions';
import DocumentsListWrapper from '../../components/Documents/DocumentsListWrapper';
import Screen from '../../components/Screen';
import { useSetTitleToBenefName } from '../../hooks/UserHooks';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' },
});

const DocumentsScreen: React.FC = () => {
  useSetTitleToBenefName();

  return (
    <Screen>
      <View style={styles.container}>
        <DocumentsBottomActions />
        <DocumentsListWrapper />
      </View>
    </Screen>
  );
};

export default DocumentsScreen;
