import RNDateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { View } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { dateToIso, dateToString, isoToDate } from '../../helpers/dateHelpers';
import { colors } from '../../style';
import FakeTextField from './FakeTextField';
import Text from './Text';

export interface Props {
  value: string;
  handleChange: (value: string) => void;
}

const DateTimePicker: React.FC<Props> = ({ value, handleChange }) => {
  const onChangeDate = (_event: Event, currentDate?: Date) => {
    currentDate && setNewDate(dateToIso(currentDate));
    displayDatePickerAndroid && setDisplayDatePickerAndroid(false);
    displayTimePickerAndroid && setDisplayTimePickerAndroid(false);
  };
  const [displayDatePickerAndroid, setDisplayDatePickerAndroid] = useState(false);
  const [displayTimePickerAndroid, setDisplayTimePickerAndroid] = useState(false);
  const [newDate, setNewDate] = useState('');
  const date = isoToDate(value);

  React.useEffect(() => {
    newDate !== '' && handleChange(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDate]);

  return Platform.OS === 'ios' ? (
    <>
      <Text style={styles.text}>date</Text>
      <View style={styles.wrapperGlobalDatePickerIos}>
        <RNDateTimePicker
          value={date}
          mode='date'
          onChange={onChangeDate}
          minimumDate={new Date()}
          themeVariant='light'
          style={styles.datePickerIos}
        />
        <RNDateTimePicker
          value={date}
          mode='time'
          onChange={onChangeDate}
          minimumDate={new Date()}
          themeVariant='light'
          style={[styles.datePickerIos, { width: 90 }]}
        />
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

const isLittleDevice = Dimensions.get('window').width <= 375;
const styles = StyleSheet.create({
  text: {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
    marginBottom: 3,
  },
  datePickerIos: {
    width: isLittleDevice ? 135 : 150,
    marginLeft: isLittleDevice ? 0 : -25,
    marginRight: isLittleDevice ? 10 : 15,
  },
  wrapperGlobalDatePickerIos: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default DateTimePicker;
