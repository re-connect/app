import * as React from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import DocumentCardActions from '../../components/Documents/DocumentCardActions';
import DocumentPreview from '../../components/Documents/DocumentPreview';
import Screen from '../../components/Screen';
import TogglePrivacySwitch from '../../components/UI/TogglePrivacySwitch';
import DocumentContext from '../../context/DocumentContext';
import { getTruncatedText } from '../../helpers/dataHelper';
import { findNestedDocument } from '../../helpers/documentsHelper';
import { colors } from '../../style';
import { AnyDataInterface } from '../../types/Data';
import { useBoolean } from 'react-hanger/array';
import DocumentActionsModal from '../../components/Documents/DocumentActionsModal';
import { DocumentScreenProps } from '../../routing/routes/types/Document';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'relative',
    height: '100%',
  },
  switchContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.accentDark,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
  },
});

const DocumentScreen: React.FC<DocumentScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { list } = React.useContext(DocumentContext);
  const { width } = Dimensions.get('window');
  const document = findNestedDocument(!list ? [] : list, id);
  const [isModalOpen, openModalActions] = useBoolean(false);
  const [currentDocument, setCurrentDocument] = React.useState<AnyDataInterface | null>(null);
  React.useEffect(() => {
    navigation.setOptions({ title: getTruncatedText(!document ? '' : document.nom) });
  });

  if (!document) {
    navigation.goBack();

    return null;
  }

  return (
    <Screen>
      {currentDocument && (
        <Modal
          visible={isModalOpen}
          animationType='fade'
          transparent
          onRequestClose={() => openModalActions.setFalse()}>
          <DocumentActionsModal document={currentDocument} close={openModalActions.setFalse} />
        </Modal>
      )}
      <View style={styles.container}>
        <DocumentPreview document={document} />
        <View style={styles.actionsContainer}>
          <DocumentCardActions
            document={document}
            setCurrentDocument={setCurrentDocument}
            openModalActions={openModalActions}
          />
        </View>
        <View style={{ ...styles.switchContainer, width }}>
          <TogglePrivacySwitch
            Context={DocumentContext}
            isPrivate={document.b_prive}
            itemId={document.id}
            endpoint={`documents/${document.id}`}
          />
        </View>
      </View>
    </Screen>
  );
};

export default DocumentScreen;
