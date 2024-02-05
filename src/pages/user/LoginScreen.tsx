import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../../components/Authentication/LoginForm';
import Screen from '../../components/Screen';
import LanguageSwitch from '../../components/User/LanguageSwitch';
import { config } from '../../config';
import ThemeContext from '../../context/ThemeContext';
import { colors } from '../../style';
import ChatButton from '../../components/UI/ChatButton';

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 1,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 32,
    zIndex: 2,
  },
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
        }}></View>
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <ChatButton />
      <Text>{config.version}</Text>
    </Screen>
  );
};

export default LoginScreen;
