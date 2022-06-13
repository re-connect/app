export interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormErrors {
  username?: string;
  password?: string;
}

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};
  if (!values.username) {
    errors.username = 'required_field';
  }
  if (!values.password) {
    errors.password = 'required_field';
  }

  return errors;
};
