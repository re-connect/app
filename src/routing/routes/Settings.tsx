import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CentersScreen from '../../pages/user/CentersScreen';
import ChatScreen from '../../pages/user/ChatScreen';
import LegalNoticesScreen from '../../pages/user/LegalNoticesScreen';
import PitchesScreen from '../../pages/user/PitchesScreen';
import PrivacyPolicyScreen from '../../pages/user/PrivacyPolicyScreen';
import ProfileScreen from '../../pages/user/ProfileScreen';
import ResetPasswordScreen from '../../pages/user/ResetPasswordScreen';
import SettingsScreen from '../../pages/user/SettingsScreen';
import TermsOfUseScreen from '../../pages/user/TermsOfUseScreen';
import { getHeader } from '../helpers';

const SettingsStack = createStackNavigator();

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <SettingsStack.Navigator initialRouteName='SettingsIndex'>
      <SettingsStack.Screen name='SettingsIndex' component={SettingsScreen} options={getHeader(t('settings'))} />
      <SettingsStack.Screen name='Profile' component={ProfileScreen} options={getHeader(t('profil'))} />
      <SettingsStack.Screen
        name='ResetPassword'
        component={ResetPasswordScreen}
        options={getHeader(t('new_password'))}
      />
      <SettingsStack.Screen name='TermsOfUse' component={TermsOfUseScreen} options={getHeader(t('terms_of_use'))} />
      <SettingsStack.Screen name='LegalNotices' component={LegalNoticesScreen} options={getHeader(t('legal_notice'))} />
      <SettingsStack.Screen
        name='PrivacyPolicy'
        component={PrivacyPolicyScreen}
        options={getHeader(t('privacy_policy'))}
      />
      <SettingsStack.Screen name='Pitches' component={PitchesScreen} options={getHeader(t('pitches'))} />
      <SettingsStack.Screen name='Centers' component={CentersScreen} options={getHeader(t('centers'))} />
      <SettingsStack.Screen name='Chat' component={ChatScreen} options={getHeader(t('support'))} />
    </SettingsStack.Navigator>
  );
};
