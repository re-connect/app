import * as React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Button from '../components/UI/Button';
import { TouchableOpacity } from 'react-native';
import { colors } from '../style';

export const SettingsButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => (
  <Button
    onPress={() => navigation.navigate('Settings')}
    iconColor={colors.white}
    text=''
    iconName='user'
    backgroundColor='transparent'
  />
);

export const TabBarButton = (props: any) => <TouchableOpacity {...props} />;
