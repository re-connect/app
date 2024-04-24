import { useKeyboard } from '@react-native-community/hooks';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { backendUrl } from '../../appConstants';
import LoginTemporisationContext from '../../context/LoginTemporisationContext';
import ThemeContext from '../../context/ThemeContext';
import UserContext from '../../context/UserContext';
import { useGetLastUsername, useLogin } from '../../hooks/UserHooks';
import Logo from '../../images/logo.png';
import { LoginFormValues, validateLoginForm } from '../../services/forms';
import { colors } from '../../style';
import RNSwitch from '../UI/RNSwitch';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';
import TextField from '../UI/TextField';
import BeneficiaryUsernameHelpText from './BeneifciaryUsernameHelpText';
import LoginTemporisation from './LoginTemporisation';
import ProUsernameHelpText from './ProUsernameHelpText';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 32,
    marginBottom: 32,
  },
  form: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    borderBottomColor: 'whitesmoke',
    borderLeftColor: colors.darkGrayMoreTransparent,
    borderLeftWidth: 1,
    borderBottomWidth: 2,
  },
  proSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  proCheckbox: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetPasswordButton: { flexDirection: 'row', justifyContent: 'center' },
  resetPasswordText: {
    textDecorationLine: 'underline',
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  textStyle: { color: colors.darkGray },
});

const LoginForm: React.FC = () => {
  useGetLastUsername();
  const { isLoginIn, triggerLogin } = useLogin();
  const theme = React.useContext(ThemeContext);
  const { lastUsername, setLastUsername } = React.useContext(UserContext);
  const { isTemporarlyBlocked } = React.useContext(LoginTemporisationContext);
  const keyboard = useKeyboard();

  if (isTemporarlyBlocked()) {
    return <LoginTemporisation />;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ username: !lastUsername ? '' : lastUsername, password: '' }}
      validate={validateLoginForm}
      onSubmit={(values, { resetForm }) => {
        setLastUsername(values.username);
        resetForm({});
        triggerLogin(values);
      }}>
      {(props: FormikProps<LoginFormValues>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container}>
          {keyboard.keyboardShown ? null : <Image source={Logo} style={styles.logo} />}
          <View style={styles.form}>
            <View style={styles.proSwitch}>
              <Text style={styles.textStyle}>pros_area</Text>
              <Separator width={1} />
              <RNSwitch
                value={theme.value}
                onPress={theme.actions.toggle}
                activeColor={colors.primaryPro}
                inactiveColor={colors.primary}
              />
            </View>
            <Separator height={2} />
            <TextField
              contentType='username'
              fieldLabel='username'
              iconName='user-large'
              error={props.errors.username}
              handleBlur={props.handleBlur('username')}
              handleChange={props.handleChange('username')}
              touched={props.touched.username}
              value={props.values.username}
            />
            {theme.value ? (
              <ProUsernameHelpText username={props.values.username} />
            ) : (
              <BeneficiaryUsernameHelpText username={props.values.username} />
            )}
            <Separator height={4} />
            <TextField
              contentType='password'
              iconName='lock'
              fieldLabel='password'
              error={props.errors.password}
              handleBlur={props.handleBlur('password')}
              handleChange={props.handleChange('password')}
              touched={props.touched.password}
              value={props.values.password}
            />
            <Separator height={4} />
            <TouchableOpacity
              style={styles.resetPasswordButton}
              onPress={() => {
                Linking.openURL(`${backendUrl}/public/reset-password/choose`);
              }}>
              <Text
                style={{
                  ...styles.resetPasswordText,
                  textDecorationColor: theme.value ? colors.primaryPro : colors.primary,
                }}>
                reset_password
              </Text>
            </TouchableOpacity>
            <Separator height={4} />
            <RoundedButton isLoading={isLoginIn} text='login' onPress={() => props.handleSubmit()} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default LoginForm;
