import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { colors } from '../../style';
import Text from '../UI/Text';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginRight: 1,
    color: colors.gray,
    fontWeight: 'bold',
  },
  valid: {
    color: colors.darkGray,
  },
});

interface Props {
  text: string;
  validity?: boolean;
}

const UsernameHelpTextPart: React.FC<Props> = ({ text, validity }) => {
  const { t } = useTranslation();

  return (
    <Text style={[styles.text, validity ? styles.valid : {}]}>
      {t(text)}
    </Text>
  );
};

export default UsernameHelpTextPart;
