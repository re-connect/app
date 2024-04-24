import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import Text from '../../components/UI/Text';
import LanguageSwitch from '../../components/User/LanguageSwitch';
import UserContext from '../../context/UserContext';
import { getTruncatedFullName } from '../../helpers/userHelpers';
import { useLogout } from '../../hooks/UserHooks';
import { colors } from '../../style';
import Icon from '../../components/UI/Icon';
import { geniusSdkLicense } from '../../appConstants';

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.darkGrayMoreTransparent,
  },
});

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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color={colors.red} />
      </View>
    );
  }
  const navigate = (routeName: string) => () => navigation.navigate(routeName);

  const items = [
    { onPress: navigate('Profile'), name: 'user-large', label: 'my_information' },
    { onPress: navigate('Centers'), name: 'hotel', label: 'my_centers' },
    { onPress: navigate('TermsOfUse'), name: 'scroll', label: 'terms_of_use' },
    { onPress: navigate('PrivacyPolicy'), name: 'user-shield', label: 'privacy' },
    { onPress: navigate('LegalNotices'), name: 'scale-balanced', label: 'legal' },
    { onPress: navigate('Pitches'), name: 'bullhorn', color: colors.yellow, label: 'pitches' },
    { onPress: navigate('Chat'), name: 'comment', color: colors.blue, label: 'support' },
    { onPress: startLogout, name: 'right-from-bracket', color: colors.red, label: 'log_out' },
  ];

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 16 }}>{getTruncatedFullName(user)}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <LanguageSwitch />
      </View>
      <FlatList
        data={items}
        renderItem={({ item: { onPress, name, color = colors.black, label } }) => (
          <TouchableOpacity onPress={onPress}>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Icon name={name} color={color} />
                <Text style={{ color, marginLeft: 16, textAlign: 'left', flex: 1 }}>{label}</Text>
                <Icon name='chevron-right' color={color} />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.label}
      />
      <Text>{geniusSdkLicense.slice(-5)}</Text>
    </View>
  );
};

export default SettingsScreen;
