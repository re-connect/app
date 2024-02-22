import * as React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Button from '../components/UI/Button';
import { TouchableOpacity } from 'react-native';

export const SettingsButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => (
  <Button
    onPress={() => navigation.navigate('Settings')}
    iconColor='white'
    text=''
    iconName='user-alt'
    backgroundColor='transparent'
  />
);

export const TabBarButton = (props: any) => <TouchableOpacity {...props} />;
