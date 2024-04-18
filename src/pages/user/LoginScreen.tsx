import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../../components/Authentication/LoginForm';
import Screen from '../../components/Screen';
import LanguageSwitch from '../../components/User/LanguageSwitch';
import { config } from '../../config';
import environments from '../../environment';
import ThemeContext from '../../context/ThemeContext';
import { colors } from '../../style';
import ChatButton from '../../components/UI/ChatButton';
import { backendUrl } from '../../appConstants';
import DeviceInfo from "react-native-device-info";

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const styles = StyleSheet.create({
  content: { flex: 1, zIndex: 1 },
  languageSwitchContainer: { position: 'absolute', top: Platform.OS === 'ios' ? 40 : 20, right: 32, zIndex: 2 },
  versionsContainer: { left: 16, bottom: 16 },
});

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('screen').height;
  const theme = React.useContext(ThemeContext);

  return (
    <Screen>
      <View style={styles.content}>
        <LoginForm />
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: theme.value ? colors.primaryPro : colors.primary,
          height: screenHeight / 2,
          width: screenWidth,
        }}
      />
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <ChatButton />
      <View style={styles.versionsContainer}>
        <Text>v1.0.{config.version}</Text>
        {environments && environments.ENV === 'prod' ? null : (
          <>
            <Text>{environments && environments.ENV}</Text>
            <Text>{backendUrl}</Text>
            <Text>{DeviceInfo.getBundleId()}</Text>
          </>
        )}
      </View>
    </Screen>
  );
};

export default LoginScreen;
