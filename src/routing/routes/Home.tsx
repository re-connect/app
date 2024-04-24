import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import BeneficiariesScreen from '../../pages/benficiary/BeneficiariesScreen';
import CreateBeneficiaryScreen from '../../pages/benficiary/CreateBeneficiaryScreen';
import { getHeader, getTabScreenOptions } from '../helpers';
import Document from './Document';
import Event from './Event';
import Contact from './Contact';
import Note from './Note';
import { Chat } from './Chat';
import { isMember } from '../../helpers/userHelpers';

const MemberBeneficiariesStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

const BeneficiaryHome = () => {
  const { t } = useTranslation();

  return (
    <HomeTab.Navigator screenOptions={getTabScreenOptions(t)}>
      <HomeTab.Screen name='Documents' component={Document} options={{ headerShown: false }} />
      <HomeTab.Screen name='Events' component={Event} options={{ headerShown: false }} />
      <HomeTab.Screen name='Contacts' component={Contact} options={{ headerShown: false }} />
      <HomeTab.Screen name='Notes' component={Note} options={{ headerShown: false }} />
      <HomeTab.Screen name='Chat' component={Chat} options={{ headerShown: false }} />
    </HomeTab.Navigator>
  );
};

const MemberHome = () => {
  const { t } = useTranslation();

  return (
    <MemberBeneficiariesStack.Navigator initialRouteName='Beneficiaries'>
      <MemberBeneficiariesStack.Screen
        name="Beneficiaries"
        component={BeneficiariesScreen}
        options={getHeader(t('beneficiaries'))}
      />
      <MemberBeneficiariesStack.Screen
        name="Beneficiary"
        component={BeneficiaryHome}
        options={{ headerShown: false }}
      />
      <MemberBeneficiariesStack.Screen
        name="CreateBeneficiary"
        component={CreateBeneficiaryScreen}
        options={getHeader(t('create_beneficiary'))}
      />
    </MemberBeneficiariesStack.Navigator>
  );
};

export const getHome = () => (isMember ? MemberHome : BeneficiaryHome);
