import MockAsyncStorage from 'mock-async-storage';
import FormData from 'react-native/Libraries/Network/FormData';
const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-async-storage/async-storage', () => mockImpl);
jest.mock('@react-navigation/native', () => ({}));
jest.mock('@react-native-community/netinfo', () => ({ fetch: jest.fn().mockReturnValue({ isConnected: true }) }));
jest.mock('@expo/vector-icons/FontAwesome6', () => jest.fn());
jest.mock('react-native-device-info', () => ({}));
jest.mock('react-native-pdf', () => jest.fn());
jest.mock('@react-navigation/native', () => ({
  createNavigationContainerRef: jest.fn().mockReturnValue({
    isReady: () => true,
    navigate: () => {},
  }),
}));

global.FormData = FormData;
global.fetch = jest.fn();
