import { FormikProps } from 'formik';
import * as React from 'react';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import SecretQuestionPicker from '../Beneficiaries/SecretQuestionPicker';
import PhoneInputField from './PhoneInputField';
import { ProfileItemInterface } from './ProfileItem';
import TextField from './TextField';

interface Props {
  item: ProfileItemInterface;
  formikBag: FormikProps<Record<UserField, string>>;
}

const ProfileItemForm: React.FC<Props> = ({ item: { field, iconName, label }, formikBag }) => {
  const error = formikBag.errors[field];
  const touched = formikBag.touched[field];
  const value = formikBag.values[field];
  const handleBlur = formikBag.handleBlur(field);
  const handleChange = formikBag.handleChange(field);

  if (field === 'question_secrete') {
    return <SecretQuestionPicker fieldName='question_secrete' />;
  }

  if (field === 'telephone') {
    return (
      <PhoneInputField
        error={error}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        okIcon
        value={value}
      />
    );
  }

  return (
    <TextField
      error={error}
      touched={touched}
      fieldLabel={label ?? ''}
      handleChange={handleChange}
      handleBlur={handleBlur}
      iconName={iconName ?? 'question'}
      okIcon
      iconSyle={{ color: colors.darkGray }}
      value={value}
    />
  );
};

export default ProfileItemForm;
