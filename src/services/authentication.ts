import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utf8 from 'utf8';
import { connexionInformation, loginApiEndpoint } from '../appConstants';
import { checkNetworkConnection } from './networking';

export const login = async (username: string, password: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) return;

  try {
    const params =  {
      ...connexionInformation,
      username: utf8.encode(username.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
      password: utf8.encode(password),
    };
    const response = await axios.get(loginApiEndpoint, { params, timeout: 3000 });

    if (!response.data) {
      throw new Error('login-error');
    }
    const token = response.data['access_token'];
    await AsyncStorage.setItem('accessToken', token);

    return token;
  } catch (error: any) {
    throw new Error('login-error');
  }
};
