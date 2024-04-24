import * as React from 'react';
import { useBoolean } from 'react-hanger';
import { StyleSheet, View } from 'react-native';
import { emailValidator } from '../../helpers/validators';
import { checkProUsernameValidity } from '../../services/usernameValidation';
import { colors } from '../../style';
import Separator from '../UI/Separator';
import Text from '../UI/Text';
import UsernameHelpTextPart from './UsernameHelpTextPart';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  usernameHelp: { marginTop: 5, flexDirection: 'row', justifyContent: 'center' },
  usernameHelpText: { fontSize: 16 },
  usernameHelpTextOk: { color: colors.white },
  validIcon: { fontSize: 15, color: colors.primary },
  invalidIcon: { fontSize: 15, color: colors.red },
  validIconContainer: { justifyContent: 'center' },
});

interface Props {
  username: string;
}

const UsernameHelpText: React.FC<Props> = ({ username }) => {
  const isEmailValid = useBoolean(false);
  const isUsernameValid = useBoolean(false);

  React.useEffect((): void => {
    isUsernameValid.setValue(checkProUsernameValidity(username));
    isEmailValid.setValue(emailValidator(username));
  }, [isEmailValid, isUsernameValid, username]);
  return (
    <View style={styles.usernameHelp}>
      <UsernameHelpTextPart text='last_name_lower' validity={isUsernameValid.value} />
      <UsernameHelpTextPart text='.' validity={isUsernameValid.value} />
      <UsernameHelpTextPart text='first_name_lower' validity={isUsernameValid.value} />
      <Separator width={1} />
      <Text>|</Text>
      <Separator width={1} />
      <UsernameHelpTextPart text='email' validity={isEmailValid.value} />
      <View style={styles.validIconContainer}>
        {isEmailValid.value || isUsernameValid.value ? (
          <Icon name='check' style={styles.validIcon} />
        ) : (
          <Icon name='xmark' style={styles.invalidIcon} />
        )}
      </View>
    </View>
  );
};

export default UsernameHelpText;
