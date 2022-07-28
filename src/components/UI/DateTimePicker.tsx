import RNDateTimePicker, { Event } from '@react-native-community/datetimepicker';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { dateToIso, isoToDate } from '../../helpers/dateHelpers';
import { colors } from '../../style';
import Text from './Text';

const styles = StyleSheet.create({
  text: { color: colors.darkGray, fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
});

export interface Props {
  value: string;
  handleChange: (value: string) => void;
}

const DateTimePicker: React.FC<Props> = ({ value, handleChange }) => {
  const onChangeDate = (_event: Event, date?: Date) => {
    handleChange(dateToIso(date));
  };
  const date = isoToDate(value);

  return (
    <>
      <Text style={styles.text}>date</Text>
      <RNDateTimePicker value={date} mode='date' onChange={onChangeDate} />
      <RNDateTimePicker value={date} mode='time' onChange={onChangeDate} />
    </>
  );
};

export default DateTimePicker;
