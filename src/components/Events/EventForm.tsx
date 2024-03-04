import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import eventShape from '../../helpers/forms/eventShape';
import { colors } from '../../style';
import { CreateEventData, ReminderInterface } from '../../types/Event';
import { dateToIso } from '../../helpers/dateHelpers';
import DateTimePicker from '../UI/DateTimePicker';
import FormikTextField from '../UI/FormikTextField';
import RNSwitch from '../UI/RNSwitch';
import RoundedButton from '../UI/RoundedButton';
import RemindersForm from './RemindersForm';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  icons: { flexDirection: 'row', justifyContent: 'flex-end', padding: 8 },
  iconRight: { fontSize: 20, marginRight: 8 },
  iconLeft: { fontSize: 20, marginLeft: 8 },
});
interface Props {
  event: CreateEventData;
  onSubmit: any;
  isSubmitting: boolean;
}

const EventForm: React.FC<Props> = ({ event, onSubmit, isSubmitting }) => {
  const stringArrayReminder: string[] = [];
  // Format the reminder object array (comes from api) to string array (for formik)s
  event.rappels.map((reminder: ReminderInterface | string) =>
    stringArrayReminder.push(typeof reminder !== 'string' ? reminder.date : reminder),
  );

  return (
    <Formik
      initialValues={{ ...event, rappels: stringArrayReminder }}
      validationSchema={eventShape}
      onSubmit={onSubmit}>
      {(formikBag: FormikProps<CreateEventData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.icons}>
            <Icon style={styles.iconLeft} name='share' color={colors.blue} />
            <RNSwitch
              value={formikBag.values.b_prive}
              onPress={() => formikBag.setFieldValue('b_prive', !formikBag.values.b_prive)}
            />
            <Icon style={styles.iconRight} name='lock' color={colors.red} />
          </View>
          <FormikTextField formikBag={formikBag} name='nom' icon='tag' label='name' />
          <DateTimePicker
            value={formikBag.values.date}
            handleChange={date => {
              if (formikBag.values.date !== dateToIso(date)) {
                formikBag.setFieldValue('date', dateToIso(date));
              }
            }}
          />
          <FormikTextField formikBag={formikBag} name='lieu' icon='map-pin' label='place' />
          <FormikTextField formikBag={formikBag} name='commentaire' icon='comment-alt' label='comment' isTextArea />
          <RemindersForm reminders={formikBag.values.rappels} handleBlur={formikBag.handleBlur} />
          <RoundedButton
            isLoading={isSubmitting}
            disabled={!formikBag.isValid}
            text={!event.id ? 'create' : 'update'}
            onPress={formikBag.handleSubmit}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default EventForm;
