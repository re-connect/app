import { NavigationProp } from '@react-navigation/native';
import { format } from 'date-fns';
import { View } from 'native-base';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Screen from '../components/Screen';
import ProfileItem from '../components/UI/ProfileItem';
import RoundedButton from '../components/UI/RoundedButton';
import Separator from '../components/UI/Separator';
import BeneficiaryContext from '../context/BeneficiaryContext';
import UserContext from '../context/UserContext';
import { useDeleteBeneficiary } from '../hooks/BeneficiariesHooks';
import { colors } from '../style';
import { UserField } from '../types/Users';

interface ItemInterface {
  field: UserField;
  label: string;
  value: string;
  iconName: string;
  readOnly?: boolean;
  beneficiaryField?: boolean;
}

interface Props {
  navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  const { current } = React.useContext(BeneficiaryContext);
  const { isDeleting, triggerDeleteBeneficiary } = useDeleteBeneficiary();
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';
  if (!user) return null;

  const { nom, prenom, email, username, telephone, date_naissance, reponse_secrete, question_secrete } = user;

  const items: ItemInterface[] = [
    { field: 'username', value: username, label: 'username', iconName: 'user', readOnly: true },
    { field: 'nom', value: nom, label: 'last_name', iconName: 'users' },
    { field: 'prenom', value: prenom, label: 'first_name', iconName: 'user' },
    { field: 'email', value: email, label: 'email', iconName: 'at' },
    { field: 'telephone', value: telephone, label: 'phone', iconName: 'phone' },
    {
      field: 'question_secrete',
      value: !question_secrete ? '' : question_secrete,
      label: 'secret_question',
      iconName: 'question',
      beneficiaryField: true,
      readOnly: true,
    },
    {
      field: 'reponse_secrete',
      value: !reponse_secrete ? '' : reponse_secrete,
      label: 'secret_answer',
      iconName: 'question',
      beneficiaryField: true,
    },
    {
      field: 'date_naissance',
      value: !date_naissance ? '' : format(new Date(date_naissance), 'dd/MM/yyyy'),
      label: 'birth_date',
      iconName: 'birthday-cake',
      beneficiaryField: true,
    },
  ];

  return (
    <Screen>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        {items.map((item: ItemInterface) => (
          <ProfileItem
            field={item.field}
            key={item.field}
            label={item.label}
            value={item.value}
            iconName={item.iconName}
            readOnly={!!item.readOnly}
            beneficiaryField={item.beneficiaryField}
          />
        ))}
        {isMember ? null : (
          <View style={{ marginHorizontal: 32 }}>
            <RoundedButton text='new_password' onPress={() => navigation.navigate('ResetPassword')} />
            <Separator height={10} />
            {!current || !current.subject_id ? null : (
              <RoundedButton
                isLoading={isDeleting}
                color={colors.red}
                text='delete_my_account'
                onPress={() => {
                  triggerDeleteBeneficiary(current.subject_id);
                }}
              />
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ProfileScreen;
