import { FormikProps } from 'formik';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import { ProfileItemInterface } from './ProfileItem';
import ProfileItemForm from './ProfileItemForm';
import Text from './Text';

const styles = StyleSheet.create({
  label: { fontSize: 18, textAlign: 'center', color: colors.darkGray },
  wrapper: {
    padding: 15,
  },
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
    <View style={styles.wrapper}>
      {isUpdating ? (
        <ActivityIndicator size='small' color={userColor} />
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
  );
};

export default ProfileItemBody;
