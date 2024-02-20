import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useResetPassword } from '../../hooks/UserHooks';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import TextField from '../UI/TextField';
import PasswordValidityWidget from './PasswordValidityWidget';
import Shape from '../../helpers/forms/resetPasswordShape';
import { ResetPasswordData } from '../../types/Users';

const ResetPasswordForm: React.FC = () => {
  const { isResetting, reset } = useResetPassword();
  const initialValues = { password: '', confirm: '' };

  return (
    <Formik validationSchema={Shape} onSubmit={values => reset(values)} initialValues={initialValues}>
      {({
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }: FormikProps<ResetPasswordData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <Separator height={2} />
          <TextField
            contentType='password'
            error={errors.password}
            fieldLabel='new_password'
            handleBlur={handleBlur('password')}
            handleChange={handleChange('password')}
            iconName='key'
            okIcon
            touched={touched.password}
            value={values.password}
            displayError
          />
          <Separator height={2} />
          <PasswordValidityWidget password={values.password} />
          <Separator height={2} />
          <TextField
            contentType='password'
            error={errors.confirm}
            fieldLabel='confirm_password'
            handleBlur={handleBlur('confirm')}
            handleChange={handleChange('confirm')}
            iconName='key'
            okIcon
            touched={touched.confirm}
            value={values.confirm}
            displayError
          />
          <Separator height={2} />
          <RoundedButton
            isLoading={isResetting}
            disabled={!isValid}
            iconName='save'
            text='update'
            onPress={() => handleSubmit()}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
