import * as React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Button from '../components/UI/Button';
import { TouchableOpacity } from 'react-native';
import { colors } from '../style';
import UserContext from '../context/UserContext';

export const SettingsButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { user } = React.useContext(UserContext);
  if (user === null) {
    return null;
  }

  return (
    <Button
      onPress={() => navigation.navigate('Settings')}
      iconColor={colors.white}
      text=''
      iconName='user-large'
      backgroundColor='transparent'
    />
  );
}

export const TabBarButton = (props: any) => <TouchableOpacity {...props} />;
