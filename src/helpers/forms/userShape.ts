import * as Yup from 'yup';
import { addMinAndMax, getEmailSchema, getGenericPhoneSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    nom: addMinAndMax(Yup.string(), 'last_name', 2, 255).notRequired(),
    prenom: addMinAndMax(Yup.string(), 'first_name', 2, 255).notRequired(),
    email: getEmailSchema().notRequired(),
    telephone: getGenericPhoneSchema().notRequired(),
  });
