import * as React from 'react';
import Screen from '../../components/Screen';
import PublicResetPasswordForm from '../../components/User/PublicResetPasswordForm';
import { Route } from '@react-navigation/native';

type Props = {
  route: Route<'PublicResetPassword', { username: string }>;
};

const PublicResetPasswordScreen: React.FC<Props> = ({ route }) => (
  <Screen>
    <PublicResetPasswordForm username={route.params.username} />
  </Screen>
);

export default PublicResetPasswordScreen;
