import { NavigationProp } from '@react-navigation/native';
import { format } from 'date-fns';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Screen from '../../components/Screen';
import ProfileItem, { ProfileItemInterface } from '../../components/UI/ProfileItem';
import RoundedButton from '../../components/UI/RoundedButton';
import Separator from '../../components/UI/Separator';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import UserContext from '../../context/UserContext';
import { useDeleteBeneficiary, useRequestDataForBeneficiary } from '../../hooks/BeneficiariesHooks';
import { colors } from '../../style';
import { View } from 'react-native';
import { isPro } from '../../helpers/userHelpers';

interface Props {
  navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = React.useContext(UserContext);
  const { current } = React.useContext(BeneficiaryContext);
  const { isDeleting, triggerDeleteBeneficiary } = useDeleteBeneficiary();
  const { isGetingData, triggerRequestDataBeneficiary } = useRequestDataForBeneficiary();
  if (!user) {
    return null;
  }
  const isMember = isPro(user);

  const { nom, prenom, email, username, telephone, date_naissance, reponse_secrete, question_secrete } = user;

  const items: ProfileItemInterface[] = [
    { field: 'username', value: username, label: 'username', iconName: 'user-large', readOnly: true },
    { field: 'nom', value: nom, label: 'last_name', iconName: 'users' },
    { field: 'prenom', value: prenom, label: 'first_name', iconName: 'user-large' },
    { field: 'email', value: email, label: 'email', iconName: 'at' },
    { field: 'telephone', value: telephone, label: 'phone', iconName: 'phone' },
    {
      field: 'question_secrete',
      value: question_secrete ?? '',
      label: 'secret_question',
      iconName: 'question',
      beneficiaryField: true,
    },
    {
      field: 'reponse_secrete',
      value: reponse_secrete ?? '',
      label: 'secret_answer',
      iconName: 'circle-question',
      beneficiaryField: true,
    },
    {
      field: 'date_naissance',
      value: !date_naissance ? '' : format(new Date(date_naissance), 'dd/MM/yyyy'),
      label: 'birth_date',
      iconName: 'cake-candles',
      beneficiaryField: true,
    },
  ];

  return (
    <Screen>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        {items.map((item: ProfileItemInterface, key: number) => (
          <ProfileItem item={item} key={key} />
        ))}
        <View style={{ marginHorizontal: 32, marginTop: 15 }}>
          <RoundedButton text='new_password' onPress={() => navigation.navigate('ResetPassword')} />
          <Separator height={2} />
          {!current || !current.subject_id || isMember ? null : (
            <RoundedButton
              isLoading={isDeleting}
              color={colors.red}
              text='delete_my_account'
              onPress={() => {
                triggerDeleteBeneficiary(current.subject_id);
              }}
            />
          )}
          <Separator height={2} />
          {!current || !current.subject_id || isMember ? null : (
            <RoundedButton
              isLoading={isGetingData}
              color={colors.darkGrayTransparent}
              text='get_my_data'
              onPress={() => {
                triggerRequestDataBeneficiary(current.subject_id);
              }}
            />
          )}
          <Separator height={4} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ProfileScreen;
