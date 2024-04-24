import * as Yup from 'yup';
import { addMinAndMax, addMinAndMaxNotEmpty, getEmailSchema, getGenericPhoneSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    nom: addMinAndMaxNotEmpty(Yup.string(), 'last_name', 2, 255),
    prenom: addMinAndMaxNotEmpty(Yup.string(), 'first_name', 2, 255),
    association: addMinAndMax(Yup.string(), 'association', 2, 255).nullable(),
    email: getEmailSchema().nullable(),
    commentaire: addMinAndMax(Yup.string(), 'comment', 5, 255).nullable(),
    telephone: getGenericPhoneSchema().nullable(),
  });
