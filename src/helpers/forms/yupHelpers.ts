import { differenceInMinutes, parse } from 'date-fns';
import { isValid } from 'date-fns/esm';
import * as Yup from 'yup';
import t from '../../services/translation';

const addMin = (schema: Yup.StringSchema, field: string, min: number): Yup.StringSchema => {
  return schema.min(min, t.t('form_field_min_length', { length: min, field: t.t(field) }));
};
const addMax = (schema: Yup.StringSchema, field: string, max: number): Yup.StringSchema => {
  return schema.max(max, t.t('form_field_max_length', { length: max, field: t.t(field) }));
};

export const addNonEmpty = <T extends Yup.StringSchema | Yup.DateSchema>(schema: T, field: string): T => {
  return schema.required(t.t('form_field_empty', { field: t.t(field) })) as T;
};

export const addOnlyLetters = (schema: Yup.StringSchema): Yup.StringSchema => {
  return schema.matches(/^[a-zA-Z- ]+$/, t.t('form_field_only_letters'));
};

export const addMinAndMax = (schema: Yup.StringSchema, field: string, min: number, max: number): Yup.StringSchema => {
  return addMax(addMin(schema, field, min), field, max);
};

export const addMinAndMaxNotEmpty = (
  schema: Yup.StringSchema,
  field: string,
  min: number,
  max: number,
): Yup.StringSchema => {
  return addNonEmpty(addMinAndMax(schema, field, min, max), field);
};

export const getPasswordShema = (): Yup.StringSchema<string | null | undefined> =>
  addMinAndMaxNotEmpty(
    Yup.string()
      .matches(/.*[A-Z].*/, ' ')
      .matches(/.*[a-z].*/, ' ')
      .matches(/.*[^A-Za-z].*/, ' '),
    'password',
    9,
    255,
  );

export const getEmailSchema = (): Yup.StringSchema<string | null | undefined> => {
  return Yup.string()
    .email(t.t('form_field_invalid', { field: t.t('email') }))
    .max(254, t.t('form_field_max_length', { length: '255', field: t.t('email') }));
};

export const getPhoneSchema = (): Yup.StringSchema => {
  return Yup.string()
    .min(9, t.t('form_field_invalid_french_phone'))
    .max(9, t.t('form_field_invalid_french_phone'))
    .matches(/^[0-9]+$/, t.t('form_field_invalid_french_phone'));
};

export const getItlPhoneSchema = (): Yup.StringSchema => {
  return Yup.string()
    .min(8, t.t('form_field_invalid_phone'))
    .max(15, t.t('form_field_invalid_phone'))
    .matches(/^\+[0-9]+$/, t.t('form_field_invalid_phone'));
};

export const getGenericPhoneSchema = (): Yup.StringSchema<string | null | undefined> => {
  return Yup.string()
    .min(9, t.t('form_field_invalid_phone'))
    .max(12, t.t('form_field_invalid_phone'))
    .matches(
      // eslint-disable-next-line max-len, no-useless-escape
      /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
      t.t('form_field_invalid_phone'),
    );
};

export const getStringFutureDateTimeSchema = (): Yup.StringSchema => {
  return Yup.string()
    .min(12, t.t('form_field_datetime_invalid'))
    .max(12, t.t('form_field_datetime_invalid'))
    .test('is-valid', t.t('form_field_datetime_invalid'), value => {
      if (!value) {
        return false;
      }
      const date = parse(value, 'ddMMyyyyHHmm', new Date());
      return isValid(date);
    })
    .test('is-posterior', t.t('form_field_date_must_be_future'), value => {
      if (!value) {
        return false;
      }
      const now = new Date();
      const date = parse(value, 'ddMMyyyyHHmm', new Date());
      return differenceInMinutes(date, now) > 5;
    })
    .required();
};

export const getStringDateSchema = (): Yup.DateSchema => {
  return Yup.date()
    .transform((_date, string: string) => {
      return parse(string, 'dd/MM/yyyy', new Date());
    })
    .typeError(t.t('form_field_date_invalid'));
};

export const getPasswordConfirmSchema = (): Yup.StringSchema<string | null | undefined> => {
  return Yup.string()
    .required(t.t('form_field_confirm_password'))
    .oneOf([Yup.ref('password')], t.t('form_field_confirm_dont_match'));
};
