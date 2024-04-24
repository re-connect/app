import * as Formik from 'formik';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import renameShape from '../../../helpers/forms/renameShape';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import Text from '../../UI/Text';
import TextField from '../../UI/TextField';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  wrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '95%',
    zIndex: 50,
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
  buttonsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: '2.5%',
  },
});

interface Props {
  document: DocumentInterface;
  closeModal: () => void;
  close: () => void;
  onSubmit: (name: string) => void;
}

const Rename: React.FC<Props> = ({ document, close, closeModal, onSubmit }) => (
  <TouchableOpacity style={styles.container} activeOpacity={1} onPress={closeModal}>
    <Formik.Formik
      onSubmit={(values: Record<'name', string>) => {
        onSubmit(values.name);
        close();
      }}
      initialValues={{ name: document.nom.split('.')[0] }}
      validationSchema={renameShape}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }: Formik.FormikProps<Record<'name', string>>) => {
        return (
          <View style={styles.wrapper}>
            <TextField
              fieldLabel='new_name'
              handleChange={handleChange('name')}
              handleBlur={handleBlur('name')}
              iconName='user-large'
              iconSyle={{ color: colors.darkGray }}
              style={{ color: colors.darkGray }}
              touched={touched.name}
              error={errors.name}
              value={values.name}
            />
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={close}>
                <View style={styles.menuIconContainer}>
                  <Icon style={styles.menuIcon} color={colors.darkGray} name='xmark' />
                </View>
                <Text>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View style={styles.menuIconContainer}>
                  <Icon style={styles.menuIcon} color={colors.green} name='check' />
                </View>
                <Text>validate</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </Formik.Formik>
  </TouchableOpacity>
);

export default Rename;
