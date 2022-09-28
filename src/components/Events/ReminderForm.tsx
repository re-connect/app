import { ArrayHelpers } from 'formik';
import { Row, View } from 'native-base';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../style';
import DateTimePicker from '../UI/DateTimePicker';
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';

interface Props {
  reminder: string;
  arrayHelpers: ArrayHelpers;
  index: number;
  handleBlur: (field: string) => void;
}

const ReminderForm: React.FC<Props> = ({ reminder, arrayHelpers, index, handleBlur }) => {
  const onChange = (value: string) => {
    arrayHelpers.replace(index, value);
    handleBlur('rappels');
  };

  return (
    <View>
      <Row>
        <Row style={styles.reminder}>
          <DateTimePicker value={reminder} handleChange={onChange} />
          <Separator width={1} />
        </Row>
        <IconButton
          backgroundColor='transparent'
          size={40}
          iconName='trash-alt'
          iconColor={colors.red}
          onPress={() => arrayHelpers.remove(index)}
        />
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  reminder: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 4,
    width: '90%',
    marginLeft: Platform.OS === 'ios' ? 0 : 5,
  },
});

export default ReminderForm;
