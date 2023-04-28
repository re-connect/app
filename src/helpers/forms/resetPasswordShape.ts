import * as Yup from 'yup';
import { addMinAndMaxNotEmpty, getPasswordConfirmSchema } from './yupHelpers';
import t from '../../services/translation';

const passwordRegex =
  /^(?:(?=.*[!@#$%^&*()\-_=+{};:,<.>§~])(?=.*[0-9])(?=.*[a-z]))|(?:(?=.*[!@#$%^&*()\-_=+{};:,<.>§~])(?=.*[0-9])(?=.*[A-Z]))|(?:(?=.*[!@#$%^&*()\-_=+{};:,<.>§~])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))\S*{8,40}$/;
const resetPasswordMemberShape = (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: Yup.string().matches(passwordRegex, t.t('form_field_password_security_invalid')),
    confirm: getPasswordConfirmSchema(),
  });

const resetPasswordUserShape = (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: addMinAndMaxNotEmpty(Yup.string(), 'password', 5, 255),
    confirm: getPasswordConfirmSchema(),
  });

export { resetPasswordMemberShape, resetPasswordUserShape };
