import * as Formik from 'formik'
import { HStack, Pressable, VStack } from 'native-base'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import renameShape from '../../../helpers/forms/renameShape'
import { colors } from '../../../style'
import { DocumentInterface } from '../../../types/Documents'
import Text from '../../UI/Text'
import TextField from '../../UI/TextField'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
})

interface Props {
  document: DocumentInterface
  closeModal: () => void
  close: () => void
  onSubmit: (name: string) => void
}

const Rename: React.FC<Props> = ({ document, close, closeModal, onSubmit }) => (
  <TouchableOpacity style={styles.container} activeOpacity={1} onPress={closeModal}>
    <Formik.Formik
      onSubmit={(values: Record<'name', string>) => {
        onSubmit(values.name)
        close()
      }}
      initialValues={{ name: document.nom.split('.')[0] }}
      validationSchema={renameShape}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }: Formik.FormikProps<Record<'name', string>>) => {
        return (
          <VStack alignSelf='stretch' justifyContent='center' rounded='2xl' bg={colors.white} shadow={3} m='2' p='4'>
            <HStack>
              <TextField
                fieldLabel='new_name'
                handleChange={handleChange('name')}
                handleBlur={handleBlur('name')}
                iconName='user'
                iconSyle={{ color: colors.darkGray }}
                style={{ color: colors.darkGray }}
                touched={touched.name}
                error={errors.name}
                value={values.name}
              />
            </HStack>
            <HStack justifyContent='space-between' px='2' mt='5'>
              <Pressable onPress={close}>
                <View style={styles.menuIconContainer}>
                  <Icon style={styles.menuIcon} color={colors.darkGray} name='times' />
                </View>
                <Text>cancel</Text>
              </Pressable>
              <Pressable onPress={() => handleSubmit()}>
                <View style={styles.menuIconContainer}>
                  <Icon style={styles.menuIcon} color={colors.green} name='check' />
                </View>
                <Text>validate</Text>
              </Pressable>
            </HStack>
          </VStack>
        )
      }}
    </Formik.Formik>
  </TouchableOpacity>
)

export default Rename
