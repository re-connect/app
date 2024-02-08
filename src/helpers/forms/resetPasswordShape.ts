import * as Yup from 'yup';
import { getPasswordConfirmSchema, getPasswordShema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: getPasswordShema(),
    confirm: getPasswordConfirmSchema(),
  });
