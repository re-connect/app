import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import noteShape from '../../helpers/forms/noteShape';
import { colors } from '../../style';
import { CreateNoteData, NoteInterface } from '../../types/Note';
import RNSwitch from '../UI/RNSwitch';
import RoundedButton from '../UI/RoundedButton';
import Separator from '../UI/Separator';
import TextArea from '../UI/TextArea';
import TextField from '../UI/TextField';
import Icon from '../UI/Icon';

interface Props {
  note: CreateNoteData | NoteInterface;
  onSubmit: (note: CreateNoteData) => void;
  isSubmitting: boolean;
}

const NoteForm: React.FC<Props> = ({ note, onSubmit, isSubmitting }) => (
  <Formik initialValues={note} validationSchema={noteShape} onSubmit={onSubmit}>
    {({
      values,
      touched,
      errors,
      isValid,
      setFieldValue,
      handleBlur,
      handleChange,
      handleSubmit,
    }: FormikProps<CreateNoteData>) => (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
          <Icon style={{ fontSize: 20, marginRight: 8 }} name='share' color={colors.blue} />
          <RNSwitch value={values.b_prive} onPress={() => setFieldValue('b_prive', !values.b_prive)} />
          <Icon style={{ fontSize: 20, marginLeft: 8 }} name='lock' color={colors.red} />
        </View>
        <TextField
          error={errors.nom}
          touched={touched.nom}
          fieldLabel='name'
          handleChange={handleChange('nom')}
          handleBlur={handleBlur('nom')}
          iconName='tag'
          okIcon
          value={values.nom}
        />
        <Separator height={2} />
        <TextArea
          error={errors.contenu}
          touched={touched.contenu}
          fieldLabel='content'
          handleChange={handleChange('contenu')}
          handleBlur={handleBlur('contenu')}
          okIcon
          value={values.contenu}
        />
        <Separator height={2} />
        <RoundedButton
          isLoading={isSubmitting}
          disabled={!isValid}
          text={!note?.id ? 'create' : 'update'}
          onPress={() => handleSubmit()}
        />
      </KeyboardAwareScrollView>
    )}
  </Formik>
);

export default NoteForm;
