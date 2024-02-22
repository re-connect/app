import * as React from 'react';
import Screen from '../../components/Screen';
import PublicResetPasswordForm from '../../components/User/PublicResetPasswordForm';
import { PublicResetPasswordScreenProps } from '../../routing/routes/types/Auth';

const PublicResetPasswordScreen: React.FC<PublicResetPasswordScreenProps> = ({ route }) => (
  <Screen>
    <PublicResetPasswordForm username={route.params.username} />
  </Screen>
);

export default PublicResetPasswordScreen;
