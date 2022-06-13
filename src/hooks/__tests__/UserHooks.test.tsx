import storage from '@react-native-async-storage/async-storage';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import UserContext from '../../context/UserContext';
import { useGetUser } from '../UserHooks';
const accessToken = 'ThisIsMyTestAccessToken';

describe('useGetUser hook', () => {
  test('Should call getUser function and navigate to appStack', async () => {
    // mockGetUser.mockResolvedValue(basicBeneficiary);
    await storage.setItem('accessToken', accessToken);
    const mockSetUser = jest.fn();
    const wrapper = ({ children }) => (
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>{children}</UserContext.Provider>
    );
    renderHook(useGetUser, { wrapper });
  });
  test('Should call getUser function and navigate to authStack', async () => {
    const mockSetUser = jest.fn();
    const wrapper = ({ children }) => (
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>{children}</UserContext.Provider>
    );
    renderHook(useGetUser, { wrapper });
  });

  test('Should call getUser function and navigate to TabEnableBeneficiaryStack', async () => {
    const mockSetUser = jest.fn();
    const wrapper = ({ children }) => (
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>{children}</UserContext.Provider>
    );
    renderHook(useGetUser, { wrapper });
  });
});
