import { makeRequestv2 } from './requests';
import { Alert } from 'react-native';
import t from './translation';
import { login } from './authentication';

export const resetPassword = async (password: string, username?: string, previousPassword?: string) => {
  if (!username || !previousPassword) {
    await privatelyResetPassword(password);
  } else {
    await publiclyResetPassword(username, previousPassword, password);
  }
};

const privatelyResetPassword = async (password: string) => {
  const response = await makeRequestv2('/user/password', 'PATCH', { password });
  if (response) {
    Alert.alert(t.t('password_successfully_updated'));
  }
};

const publiclyResetPassword = async (username: string, previousPassword: string, newPassword: string) => {
  await login(username, previousPassword, { _new_password: newPassword });
};
