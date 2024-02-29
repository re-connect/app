import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { checkUserNameValidity, UsernameValidityInterface } from '../../services/usernameValidation';
import { colors } from '../../style';
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

type Props = {
  username: string;
};

const BeneficiaryUsernameHelpText: React.FC<Props> = ({ username }) => {
  const [usernameValidity, setUsernameValidity] = React.useState<UsernameValidityInterface>({});

  let isEverythingValid = true;
  Object.values(usernameValidity).map((value: boolean): void => {
    if (!value) {
      isEverythingValid = false;
    }
  });

  React.useEffect((): void => {
    setUsernameValidity(checkUserNameValidity(username));
  }, [username]);

  return (
    <View style={styles.usernameHelp}>
      <UsernameHelpTextPart text='first_name_lower' validity={usernameValidity.firstName} />
      <UsernameHelpTextPart text='.' validity={usernameValidity.firstDot} />
      <UsernameHelpTextPart text='last_name_lower' validity={usernameValidity.lastName} />
      <UsernameHelpTextPart text='.' validity={usernameValidity.secondDot} />
      <UsernameHelpTextPart text='dd' validity={usernameValidity.day} />
      <UsernameHelpTextPart text='/' validity={usernameValidity.firstSlash} />
      <UsernameHelpTextPart text='mm' validity={usernameValidity.month} />
      <UsernameHelpTextPart text='/' validity={usernameValidity.secondSlash} />
      <UsernameHelpTextPart text='yyyy' validity={usernameValidity.year} />
      <View style={styles.validIconContainer}>
        {!isEverythingValid ? (
          <Icon name='xmark' style={styles.invalidIcon} />
        ) : (
          <Icon name='check' style={styles.validIcon} />
        )}
      </View>
    </View>
  );
};

export default BeneficiaryUsernameHelpText;
