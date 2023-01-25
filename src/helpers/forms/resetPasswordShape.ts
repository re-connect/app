import * as Yup from 'yup';
import { getPasswordConfirmSchema } from './yupHelpers';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,40}$/;
export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: Yup.string().matches(
      passwordRegex,
      "Le mot de passe doit comporter au minimum 8 caractères et maximum 40 ainsi qu'au moins une majuscule, une minuscule,un chiffre et un caractère spécial (?,!,$,&,@,#)",
    ),
    confirm: getPasswordConfirmSchema(),
  });
