import { format } from 'date-fns';
import { FieldArray, Formik, FormikProps } from 'formik';
import { View } from 'native-base';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import eventShape from '../../helpers/forms/eventShape';
import { colors } from '../../style';
import { CreateEventData, ReminderInterface } from '../../types/Event';
import ErrorText from '../UI/ErrorText';
import IconButton from '../UI/IconButton';
import RNSwitch from '../UI/RNSwitch';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import Text from '../UI/Text';
import TextArea from '../UI/TextArea';
import TextField from '../UI/TextField';

interface Props {
  event: CreateEventData;
  onSubmit: any;
  isSubmitting: boolean;
}

const getReminderAsDate = (reminder: ReminderInterface | string) =>
  typeof reminder === 'object' ? format(new Date(reminder?.date), 'ddMMyyyyHHmm') : '';

const EventForm: React.FC<Props> = ({ event, onSubmit, isSubmitting }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const today = format(new Date(), 'ddMMyyyyHHmm');

  if (event.id) {
    event = {
      ...event,
      date: !event.date ? '' : format(new Date(event.date), 'ddMMyyyyHHmm'),
      rappels: event?.rappels.length === 0 ? [] : event.rappels.map(getReminderAsDate),
    };
  }

  return (
    <Formik initialValues={event} validationSchema={eventShape} onSubmit={onSubmit}>
      {({
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        touched,
        values,
      }: FormikProps<CreateEventData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
            <Icon style={{ fontSize: 20, marginRight: 8 }} name='share' color={colors.blue} />
            <RNSwitch value={values.b_prive} onPress={() => setFieldValue('b_prive', !values.b_prive)} />
            <Icon style={{ fontSize: 20, marginLeft: 8 }} name='lock' color={colors.red} />
          </View>
          <TextField
            error={errors.nom}
            touched={touched.nom}
            fieldLabel='name'
            handleChange={handleChange('nom')}
            handleBlur={handleBlur('nom')}
            iconName='tag'
            okIcon
            value={values.nom}
          />
          <Separator height={2} />
          <TextField
            error={errors.date}
            fieldLabel='datetime_placeholder'
            handleBlur={handleBlur('date')}
            handleChange={(value: string) => {
              try {
                handleChange('date')(value);
              } catch (exception) {}
            }}
            iconName='calendar-alt'
            keyboardType='number-pad'
            okIcon
            style={{ height: 50, fontSize: 18, width: '100%' }}
            touched={touched.date}
            value={!values.date ? '' : values.date}
          />
          <Separator height={2} />
          <TextField
            error={errors.lieu}
            touched={touched.lieu}
            fieldLabel='place'
            handleChange={handleChange('lieu')}
            handleBlur={handleBlur('lieu')}
            iconName='map-marker-alt'
            okIcon
            value={values.lieu}
          />
          <Separator height={2} />
          <TextArea
            error={errors.commentaire}
            touched={touched.commentaire}
            fieldLabel='comment'
            h='150'
            handleChange={handleChange('commentaire')}
            handleBlur={handleBlur('commentaire')}
            iconName='comment-alt'
            okIcon
            value={values.commentaire}
          />
          <Separator height={2} />
          {!current || !current.telephone ? (
            <ErrorText text='can_not_add_reminder_no_phone_number' />
          ) : (
            <FieldArray
              name='rappels'
              render={arrayHelpers => (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.darkGray, fontSize: 18, fontWeight: 'bold' }}>reminders</Text>
                    <IconButton iconName='bell' solid onPress={() => arrayHelpers.push(today)} />
                    <Icon name='plus' color={colors.white} style={{ position: 'absolute', right: 8, top: 8 }} />
                  </View>
                  <Separator height={1} />
                  {values.rappels.map((reminder, index) => (
                    <View key={index}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Separator width={1} />
                        <IconButton
                          backgroundColor='transparent'
                          size={30}
                          iconName='trash-alt'
                          iconColor={colors.red}
                          onPress={() => arrayHelpers.remove(index)}
                        />
                      </View>
                      <Separator height={1} />
                      <TextField
                        fieldLabel='datetime_placeholder'
                        handleChange={(newDate: any) => {
                          arrayHelpers.replace(index, !newDate ? '' : newDate);
                          handleBlur('rappels');
                        }}
                        handleBlur={handleBlur('rappels')}
                        iconName='calendar-alt'
                        keyboardType='number-pad'
                        okIcon
                        style={{ height: 50, fontSize: 18, width: '100%' }}
                        value={reminder}
                        touched={touched.rappels}
                        error={!errors.rappels ? '' : errors.rappels[index]}
                      />
                    </View>
                  ))}
                </View>
              )}
            />
          )}
          <Separator height={2} />
          <Separator height={4} />
          <RoundedButton
            isLoading={isSubmitting}
            disabled={!isValid}
            text={!event.id ? 'create' : 'update'}
            onPress={() => handleSubmit()}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default EventForm;
