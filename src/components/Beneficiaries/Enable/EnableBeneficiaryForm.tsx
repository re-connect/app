import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import UserContext from '../../../context/UserContext';
import enableBeneficiaryShape from '../../../helpers/forms/enableBeneficiaryShape';
import { useEnableBeneficiary } from '../../../hooks/BeneficiariesHooks';
import { EnableBeneficiaryDataInterface } from '../../../types/Beneficiaries';
import RoundedButton from '../../UI/RoundedButton';
import Separator from '../../UI/Separator';
import TextField from '../../UI/TextField';
import SecretQuestionPicker from '../SecretQuestionPicker';

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
              <TextField
                contentType='emailAddress'
                autocompleteType='email'
                fieldLabel='email_optional'
                iconName='at'
                keyboardType='email-address'
                error={errors.email}
                handleBlur={props.handleBlur('email')}
                handleChange={props.handleChange('email')}
                touched={props.touched.email}
                value={props.values.email}
              />
              <Separator height={3} />
              <TextField
                contentType='password'
                fieldLabel='password'
                iconName='key'
                error={errors.password}
                handleBlur={props.handleBlur('password')}
                handleChange={props.handleChange('password')}
                touched={props.touched.password}
                value={props.values.password}
              />
              {!props.values.password ? null : (
                <>
                  <Separator height={3} />
                  <TextField
                    contentType='password'
                    fieldLabel='confirm_password'
                    iconName='key'
                    error={errors.confirmPassword}
                    handleBlur={props.handleBlur('confirmPassword')}
                    handleChange={props.handleChange('confirmPassword')}
                    touched={props.touched.confirmPassword}
                    value={props.values.confirmPassword}
                  />
                </>
              )}
              <Separator height={3} />
              <SecretQuestionPicker fieldName={'question_secrete'} />
              {props.values.question_secrete && props.values.question_secrete === 'Autre' ? (
                <>
                  <Separator height={3} />
                  <TextField
                    contentType='none'
                    autocompleteType='off'
                    fieldLabel='secret_question_custom_text'
                    iconName='question'
                    error={errors.autre_question_secrete}
                    handleBlur={props.handleBlur('autre_question_secrete')}
                    handleChange={props.handleChange('autre_question_secrete')}
                    touched={props.touched.autre_question_secrete}
                    value={props.values.autre_question_secrete}
                  />
                </>
              ) : null}
              {!props.values.question_secrete ? null : (
                <>
                  <Separator height={3} />
                  <TextField
                    contentType='none'
                    autocompleteType='off'
                    fieldLabel='secret_answer'
                    iconName='question-circle'
                    error={errors.reponse_secrete}
                    handleBlur={props.handleBlur('reponse_secrete')}
                    handleChange={props.handleChange('reponse_secrete')}
                    touched={props.touched.reponse_secrete}
                    value={props.values.reponse_secrete}
                  />
                </>
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
