import { Formik, FormikProps } from 'formik';
import { HStack, Pressable, View, VStack } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import emailShape from '../../helpers/forms/emailShape';
import { useSendDocumentByEmail } from '../../hooks/DocumentsHooks';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import Text from '../UI/Text';
import TextField from '../UI/TextField';

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
});

const SendByEmailForm: React.FC<Props> = ({ document, onSubmit, close }) => {
  const { isSending, triggerSendDocumentByEmail, isSent } = useSendDocumentByEmail(document);
  if (isSent.value) {
    close();
  }
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
              <VStack
                alignSelf='stretch'
                justifyContent='center'
                rounded='2xl'
                bg={colors.white}
                shadow={3}
                m='2'
                p='4'>
                <HStack>
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
                </HStack>
                <HStack justifyContent='space-between' px='2' mt='5'>
                  <Pressable onPress={onSubmit}>
                    <View style={styles.menuIconContainer}>
                      <Icon style={styles.menuIcon} color={colors.darkGray} name='times' />
                    </View>
                    <Text>cancel</Text>
                  </Pressable>
                  <Pressable onPress={() => handleSubmit()}>
                    <View style={styles.menuIconContainer}>
                      <Icon style={styles.menuIcon} color={colors.blue} name='paper-plane' solid />
                    </View>
                    <Text>send</Text>
                  </Pressable>
                </HStack>
              </VStack>
            );
          }}
        </Formik>
      )}
    </View>
  );
};

export default SendByEmailForm;
