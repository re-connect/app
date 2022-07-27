import { ArrayHelpers } from 'formik';
import { Row, View } from 'native-base';
import * as React from 'react';
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
        <Separator width={1} />
        <IconButton
          backgroundColor='transparent'
          size={30}
          iconName='trash-alt'
          iconColor={colors.red}
          onPress={() => arrayHelpers.remove(index)}
        />
      </Row>
      <Separator height={1} />
      <DateTimePicker value={reminder} handleChange={onChange} />
    </View>
  );
};

export default ReminderForm;
