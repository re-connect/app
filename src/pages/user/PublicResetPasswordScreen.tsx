import * as React from 'react';
import Screen from '../../components/Screen';
import PublicResetPasswordForm from '../../components/User/PublicResetPasswordForm';

type Props = {
  username: string;
};

const PublicResetPasswordScreen: React.FC<Props> = ({ username }) => (
  <Screen>
    <PublicResetPasswordForm username={username} />
  </Screen>
);

export default PublicResetPasswordScreen;
