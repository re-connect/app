import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utf8 from 'utf8';
import { connexionInformation, loginApiEndpoint } from '../appConstants';
import { checkNetworkConnection } from './networking';

const retryLogin = async (params: {string: string}) => {
  const response = await axios.get(loginApiEndpoint, { params, timeout: 15000 });
  const token = response.data['access_token'];
  await AsyncStorage.setItem('accessToken', token);
}

export const login = async (username: string, password: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) return;

  
  const params =  {
    ...connexionInformation,
    username: utf8.encode(username.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
    password: utf8.encode(password),
  };

  try {
    await retryLogin(params);
  } catch (error: any) {
    await retryLogin(params)
  }
};
