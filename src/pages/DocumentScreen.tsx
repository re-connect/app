import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button, View } from 'native-base';
import * as React from 'react';
import { Dimensions, Image, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPreview from '../components/Documents/DocumentPreview';
import Screen from '../components/Screen';
import TogglePrivacySwitch from '../components/UI/TogglePrivacySwitch';
import DocumentContext from '../context/DocumentContext';
import { getTruncatedText } from '../helpers/dataHelper';
import { findNestedDocument } from '../helpers/documentsHelper';
import { useShowDocument } from '../hooks/DocumentsHooks';
import { colors } from '../style';

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
  downloadIconContainer: {
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
  downloadIcon: {
    fontSize: 20,
    color: colors.primary,
  },
});

type DocumentScreenParams = {
  Document: { id: number; extension: string; url: string };
};
type Props = {
  route: RouteProp<DocumentScreenParams, 'Document'>;
  navigation: NavigationProp<any>;
};

const DocumentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, extension, url } = route.params;
  const { list } = React.useContext(DocumentContext);
  const { documentUrl, previewUrl } = useShowDocument(id);
  const { width } = Dimensions.get('window');
  const document = findNestedDocument(!list ? [] : list, id);
  React.useEffect(() => {
    navigation.setOptions({ title: getTruncatedText(!document ? '' : document.nom) });
  });

  if (!document) return null;
  const documentPreviewUrl = extension === 'pdf' ? url : previewUrl;
  return (
    <Screen>
      <View style={styles.container}>
        <DocumentPreview previewUrl={documentPreviewUrl} extension={extension} />
        <Button style={styles.downloadIconContainer} onPress={() => Linking.openURL(documentUrl)}>
          <Icon style={styles.downloadIcon} name='download' />
        </Button>
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
