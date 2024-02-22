import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { colors } from '../style';
import { SettingsButton, TabBarButton } from './Components';
import { getTabStackIcon } from '../services/navigation';
import { isMember } from './Router';

export const getBeneficiaryHeader =
  (title: string) =>
  ({ navigation }: { navigation: NavigationProp<any, any> }) => ({
    title,
    headerStyle: { backgroundColor: colors.green },
    headerTintColor: colors.white,
    headerRight: title === 'Support' ? undefined : () => <SettingsButton navigation={navigation} />,
  });

export const getMemberHeader =
  (title: string) =>
  ({ navigation }: { navigation: NavigationProp<any, any> }) => ({
    title,
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerTintColor: colors.white,
    headerRight: title === 'Support' ? undefined : () => <SettingsButton navigation={navigation} />,
  });

export const getTabScreenOptions =
  (t: any) =>
    ({ route }: { route: RouteProp<ParamListBase, string> }) => ({
      tabBarIcon: getTabStackIcon(route),
      tabBarButton: TabBarButton,
      tabBarLabel: t(route.name.toLowerCase()),
      tabBarActiveTintColor: isMember ? colors.primaryPro : colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
      },
    });

export const getHeader = isMember ? getMemberHeader : getBeneficiaryHeader;
