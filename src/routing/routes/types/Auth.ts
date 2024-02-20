import { NavigationProp, RouteProp } from '@react-navigation/native';

type PublicResetPasswordScreenParams = { username: string };
export type PublicResetPasswordScreenProps = {
  route: RouteProp<{ PublicResetPassword: PublicResetPasswordScreenParams }, 'PublicResetPassword'>;
};

export type AuthStackParamList = {
  Login: {};
  PublicResetPassword: PublicResetPasswordScreenParams;
  Chat: {};
};
