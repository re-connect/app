import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button, View } from 'native-base';
import * as React from 'react';
import { Dimensions, Image, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  },
  downloadIcon: {
    fontSize: 20,
    color: colors.primary,
  },
});

type DocumentScreenParams = {
  Document: { id: number };
};
type Props = {
  route: RouteProp<DocumentScreenParams, 'Document'>;
  navigation: NavigationProp<any>;
};

const DocumentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;
  const { list } = React.useContext(DocumentContext);
  const { documentUrl, previewUrl } = useShowDocument(id);
  const { height, width } = Dimensions.get('window');
  const document = findNestedDocument(!list ? [] : list, id);
  React.useEffect(() => {
    navigation.setOptions({ title: getTruncatedText(!document ? '' : document.nom) });
  });

  if (!document) return null;


  return (
    <Screen>
      <View style={styles.container}>
        {previewUrl === '' ? null : (
          <Image style={{ height: height - 200, resizeMode: 'contain' }} source={{ uri: previewUrl }} />
        )}
        <Button style={styles.downloadIconContainer} onPress={() => Linking.openURL(documentUrl)}>
          <Icon style={styles.downloadIcon} name="download" />
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
