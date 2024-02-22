import { FormikProps } from 'formik';
import * as React from 'react';
import TextArea from './TextArea';
import TextField, { TextFieldProps } from './TextField';
import Separator from './Separator';

export interface Props {
  formikBag: FormikProps<any>;
  icon: string;
  name: string;
  label: string;
  isTextArea?: boolean;
  contentType?: string;
}

const FormikTextField: React.FC<Props & TextFieldProps> = props => {
  if (props.isTextArea) {
    return (
      <>
        <TextArea
          error={props.formikBag.errors[props.name]}
          touched={props.formikBag.touched[props.name]}
          fieldLabel={props.label}
          handleChange={props.formikBag.handleChange(props.name)}
          handleBlur={props.formikBag.handleBlur(props.name)}
          okIcon
          value={props.formikBag.values[props.name]}
          {...props}
        />
        <Separator height={2} />
      </>
    );
  }

  return (
    <>
      <TextField
        contentType={props.contentType ?? 'none'}
        error={props.formikBag.errors[props.name]}
        touched={props.formikBag.touched[props.name]}
        fieldLabel={props.label}
        handleChange={props.formikBag.handleChange(props.name)}
        handleBlur={props.formikBag.handleBlur(props.name)}
        iconName={props.icon}
        okIcon
        value={props.formikBag.values[props.name]}
        {...props}
      />
      <Separator height={2} />
    </>
  );
};

export default FormikTextField;
