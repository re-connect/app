import * as Yup from 'yup';
import { getPasswordConfirmSchema } from './yupHelpers';
import t from '../../services/translation';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,40}$/;
export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: Yup.string().matches(passwordRegex, t.t('form_field_password_security_invalid')),
    confirm: getPasswordConfirmSchema(),
  });
