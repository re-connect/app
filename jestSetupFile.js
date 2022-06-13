import MockAsyncStorage from 'mock-async-storage';
import FormData from 'react-native/Libraries/Network/FormData';
const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);
jest.mock('@react-navigation/native', () => ({}));
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn().mockReturnValue({isConnected: true}),
}));
jest.mock('react-native-device-info', () => ({}));

global.FormData = FormData;
global.fetch = jest.fn();

jest.mock('react-native-pdf', () => jest.fn());
jest.mock('react-native-image-crop-picker', () => jest.fn());
