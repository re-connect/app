import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Screen from '../../components/Screen';
import Text from '../../components/UI/Text';
import environments from '../../environment';
import { useGetUser } from '../../hooks/UserHooks';
import Logo from '../../images/logo.png';
import { colors } from '../../style';

const styles = StyleSheet.create({
  loadingText: {
    color: colors.darkGray,
    paddingBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: 16,
    width: 150,
    height: 150,
  },
  versionText: {
    alignSelf: 'flex-end',
    marginRight: 30,
    height: 40,
    color: colors.darkGray,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const AuthLoadingScreen: React.FC = () => {
  useGetUser();

  return (
    <Screen>
      <View style={styles.content}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.loadingText}>Connexion en cours</Text>
        <ActivityIndicator size="large" color={colors.darkGray} />
      </View>
      <Text style={styles.versionText}>v {DeviceInfo.getVersion()}</Text>
      {environments && environments.ENV && environments.ENV !== 'prod' && (
        <Text style={styles.versionText}>{environments.ENV}</Text>
      )}
    </Screen>
  );
};

export default AuthLoadingScreen;
