import * as Yup from 'yup';
import t from '../../services/translation';
import { addMinAndMaxNotEmpty, getEmailSchema, getPasswordConfirmSchema } from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    password: addMinAndMaxNotEmpty(Yup.string(), 'password', 5, 255),
    confirmPassword: getPasswordConfirmSchema(),
    email: getEmailSchema().nullable(),
    question_secrete: addMinAndMaxNotEmpty(Yup.string(), 'secret_question', 0, 255),
    reponse_secrete: addMinAndMaxNotEmpty(Yup.string(), 'secret_question_answer', 2, 255),
    autre_question_secrete: Yup.string().when('secret_question', ([value], schema: Yup.StringSchema) => {
      return value === 'Autre'
        ? schema.required(t.t('form_field_empty', { field: t.t('secret_question_answer') }))
        : schema.notRequired();
    }),
    centers: Yup.array(),
  });
