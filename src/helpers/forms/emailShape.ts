import * as Yup from 'yup';
import { getEmailSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    email: getEmailSchema(),
  });
