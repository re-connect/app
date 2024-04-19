import * as Formik from 'formik';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import UserContext from '../../context/UserContext';
import userShape from '../../helpers/forms/userShape';
import { formatUserItemsForApi, getUserColor, isPro } from '../../helpers/userHelpers';
import { useUpdateUser } from '../../hooks/UserHooks';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import ProfileItemBody from './ProfileItemBody';
import ProfileItemHeader from './ProfileItemHeader';

export interface ProfileItemInterface {
  field: UserField;
  label: string;
  value: string;
  iconName: string;
  readOnly?: boolean;
  beneficiaryField?: boolean;
}

interface Props {
  item: ProfileItemInterface;
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
});

const ProfileItem: React.FC<Props> = ({ item }) => {
  const { field, value, beneficiaryField } = item;
  const { user } = React.useContext(UserContext);
  const userColor = getUserColor(user);
  const [showForm, showFormActions] = useBoolean(false);
  const { update, isUpdating } = useUpdateUser();
  const initialValues: Record<string, string> = { [field]: value ?? '' };

  if (isPro(user) && beneficiaryField) {
    return null;
  }

  const onSave = (values: Record<UserField, string>) => {
    update(formatUserItemsForApi(values));
    showFormActions.setFalse();
  };

  return (
    <Formik.Formik onSubmit={onSave} initialValues={initialValues} validationSchema={userShape}>
      {(formikBag: FormikProps<Record<UserField, string>>) => (
        <View style={styles.wrapper}>
          <ProfileItemHeader
            handleSubmit={formikBag.handleSubmit}
            item={item}
            showForm={showForm}
            showFormActions={showFormActions}
            userColor={userColor}
            isUpdating={isUpdating}
          />
          <ProfileItemBody
            item={item}
            showForm={showForm}
            formikBag={formikBag}
            userColor={userColor}
            isUpdating={isUpdating}
          />
        </View>
      )}
    </Formik.Formik>
  );
};

export default ProfileItem;
