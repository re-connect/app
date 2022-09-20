import RNDateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { View } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { dateToIso, dateToString, isoToDate } from '../../helpers/dateHelpers';
import { colors } from '../../style';
import FakeTextField from './FakeTextField';
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
  const [displayDatePickerAndroid, setDisplayDatePickerAndroid] = useState(false);
  const [displayTimePickerAndroid, setDisplayTimePickerAndroid] = useState(false);
  const date = isoToDate(value);

  console.log('value', value);
  console.log('date', date);

  React.useEffect(() => {
    value !== '' && setDisplayDatePickerAndroid(false);
    value !== '' && setDisplayTimePickerAndroid(false);
  }, [value]);

  return Platform.OS === 'ios' ? (
    <>
      <Text style={styles.text}>date</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={{ flex: 0.3, alignSelf: 'flex-start', justifyContent: 'center' }}>
          <RNDateTimePicker value={date} mode='date' onChange={onChangeDate} minimumDate={new Date()} />
        </View>
        <View style={{ flex: 0.3, alignSelf: 'flex-start', justifyContent: 'center' }}>
          <RNDateTimePicker value={date} mode='time' onChange={onChangeDate} minimumDate={new Date()} />
        </View>
      </View>
    </>
  ) : (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <FakeTextField
          value={dateToString(date)}
          onPress={() => setDisplayDatePickerAndroid(true)}
          iconName='calendar-day'
        />
        <View height={10} style={{ flex: 0.1 }} />
        <FakeTextField
          value={format(date, 'HH:mm')}
          onPress={() => setDisplayTimePickerAndroid(true)}
          iconName='clock'
        />
      </View>

      {displayDatePickerAndroid && (
        <RNDateTimePicker
          value={date}
          minimumDate={new Date()}
          mode='date'
          onChange={onChangeDate}
          onTouchCancel={() => setDisplayDatePickerAndroid(false)}
        />
      )}
      {displayTimePickerAndroid && (
        <RNDateTimePicker
          value={date}
          minimumDate={new Date()}
          mode='time'
          onChange={onChangeDate}
          onTouchCancel={() => setDisplayTimePickerAndroid(false)}
        />
      )}
    </>
  );
};

export default DateTimePicker;
