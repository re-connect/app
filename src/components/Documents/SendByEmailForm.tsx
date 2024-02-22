import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import emailShape from '../../helpers/forms/emailShape';
import { useSendDocumentByEmail } from '../../hooks/DocumentsHooks';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import Text from '../UI/Text';
import TextField from '../UI/TextField';
import Icon from '../UI/Icon';

interface Props {
  document: DocumentInterface;
  onSubmit: () => void;
  close: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  content: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 32,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuIconContainer: {
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 18,
    borderRadius: 10,
  },
  wrapperButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const SendByEmailForm: React.FC<Props> = ({ document, onSubmit, close }) => {
  const { isSending, triggerSendDocumentByEmail, isSent } = useSendDocumentByEmail(document);
  isSent && close();

  return (
    <View style={styles.container}>
      {isSending ? (
        <View style={styles.content}>
          <ActivityIndicator size='large' color={colors.primary} />
        </View>
      ) : (
        <Formik
          onSubmit={async values => {
            await triggerSendDocumentByEmail(values.email);
            onSubmit();
          }}
          initialValues={{ email: '' }}
          validationSchema={emailShape}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }: FormikProps<Record<'email', string>>) => {
            return (
              <View style={styles.wrapper}>
                <TextField
                  autocompleteType='email'
                  contentType='emailAddress'
                  error={errors.email}
                  fieldLabel='email'
                  handleBlur={handleBlur('email')}
                  handleChange={handleChange('email')}
                  iconName='at'
                  keyboardType='email-address'
                  okIcon
                  touched={touched.email}
                  value={values.email}
                />
                <View style={styles.wrapperButtons}>
                  <Pressable onPress={onSubmit}>
                    <View style={styles.menuIconContainer}>
                      <Icon style={styles.menuIcon} color={colors.darkGray} name='xmark' />
                    </View>
                    <Text>cancel</Text>
                  </Pressable>
                  <Pressable onPress={() => handleSubmit()}>
                    <View style={styles.menuIconContainer}>
                      <Icon style={styles.menuIcon} color={colors.blue} name='paper-plane' />
                    </View>
                    <Text>send</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        </Formik>
      )}
    </View>
  );
};

export default SendByEmailForm;
