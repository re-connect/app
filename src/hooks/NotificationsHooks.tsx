import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { makeRequestv2 } from '../services/requests';

const registerTokenWithAPI = async (token: string) => {
  await makeRequestv2('/user/register-notification-token', 'PATCH', { notification_token: token });
};

const requestUserPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();
  const { AUTHORIZED, PROVISIONAL } = messaging.AuthorizationStatus;
  const enabled = authStatus === AUTHORIZED || authStatus === PROVISIONAL;
  return enabled;
};

export const useRegisterToNotificationsService = () => {
  useEffect(() => {
    return messaging().onTokenRefresh(registerTokenWithAPI);
  });
  return async () => {
    const hasUserEnabledNotifications = await requestUserPermission();
    if (hasUserEnabledNotifications) {
      const fcmToken = await messaging().getToken();
      registerTokenWithAPI(fcmToken);
    }
  };
};
