import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../style';
import Text from '../UI/Text';

const styles = StyleSheet.create({
  text: { fontSize: 16, marginRight: 1, color: colors.gray, fontWeight: 'bold' },
  valid: { color: colors.darkGray },
});

interface Props {
  text: string;
  validity?: boolean;
}

const UsernameHelpTextPart: React.FC<Props> = ({ text, validity }) => (
  <Text style={[styles.text, validity ? styles.valid : {}]}>{text}</Text>
);

export default UsernameHelpTextPart;
