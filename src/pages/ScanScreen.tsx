import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import Scanner from 'react-native-document-scanner';
import Button from '../components/UI/Button';
import Separator from '../components/UI/Separator';
import Text from '../components/UI/Text';
import { useUploadScan } from '../hooks/ScanHooks';
import { colors } from '../style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  newPic: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  instructions: {
    position: 'absolute',
    top: 10,
  },
  scanner: {
    flex: 1,
    width: 400,
    height: 200,
    borderColor: 'orange',
    borderWidth: 1,
  },
  loader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ScanScreenParamList = {
  Folder: {
    folderId: number;
    beneficiaryId: number;
  };
};
interface Props {
  route: RouteProp<ScanScreenParamList, 'Folder'>;
}

const ScanScreen: React.FC<Props> = ({ route }) => {
  const { folderId, beneficiaryId } = route.params;
  const [image, setImage] = React.useState<string | null>(null);

  // TODO: use currentLastDetectionType or remove this state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [currentLastDetectionType, setLastDetectionType] = React.useState<number>(-1);
  const { isUploading, triggerUpload } = useUploadScan(beneficiaryId, folderId);

  if (isUploading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          style={{ flex: 1, width: 300, height: 200 }}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
          resizeMode="contain"
        />
      ) : (
        <Scanner
          useBase64
          onPictureTaken={(data: any) => setImage(data.croppedImage)}
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          useFrontCam={false}
          brightness={0.2}
          saturation={0}
          quality={0.5}
          contrast={1.2}
          onRectangleDetect={({ lastDetectionType }: { lastDetectionType: number }) => {
            setLastDetectionType(lastDetectionType);
          }}
          detectionCountBeforeCapture={10}
          detectionRefreshRateInMS={50}
          style={styles.scanner}
        />
      )}
      {image === null ? null : (
        <View style={styles.actions}>
          <Button text="Réessayer" onPress={() => setImage(null)} fullWidth />
          <Separator width={1} />
          <Button
            text="Valider"
            isLoading={isUploading}
            onPress={() => {
              triggerUpload(image);
              setImage(null);
            }}
            fullWidth
          />
        </View>
      )}
      <View style={styles.instructions}>
        <Text style={{ color: 'white' }}>Ne bougez plus, la photo sera prise automatiquement</Text>
      </View>
    </View>
  );
};

export default ScanScreen;
