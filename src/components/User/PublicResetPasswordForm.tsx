import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useResetPassword } from '../../hooks/UserHooks';
import RoundedButton from '../UI/RoundedButton';
import PasswordValidityWidget from './PasswordValidityWidget';
import Shape from '../../helpers/forms/resetPasswordShape';
import FormikTextField from '../UI/FormikTextField';
import Separator from '../UI/Separator';
import { ResetPasswordData } from '../../types/Users';

type Props = {
  username: string;
};

const PublicResetPasswordForm: React.FC<Props> = ({ username }) => {
  const { isResetting, reset } = useResetPassword(username);
  const initialValues = { password: '', confirm: '' };

  return (
    <Formik validationSchema={Shape} onSubmit={values => reset(values)} initialValues={initialValues}>
      {(formikBag: FormikProps<ResetPasswordData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <Separator height={4} />
          <FormikTextField
            formikBag={formikBag}
            name="currentPassword"
            contentType="password"
            label="current_password"
            icon="key"
            displayError
          />
          <FormikTextField
            formikBag={formikBag}
            contentType="password"
            name="password"
            label="new_password"
            icon="key"
            displayError
          />
          <PasswordValidityWidget password={formikBag.values.password} />
          <FormikTextField
            formikBag={formikBag}
            contentType="password"
            name="confirm"
            label="confirm_password"
            icon="key"
            displayError
          />
          <RoundedButton
            isLoading={isResetting}
            disabled={!formikBag.isValid}
            iconName="save"
            text="update"
            onPress={() => formikBag.handleSubmit()}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default PublicResetPasswordForm;
