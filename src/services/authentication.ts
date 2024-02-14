import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utf8 from 'utf8';
import { connexionInformation, loginApiEndpoint } from '../appConstants';
import { checkNetworkConnection } from './networking';
import prompt from 'react-native-prompt-android';
import t from './translation';
import { Alert } from 'react-native';

interface LoginParams {
  username: string,
  password: string,
  client_id?: string,
  client_secret?: string,
  grant_type?: string,
  _auth_code?: string,
}

interface MFaResponseBody {
  login: 'success'|'failure',
  two_factor_complete: boolean,
}

const setTokenInStorage = async (token: string) => await AsyncStorage.setItem('accessToken', token);

const check2FaStatus = async (params: LoginParams, response: MFaResponseBody): Promise<void> => 
  new Promise((resolve) => {
    if (response.two_factor_complete === false) {
      if (response.login === 'success') {
        prompt(
          t.t('mfa_code_sent'),
          t.t('mfa_code_not_recived'),
          [
            {text: 'cancel', onPress: () => resolve(), style: 'cancel'},
            {text: 'validate', onPress: async (auth_code) => {
              await retryLogin({...params, '_auth_code': auth_code});
              resolve();
            }},
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(t.t('error_2fa_code_wrong'));
      }
    }
  });

const retryLogin = async (params: LoginParams): Promise<void> => {
  const response = await axios.get(loginApiEndpoint, { params, timeout: 15000 });
  const token = response.data.access_token;

  if (token) {
    await setTokenInStorage(token);
  } else {
    await check2FaStatus(params, response.data);
  }
};

export const login = async (username: string, password: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) {
    return;
  }

  const params = {
    ...connexionInformation,
    username: utf8.encode(
      username
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim(),
    ),
    password: utf8.encode(password).trim(),
  };

  try {
    await retryLogin(params);
  } catch (error: any) {
    await retryLogin(params);
  }
};
