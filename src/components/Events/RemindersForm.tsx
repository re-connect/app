import { FieldArray } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import { dateToIso } from '../../helpers/dateHelpers';
import { colors } from '../../style';
import ErrorText from '../UI/ErrorText';
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';
import ReminderForm from './ReminderForm';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  text: { color: colors.darkGray, fontSize: 18, fontWeight: 'bold' },
  icon: { position: 'absolute', right: 8, top: 8 },
  reminders: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});

interface Props {
  reminders: string[];
  handleBlur: (field: string) => void;
}

const RemindersForm: React.FC<Props> = ({ reminders, handleBlur }) => {
  const { current } = React.useContext(BeneficiaryContext);

  if (!current || !current.telephone) {
    return <ErrorText text='can_not_add_reminder_no_phone_number' />;
  }

  return (
    <FieldArray
      name='rappels'
      render={arrayHelpers => (
        <View>
          <View style={styles.reminders}>
            <Text style={styles.text}>reminders</Text>
            <IconButton iconName='bell' onPress={() => arrayHelpers.push(dateToIso(new Date()))} />
            <Icon name='plus' color={colors.white} style={styles.icon} />
          </View>
          <Separator height={1} />
          {reminders.map((reminder, index) => (
            <ReminderForm
              key={index}
              reminder={reminder}
              index={index}
              arrayHelpers={arrayHelpers}
              handleBlur={handleBlur}
            />
          ))}
        </View>
      )}
    />
  );
};

export default RemindersForm;
