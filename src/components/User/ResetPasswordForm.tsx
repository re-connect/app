import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import resetPasswordShape from '../../helpers/forms/resetPasswordShape';
import { useResetPassword } from '../../hooks/UserHooks';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import TextField from '../UI/TextField';

export interface ResetPasswordData {
  password: string;
  confirm: string;
}

const ResetPasswordForm: React.FC = () => {
  const { isResetting, reset } = useResetPassword();
  return (
    <Formik
      validationSchema={resetPasswordShape}
      onSubmit={(values) => reset(values)}
      initialValues={{ password: '', confirm: '' }}
    >
      {({
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }: FormikProps<ResetPasswordData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Separator height={2} />
          <TextField
            contentType="password"
            error={errors.password}
            fieldLabel="new_password"
            handleBlur={handleBlur('password')}
            handleChange={handleChange('password')}
            iconName="tag"
            okIcon
            touched={touched.password}
            value={values.password}
          />
          <Separator height={2} />
          <TextField
            contentType="password"
            error={errors.confirm}
            fieldLabel="confirm_password"
            handleBlur={handleBlur('confirm')}
            handleChange={handleChange('confirm')}
            iconName="tag"
            okIcon
            touched={touched.confirm}
            value={values.confirm}
          />
          <Separator height={2} />
          <RoundedButton
            isLoading={isResetting}
            disabled={!isValid}
            iconName="save"
            text="update"
            onPress={() => handleSubmit()}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
