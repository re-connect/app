import { useNavigation } from '@react-navigation/core';
import { Box, Center, FlatList, HStack, Pressable, Spacer, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Text from '../components/UI/Text';
import LanguageSwitch from '../components/User/LanguageSwitch';
import UserContext from '../context/UserContext';
import { getTruncatedFullName } from '../helpers/userHelpers';
import { useLogout } from '../hooks/UserHooks';
import { colors } from '../style';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = React.useContext(UserContext);
  const { isLoggingOut, isoLggingOutActions, logout } = useLogout();
  const startLogout = () => {
    isoLggingOutActions.setTrue();
    logout();
  };
  if (isLoggingOut) {
    return (
      <VStack flex='1' justifyContent='center'>
        <ActivityIndicator size='large' color={colors.red} />
      </VStack>
    );
  }
  const navigate = (routeName: string) => () => navigation.navigate(routeName);

  const items = [
    { onPress: navigate('Profile'), name: 'user', label: 'my_information' },
    { onPress: navigate('Centers'), name: 'hotel', label: 'my_centers' },
    { onPress: navigate('TermsOfUse'), name: 'scroll', label: 'terms_of_use' },
    { onPress: navigate('PrivacyPolicy'), name: 'user-shield', label: 'privacy' },
    { onPress: navigate('LegalNotices'), name: 'balance-scale', label: 'legal' },
    { onPress: navigate('Pitches'), name: 'bullhorn', color: colors.yellow, label: 'pitches' },
    { onPress: navigate('Chat'), name: 'comment-alt', color: colors.blue, label: 'support' },
    { onPress: startLogout, name: 'sign-out-alt', color: colors.red, label: 'log_out' },
  ];

  return (
    <VStack p='4'>
      <Center my='5'>
        <Text style={{ fontSize: 20 }}>{getTruncatedFullName(user)}</Text>
      </Center>
      <HStack justifyContent='flex-end'>
        <LanguageSwitch />
      </HStack>
      <FlatList
        data={items}
        renderItem={({ item: { onPress, name, color = colors.black, label } }) => (
          <Pressable onPress={onPress}>
            <Box borderBottomWidth='1' borderColor='coolGray.200' px='4' py='4'>
              <HStack space={3} justifyContent='space-between' alignItems='center'>
                <Icon name={name} color={color} solid />
                <VStack>
                  <Text style={{ color: color }}>{label}</Text>
                </VStack>
                <Spacer />
                <Icon name='chevron-right' color={color} />
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={item => item.label}
      />
    </VStack>
  );
};

export default SettingsScreen;
