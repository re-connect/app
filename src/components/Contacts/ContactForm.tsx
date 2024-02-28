import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import contactShape from '../../helpers/forms/contactShape';
import { colors } from '../../style';
import { ContactInterface, CreateContactData } from '../../types/Contact';
import RNSwitch from '../UI/RNSwitch';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import TextArea from '../UI/TextArea';
import TextField from '../UI/TextField';
import Icon from '../UI/Icon';

interface Props {
  contact: ContactInterface | CreateContactData;
  onSubmit: (contact: CreateContactData) => void;
  isSubmitting: boolean;
}

const ContactForm: React.FC<Props> = ({ contact, onSubmit, isSubmitting }) => (
  <Formik initialValues={contact} validationSchema={contactShape} onSubmit={onSubmit}>
    {({
      errors,
      isValid,
      touched,
      handleBlur,
      handleChange,
      values,
      handleSubmit,
      setFieldValue,
    }: FormikProps<CreateContactData>) => {
      return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
            <Icon style={{ fontSize: 20, marginRight: 8 }} name='share' color={colors.blue} />
            <RNSwitch value={values.b_prive} onPress={() => setFieldValue('b_prive', !values.b_prive)} />
            <Icon style={{ fontSize: 20, marginLeft: 8 }} name='lock' color={colors.red} />
          </View>
          <TextField
            error={errors.prenom}
            touched={touched.prenom}
            fieldLabel='first_name'
            handleChange={handleChange('prenom')}
            handleBlur={handleBlur('prenom')}
            iconName='user-large'
            okIcon
            value={values.prenom}
          />
          <Separator height={2} />
          <TextField
            error={errors.nom}
            touched={touched.nom}
            fieldLabel='last_name'
            handleChange={handleChange('nom')}
            handleBlur={handleBlur('nom')}
            iconName='user-friends'
            value={values.nom}
            okIcon
          />
          <Separator height={2} />
          <TextField
            error={errors.email}
            touched={touched.email}
            fieldLabel='email'
            autocompleteType='email'
            contentType='emailAddress'
            keyboardType='email-address'
            handleChange={handleChange('email')}
            handleBlur={handleBlur('email')}
            iconName='at'
            okIcon
            value={values.email}
          />
          <Separator height={2} />
          <View>
            <TextField
              error={errors.telephone}
              touched={touched.telephone}
              fieldLabel='phone'
              autocompleteType='tel'
              contentType='telephoneNumber'
              keyboardType='phone-pad'
              handleChange={handleChange('telephone')}
              handleBlur={handleBlur('telephone')}
              iconName='phone'
              okIcon
              value={values.telephone}
            />
          </View>
          <Separator height={2} />
          <TextField
            error={errors.association}
            touched={touched.association}
            fieldLabel='association'
            handleChange={handleChange('association')}
            handleBlur={handleBlur('association')}
            iconName='hotel'
            okIcon
            value={values.association}
          />
          <Separator height={2} />
          <TextArea
            error={errors.commentaire}
            touched={touched.commentaire}
            fieldLabel='comment'
            handleChange={handleChange('commentaire')}
            handleBlur={handleBlur('commentaire')}
            okIcon
            value={values.commentaire}
          />
          <Separator height={2} />
          <RoundedButton
            isLoading={isSubmitting}
            disabled={!isValid}
            text={!contact.id ? 'create' : 'update'}
            onPress={() => handleSubmit()}
          />
        </KeyboardAwareScrollView>
      );
    }}
  </Formik>
);

export default ContactForm;
