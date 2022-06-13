import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';
import t from './translation';

let isAlertPresent = false;
const showAlert = () => {
  isAlertPresent = true;
}
const hideAlert = () => {
  isAlertPresent = false;
}

export const checkNetworkConnection = async(): Promise<boolean> => {
  const state = await NetInfo.fetch();

  if (false === state.isConnected && !isAlertPresent) {
    showAlert();
    Alert.alert(t.t('not_connected_error'), '', [
      { text: t.t('ok'), onPress: hideAlert, style: 'cancel' },
    ]);
  }

  if (null === state.isConnected) {
    return true;
  }

  return !!state.isConnected;
}
