import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { parse } from 'date-fns';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { useArray, useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import CenterContext from '../../../context/CenterContext';
import { dateToString, stringToDate } from '../../../helpers/dateHelpers';
import Shape from '../../../helpers/forms/createBeneficiaryShape';
import { useCreateBeneficiary } from '../../../hooks/BeneficiariesHooks';
import { useFetchCenters } from '../../../hooks/CentersHooks';
import { colors } from '../../../style';
import { CreateBeneficiaryDataInterface } from '../../../types/Beneficiaries';
import ErrorText from '../../UI/ErrorText';
import FakeTextField from '../../UI/FakeTextField';
import PhoneInputField from '../../UI/PhoneInputField';
import RoundedButton from '../../UI/RoundedButton';
import Separator from '../../UI/Separator';
import Text from '../../UI/Text';
import TextField from '../../UI/TextField';
import RNSwitch from '../../UI/RNSwitch';
import i18n from '../../../services/translation';
import SecretQuestionPicker from '../SecretQuestionPicker';
import PasswordValidityWidget from '../../User/PasswordValidityWidget';

const styles = StyleSheet.create({
  form: { paddingHorizontal: 8 },
  errorText: { color: 'red', textAlign: 'center' },
  wrapperCenters: { padding: 10, marginBottom: 15 },
  wrapperSwitch: { marginRight: 8 },
  wrapperSwitches: { alignItems: 'center', flexDirection: 'row', marginTop: 5 },
  selectWrapper: {
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderRadius: 48,
    height: 48,
    borderColor: colors.darkGray,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 18,
  },
});

const initialFormValues: CreateBeneficiaryDataInterface = {
  first_name: '',
  last_name: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  birth_date: '',
  secret_question: '',
  secret_question_answer: '',
  centers: [],
};

const CreateBeneficiaryForm: React.FC = () => {
  const { t } = useTranslation();
  const { isCreating, triggerCreateBeneficiary, createErrors } = useCreateBeneficiary();
  useFetchCenters();
  const { list } = React.useContext(CenterContext);
  const [showDatepicker, showDatepickerActions] = useBoolean(false);
  const [centers, centersActions] = useArray<number>([]);
  const locale = i18n.language;

  const allCenters = list.map(value => ({
    id: value.centre ? value.centre.id : value.id,
    name: value.centre.nom,
  }));
  if (allCenters.length > 0 && initialFormValues.centers.length === 0) {
    initialFormValues.centers.push(allCenters[0].id);
  }

  const toggleCheckbox = (id: number) => {
    if (centers.includes(id)) {
      centersActions.setValue([...centers.filter((value: number) => value !== id)]);
    } else {
      centersActions.add(id);
    }
  };

  return (
    <ScrollView>
      <Formik
        enableReinitialize={true}
        initialValues={initialFormValues}
        validationSchema={Shape}
        onSubmit={values => triggerCreateBeneficiary({ ...values, centers })}>
        {(formikBag: FormikProps<CreateBeneficiaryDataInterface>) => {
          const allErrors = { ...formikBag.errors, ...createErrors };
          if (formikBag.values.birth_date === '') {
            allErrors.birth_date = t('required_field');
          }

          const onChangeDate = (selectedDate?: Date) => {
            const currentDate = selectedDate || parse(formikBag.values.birth_date, 'ddMMyyyy', new Date());
            showDatepickerActions.setFalse();
            formikBag.handleChange('birth_date')(dateToString(currentDate));
          };
          const isFormTouched = Object.keys(formikBag.touched).length > 0;

          return (
            <>
              <TextField
                contentType='name'
                fieldLabel='first_name_required'
                iconName='user-large'
                error={allErrors.first_name}
                handleBlur={formikBag.handleBlur('first_name')}
                handleChange={formikBag.handleChange('first_name')}
                touched={formikBag.touched.first_name}
                value={formikBag.values.first_name}
                okIcon
              />
              {formikBag.touched.first_name && allErrors.first_name ? <ErrorText text={allErrors.first_name} /> : null}
              <Separator height={1} />
              <TextField
                contentType='familyName'
                autocompleteType='name'
                fieldLabel='last_name_required'
                iconName='users'
                error={allErrors.last_name}
                handleBlur={formikBag.handleBlur('last_name')}
                handleChange={formikBag.handleChange('last_name')}
                touched={formikBag.touched.last_name}
                value={formikBag.values.last_name}
                okIcon
              />
              {formikBag.touched.last_name && allErrors.last_name ? <ErrorText text={allErrors.last_name} /> : null}
              <Separator height={2} />
              <FakeTextField
                onPress={showDatepickerActions.toggle}
                value={formikBag.values.birth_date === '' ? t('birth_date') : formikBag.values.birth_date}
                iconName='calendar-alt'
                touched={isFormTouched}
                error={allErrors.birth_date}
              />
              {showDatepicker && (
                <DateTimePicker
                  testID='dateTimePicker'
                  value={stringToDate(formikBag.values.birth_date)}
                  mode='date'
                  display='inline'
                  onChange={(_event, date) => onChangeDate(date)}
                  locale={locale}
                />
              )}
              <Separator height={1} />
              <TextField
                contentType='password'
                fieldLabel='password_required'
                iconName='key'
                error={allErrors.password}
                handleBlur={formikBag.handleBlur('password')}
                handleChange={formikBag.handleChange('password')}
                touched={formikBag.touched.password}
                value={formikBag.values.password}
                okIcon
              />
              {!formikBag.values.password ? null : (
                <>
                  <Separator height={1} />
                  <PasswordValidityWidget password={formikBag.values.password} />
                  <Separator height={1} />
                  <TextField
                    contentType='password'
                    fieldLabel='confirm_password_required'
                    iconName='key'
                    error={allErrors.confirmPassword}
                    handleBlur={formikBag.handleBlur('confirmPassword')}
                    handleChange={formikBag.handleChange('confirmPassword')}
                    touched={formikBag.touched.confirmPassword}
                    value={formikBag.values.confirmPassword}
                    okIcon
                  />
                  {formikBag.touched.confirmPassword && allErrors.confirmPassword ? (
                    <ErrorText text={allErrors.confirmPassword} />
                  ) : null}
                </>
              )}
              <Separator height={2} />
              <SecretQuestionPicker fieldName='secret_question' />
              {isFormTouched && allErrors.secret_question ? <ErrorText text={allErrors.secret_question} /> : null}
              {formikBag.values.secret_question && formikBag.values.secret_question === 'Autre' ? (
                <>
                  <Separator height={1} />
                  <TextField
                    contentType='none'
                    autocompleteType='off'
                    fieldLabel='secret_answer_required'
                    iconName='question'
                    error={allErrors.secret_question_custom_text}
                    handleBlur={formikBag.handleBlur('secret_question_custom_text')}
                    handleChange={formikBag.handleChange('secret_question_custom_text')}
                    touched={formikBag.touched.secret_question_custom_text}
                    value={formikBag.values.secret_question_custom_text}
                    okIcon
                  />
                </>
              ) : null}
              {!formikBag.values.secret_question ? null : (
                <>
                  <Separator height={1} />
                  <TextField
                    contentType='none'
                    autocompleteType='off'
                    fieldLabel='answer_required'
                    iconName='question-circle'
                    error={allErrors.secret_question_answer}
                    handleBlur={formikBag.handleBlur('secret_question_answer')}
                    handleChange={formikBag.handleChange('secret_question_answer')}
                    touched={formikBag.touched.secret_question_answer}
                    value={formikBag.values.secret_question_answer}
                    okIcon
                  />
                  {isFormTouched && allErrors.secret_question_answer ? (
                    <ErrorText text={allErrors.secret_question_answer} />
                  ) : null}
                </>
              )}
              <Separator height={1} />
              <TextField
                contentType='emailAddress'
                autocompleteType='email'
                fieldLabel='email'
                iconName='at'
                keyboardType='email-address'
                error={allErrors.email}
                handleBlur={formikBag.handleBlur('email')}
                handleChange={formikBag.handleChange('email')}
                touched={formikBag.touched.email}
                value={formikBag.values.email}
                okIcon
              />
              {formikBag.touched.email && allErrors.email ? <ErrorText text={allErrors.email} /> : null}
              <Separator height={1} />
              <PhoneInputField
                error={allErrors.phone}
                handleBlur={formikBag.handleBlur('phone')}
                handleChange={formikBag.handleChange('phone')}
                touched={formikBag.touched.phone}
                value={formikBag.values.phone}
                okIcon
              />
              {formikBag.touched.phone && allErrors.phone ? <ErrorText text={allErrors.phone} /> : null}
              <View style={styles.wrapperCenters}>
                <Text style={{ color: colors.darkGray }}>Centres</Text>
                {allCenters.map(item => (
                  <View key={item.id} style={styles.wrapperSwitches}>
                    <View style={styles.wrapperSwitch}>
                      <RNSwitch
                        key={item.id}
                        value={centers.includes(item.id)}
                        onPress={() => toggleCheckbox(item.id)}
                        inactiveColor='#ccc'
                        activeColor={colors.primaryPro}
                      />
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                ))}
              </View>
              <RoundedButton
                text='create'
                iconName='plus'
                disabled={!formikBag.isValid}
                onPress={formikBag.handleSubmit}
                isLoading={isCreating}
              />
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreateBeneficiaryForm;
