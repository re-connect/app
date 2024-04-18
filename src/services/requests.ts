import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiv2Endpoint, apiv3Endpoint } from '../appConstants';
import { UserInterface } from '../types/Users';
import { handle401, handleError } from './errors';
import { checkNetworkConnection } from './networking';

type HTTPVerb = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export const makeAuthenticatedUrlv2 = async (endpoint: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) {
    return;
  }

  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    handle401();

    return;
  }

  return `${apiv2Endpoint}${endpoint}?access_token=${token}`;
};

export const makeAuthenticatedUrlv3 = async (endpoint: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) {
    return;
  }

  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    handle401();

    return;
  }

  return `${apiv3Endpoint}${endpoint}?access_token=${token}`;
};

export const fetchCurrentUser = async (): Promise<null | UserInterface> => {
  try {
    const url = await makeAuthenticatedUrlv2('/user');
    if (url) {
      const request = axios.get(url, { timeout: 3000 });
      const response = await request;

      return response.data;
    }

    return null;
  } catch (error: any) {
    return null;
  }
};

export const makeRequestv2 = async (endpoint: string, method: HTTPVerb, data?: Record<string, any>) => {
  try {
    const url = await makeAuthenticatedUrlv2(endpoint);
    if (url) {
      const response = await axios({ method, url, data, timeout: 17000 });

      return response.data;
    }

    return;
  } catch (error: any) {
    handleError(error);

    return;
  }
};

export const makeRequestv3 = async (endpoint: string, method: HTTPVerb, data?: Record<string, any>) => {
  try {
    const url = await makeAuthenticatedUrlv3(endpoint);
    if (url) {
      const response = await axios({ method, url, data, timeout: 7000 });

      return response.data;
    }

    return;
  } catch (error: any) {
    handleError(error);

    return;
  }
};
