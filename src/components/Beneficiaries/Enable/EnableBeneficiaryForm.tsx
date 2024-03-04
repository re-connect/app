import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import UserContext from '../../../context/UserContext';
import enableBeneficiaryShape from '../../../helpers/forms/enableBeneficiaryShape';
import { useEnableBeneficiary } from '../../../hooks/BeneficiariesHooks';
import { EnableBeneficiaryDataInterface } from '../../../types/Beneficiaries';
import RoundedButton from '../../UI/RoundedButton';
import Separator from '../../UI/Separator';
import FormikTextField from '../../UI/FormikTextField';
import SecretQuestionPicker from '../SecretQuestionPicker';
import PasswordValidityWidget from '../../User/PasswordValidityWidget';

const initialFormValues = {
  autre_question_secrete: '',
  confirmPassword: '',
  email: '',
  password: '',
  question_secrete: '',
  reponse_secrete: '',
};

const EnableBeneficiaryForm: React.FC = () => {
  const { isCreating, triggerEnableBeneficiary, enableErrors } = useEnableBeneficiary();
  const { user } = React.useContext(UserContext);

  return (
    <>
      <Separator height={2} />
      <Formik
        enableReinitialize={true}
        initialValues={initialFormValues}
        onSubmit={values => triggerEnableBeneficiary(values)}
        validationSchema={enableBeneficiaryShape}>
        {(props: FormikProps<EnableBeneficiaryDataInterface>) => {
          const errors = { ...props.errors, ...enableErrors };
          props.values.email = user?.email && props.values.email === '' ? user?.email : props.values.email;

          return (
            <View style={{ paddingHorizontal: 32 }}>
              <FormikTextField
                formikBag={props}
                name="email"
                contentType="emailAddress"
                autocompleteType="email"
                icon="at"
                label="email_optional"
                keyboardType="email-address"
              />
              <FormikTextField formikBag={props} name='password' contentType='password' icon='key' />
              <PasswordValidityWidget password={props.values.password} />
              {!props.values.password ? null : (
                <FormikTextField
                  formikBag={props}
                  name="confirmPassword"
                  label="confirm_password"
                  contentType="password"
                  icon="key"
                  displayError
                />
              )}
              <SecretQuestionPicker fieldName={'question_secrete'} />
              <Separator height={3} />
              {props.values.question_secrete && props.values.question_secrete === 'Autre' ? (
                <FormikTextField
                  formikBag={props}
                  name='autre_question_secrete'
                  icon='question'
                  label='secret_question_custom_text'
                  autocompleteType='off'
                />
              ) : null}
              {!props.values.question_secrete ? null : (
                <FormikTextField
                  formikBag={props}
                  name="reponse_secrete"
                  icon="question-circle"
                  label="secret_answer"
                  autocompleteType="off"
                />
              )}
              <Separator height={6} />
              <RoundedButton text='confirm' onPress={() => props.handleSubmit()} isLoading={isCreating} />
              <Separator height={6} />
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default EnableBeneficiaryForm;
