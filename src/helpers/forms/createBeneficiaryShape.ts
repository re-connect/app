import * as Yup from 'yup';
import t from '../../services/translation';
import {
  addMinAndMaxNotEmpty,
  addOnlyLetters,
  getEmailSchema,
  getItlPhoneSchema,
  getPasswordConfirmSchema,
  getPasswordShema,
  getStringDateSchema,
} from './yupHelpers';

export default (): Yup.ObjectSchema<any> =>
  Yup.object().shape({
    first_name: addOnlyLetters(addMinAndMaxNotEmpty(Yup.string(), 'first_name', 2, 254)),
    last_name: addOnlyLetters(addMinAndMaxNotEmpty(Yup.string(), 'last_name', 2, 254)),
    password: getPasswordShema(),
    confirmPassword: getPasswordConfirmSchema(),
    email: getEmailSchema().nullable(),
    phone: getItlPhoneSchema().nullable(),
    birth_date: getStringDateSchema().nullable(),
    secret_question: addMinAndMaxNotEmpty(Yup.string(), 'secret_question', 0, 255),
    secret_question_answer: addMinAndMaxNotEmpty(Yup.string(), 'secret_question_answer', 2, 255),
    secret_question_custom_text: Yup.string().when('secret_question', ([value], schema: Yup.StringSchema) => {
      return value === 'Autre'
        ? schema.required(t.t('form_field_empty', { field: t.t('secret_question_answer') }))
        : schema.notRequired();
    }),
    centers: Yup.array(),
  });
