import * as Yup from 'yup';
import { addMinAndMaxNotEmpty } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    nom: addMinAndMaxNotEmpty(Yup.string(), 'name', 2, 255),
    contenu: addMinAndMaxNotEmpty(Yup.string(), 'content', 5, 999),
  });
