import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import * as RootNavigation from '../RootNavigation';
import t from './translation';

export const handle401 = (): void => {
  RootNavigation.navigate('Auth');
};

export const handleError = (error: AxiosError): void => {
  if (error.response?.status == 401) {
    handle401();
  } else if (error.response?.status == 403) {
    Alert.alert(t.t('error_not_allowed'));
  }
};
