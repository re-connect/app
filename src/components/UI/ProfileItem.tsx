import * as Formik from 'formik';
import { FormikProps } from 'formik';
import { Box, VStack } from 'native-base';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import UserContext from '../../context/UserContext';
import userShape from '../../helpers/forms/userShape';
import { formatPhoneForApi } from '../../helpers/userHelpers';
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

const ProfileItem: React.FC<Props> = ({ item }) => {
  const { field, value, beneficiaryField } = item;
  const { user } = React.useContext(UserContext);
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';
  const userColor = isMember ? colors.blue : colors.primary;
  const [showForm, showFormActions] = useBoolean(false);
  const { update, isUpdating } = useUpdateUser();
  const initialValues: Record<string, string> = { [field]: value ?? '' };

  if (isMember && beneficiaryField) return null;

  const onSave = (values: Record<UserField, string>) => {
    if (values.telephone) {
      values.telephone = formatPhoneForApi(values.telephone);
    }
    update(values);
    showFormActions.setFalse();
  };

  return (
    <Box>
      <Formik.Formik onSubmit={onSave} initialValues={initialValues} validationSchema={userShape}>
        {(formikBag: FormikProps<Record<UserField, string>>) => (
          <VStack justifyContent='center' rounded='md' bg={colors.white} shadow={3} mb='2'>
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
          </VStack>
        )}
      </Formik.Formik>
    </Box>
  );
};

export default ProfileItem;
