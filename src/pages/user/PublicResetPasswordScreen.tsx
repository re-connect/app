import * as React from 'react';
import Screen from '../../components/Screen';
import PublicResetPasswordForm from '../../components/User/PublicResetPasswordForm';
import { PublicResetPasswordScreenProps } from '../../routing/routes/types/Auth';
import Separator from '../../components/UI/Separator';
import Text from '../../components/UI/Text';
import { StyleSheet } from 'react-native';
import { colors } from '../../style';

const styles = StyleSheet.create({
  subtitle: { fontSize: 18, paddingHorizontal: 8, color: colors.darkGray, fontWeight: 'bold' },
});

const PublicResetPasswordScreen: React.FC<PublicResetPasswordScreenProps> = ({ route }) => (
  <Screen>
    <Separator height={4} />
    <Text style={styles.subtitle}>{route.params.subtitle}</Text>
    <PublicResetPasswordForm username={route.params.username} />
  </Screen>
);

export default PublicResetPasswordScreen;
