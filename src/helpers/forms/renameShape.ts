import * as Yup from 'yup';
import { addMinAndMaxNotEmpty } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    name: addMinAndMaxNotEmpty(Yup.string(), 'name', 2, 255),
  });
