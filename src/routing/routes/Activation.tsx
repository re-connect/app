import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import EnableBeneficiaryScreen from '../../pages/benficiary/EnableBeneficiaryScreen';
import { getHeader, getTabScreenOptions } from '../helpers';
import { Chat } from './Chat';

const ActivationTab = createBottomTabNavigator();
const ActivationStack = createStackNavigator();

export const ActivationScreen = () => (
  <ActivationStack.Navigator>
    <ActivationStack.Screen
      name="EnableBeneficiary"
      component={EnableBeneficiaryScreen}
      options={{ headerShown: false }}
    />
  </ActivationStack.Navigator>
);

export const Activation = () => {
  const { t } = useTranslation();

  return (
    <ActivationTab.Navigator initialRouteName='EnableBeneficiary' screenOptions={getTabScreenOptions(t)}>
      <ActivationTab.Screen name='Enabling' component={ActivationScreen} options={getHeader(t('enabling'))} />
      <ActivationTab.Screen name='Support' component={Chat} options={getHeader(t('support'))} />
    </ActivationTab.Navigator>
  );
};
