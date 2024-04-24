import * as Yup from 'yup';
import { addMinAndMax, addMinAndMaxNotEmpty } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    nom: addMinAndMaxNotEmpty(Yup.string(), 'name', 2, 255),
    commentaire: addMinAndMax(Yup.string(), 'comment', 5, 999).nullable(),
    lieu: addMinAndMax(Yup.string(), 'place', 2, 255).nullable(),
    date: Yup.date().min(new Date()),
    rappels: Yup.array().of(Yup.date().min(new Date())),
  });
