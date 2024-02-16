import * as Yup from 'yup';
import { getPasswordConfirmSchema, getPasswordShema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    currentPassword: Yup.string(),
    password: getPasswordShema(),
    confirm: getPasswordConfirmSchema(),
  });
