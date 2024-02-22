import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AuthLoadingScreen from '../../pages/user/AuthLoadingScreen';
import ChatScreen from '../../pages/user/ChatScreen';
import LoginScreen from '../../pages/user/LoginScreen';
import PublicResetPasswordScreen from '../../pages/user/PublicResetPasswordScreen';
import { getHeader } from '../helpers';
import { AuthStackParamList } from './types/Auth';

const AuthLoadingStack = createStackNavigator();
const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthLoading = () => {
  const { t } = useTranslation();

  return (
    <AuthLoadingStack.Navigator initialRouteName='AuthLoading'>
      <AuthLoadingStack.Screen name='AuthLoading' component={AuthLoadingScreen} options={getHeader(t('loading'))} />
    </AuthLoadingStack.Navigator>
  );
};

export const Auth = () => {
  const { t } = useTranslation();

  return (
    <AuthStack.Navigator initialRouteName='Login'>
      <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen
        name='PublicResetPassword'
        component={PublicResetPasswordScreen}
        options={getHeader(t('reset_password_title'))}
      />
      <AuthStack.Screen name='Chat' component={ChatScreen} options={getHeader(t('loading'))} />
    </AuthStack.Navigator>
  );
};
