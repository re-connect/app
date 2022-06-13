import * as Yup from 'yup';
import { addMinAndMaxNotEmpty, getPasswordConfirmSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> => Yup.object().shape({
  password: addMinAndMaxNotEmpty(Yup.string(), 'password', 5, 255),
  confirm: getPasswordConfirmSchema(),
});