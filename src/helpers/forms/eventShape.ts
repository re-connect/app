import * as Yup from 'yup';
import { addMinAndMax, addMinAndMaxNotEmpty, getStringFutureDateTimeSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> => Yup.object().shape({
  nom: addMinAndMaxNotEmpty(Yup.string(), 'name', 2, 255),
  commentaire: addMinAndMax(Yup.string(), 'comment', 5, 999).nullable(),
  lieu: addMinAndMax(Yup.string(), 'place', 2, 255).nullable(),
  date: getStringFutureDateTimeSchema(),
  rappels: Yup.array().of(getStringFutureDateTimeSchema()),
});
