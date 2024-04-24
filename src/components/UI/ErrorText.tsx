import { FormikErrors } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';

const style = StyleSheet.create({
  text: { marginLeft: 32, marginTop: 8, color: 'red' },
});

interface Props {
  text: FormikErrors<Date> | string;
}

const ErrorText: React.FC<Props> = ({ text }) => <Text style={style.text}>{text as string}</Text>;

export default ErrorText;
