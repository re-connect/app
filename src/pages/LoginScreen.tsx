import { NavigationProp } from '@react-navigation/native';
import { Button } from 'native-base';
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginForm from '../components/Authentication/LoginForm';
import Screen from '../components/Screen';
import LanguageSwitch from '../components/User/LanguageSwitch';
import ThemeContext from '../context/ThemeContext';
import { colors } from '../style';

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 1,
  },
  chatIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#23BAF6',
    zIndex: 2,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 32,
    zIndex: 2,
  },
  chatIcon: {
    fontSize: 25,
    color: colors.white,
  },
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
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
      ></View>
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch />
      </View>
      <Button style={styles.chatIconContainer} onPress={() => navigation.navigate('Chat')}>
        <Icon style={styles.chatIcon} solid name='comment-alt' />
      </Button>
    </Screen>
  );
};

export default LoginScreen;
