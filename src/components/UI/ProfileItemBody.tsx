import { FormikProps } from 'formik';
import { Center, HStack, View } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import { ProfileItemInterface } from './ProfileItem';
import ProfileItemForm from './ProfileItemForm';
import Text from './Text';

const styles = StyleSheet.create({
  label: { fontSize: 18, textAlign: 'center', color: colors.darkGray },
});

interface Props {
  item: ProfileItemInterface;
  formikBag: FormikProps<Record<UserField, string>>;
  showForm: boolean;
  isUpdating: boolean;
  userColor: string;
}

const ProfileItemBody: React.FC<Props> = ({ item, formikBag, showForm, userColor, isUpdating }) => {
  const { field, value } = item;
  const initialValues: Record<string, string> = {};
  initialValues[field] = !value ? '' : value;

  return (
    <HStack p='4' bg={colors.white}>
      <View style={{ flex: 1 }}>
        {isUpdating ? (
          <Center>
            <ActivityIndicator size='small' color={userColor} />
          </Center>
        ) : (
          <>
            {showForm ? (
              <ProfileItemForm item={item} formikBag={formikBag} />
            ) : (
              <Text style={styles.label}>{field === 'reponse_secrete' ? '*******' : value}</Text>
            )}
          </>
        )}
      </View>
    </HStack>
  );
};

export default ProfileItemBody;
