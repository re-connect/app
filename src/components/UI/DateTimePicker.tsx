import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useBoolean } from 'react-hanger/array';
import { format } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { dateToString, isoToDate } from '../../helpers/dateHelpers';
import { colors } from '../../style';
import FakeTextField from './FakeTextField';
import Text from './Text';

export interface Props {
  value: string;
  handleChange: (value: Date) => void;
}

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
  fakeTestFieldsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  wrapperGlobalDatePickerIos: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const DateTimePicker: React.FC<Props> = ({ value, handleChange }) => {
  const [showAndroidDatePicker, showAndroidDatePickerActions] = useBoolean(false);
  const [showAndroidTimePicker, showAndroidTimePickerActions] = useBoolean(false);
  const [date, setDate] = useState<Date>(isoToDate(value));
  const changeDate = (newDate: Date) => {
    setDate(newDate);
    handleChange(newDate);
  };

  const changeAndroidDate = (event: DateTimePickerEvent, newDate?: Date) => {
    showAndroidDatePickerActions.setFalse();
    if (event.type === 'set') {
      newDate && changeDate(newDate);
    }
  };
  const changeAndroidTime = (event: DateTimePickerEvent, newDate?: Date) => {
    showAndroidTimePickerActions.setFalse();
    if (event.type === 'set') {
      newDate && changeDate(newDate);
    }
  };

  return Platform.OS === 'ios' ? (
    <>
      <Text style={styles.text}>date</Text>
      <View style={styles.wrapperGlobalDatePickerIos}>
        <RNDateTimePicker
          value={date}
          mode='date'
          onChange={(_event: DateTimePickerEvent, newDate?: Date) => newDate && changeDate(newDate)}
          minimumDate={new Date()}
          themeVariant='light'
          style={styles.datePickerIos}
        />
        <RNDateTimePicker
          value={date}
          mode='time'
          onChange={(_event: DateTimePickerEvent, newDate?: Date) => newDate && changeDate(newDate)}
          minimumDate={new Date()}
          themeVariant='light'
          style={[styles.datePickerIos, { width: 90 }]}
        />
      </View>
    </>
  ) : (
    <>
      <View style={styles.fakeTestFieldsContainer}>
        <FakeTextField
          value={dateToString(date)}
          onPress={() => showAndroidDatePickerActions.setTrue()}
          iconName='calendar-day'
        />
        <View style={{ flex: 0.1 }} />
        <FakeTextField
          value={format(date, 'HH:mm')}
          onPress={() => showAndroidTimePickerActions.setTrue()}
          iconName='clock'
        />
      </View>

      {showAndroidDatePicker && (
        <RNDateTimePicker value={date} minimumDate={new Date()} mode="date" onChange={changeAndroidDate} />
      )}
      {showAndroidTimePicker && (
        <RNDateTimePicker value={date} minimumDate={new Date()} mode="time" onChange={changeAndroidTime} />
      )}
    </>
  );
};

export default DateTimePicker;
