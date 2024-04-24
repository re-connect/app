import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactForm from '../../components/Contacts/ContactForm';
import Screen from '../../components/Screen';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import ContactContext from '../../context/ContactContext';
import UserContext from '../../context/UserContext';
import { usePostData } from '../../hooks/DataHooks';
import { CreateContactData } from '../../types/Contact';
import { isBeneficiary } from '../../helpers/userHelpers';

const styles = StyleSheet.create({
  container: { paddingBottom: 16, justifyContent: 'flex-start', alignItems: 'stretch' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
});

const CreateContactScreen: React.FC = () => {
  const { current } = React.useContext(BeneficiaryContext);
  const { user } = React.useContext(UserContext);
  const { isPosting, post } = usePostData(`beneficiaries/${current?.subject_id}/contacts`, ContactContext);

  const contact: CreateContactData = {
    association: '',
    b_prive: isBeneficiary(user),
    commentaire: '',
    email: '',
    nom: '',
    prenom: '',
    telephone: '',
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ContactForm
          contact={contact}
          isSubmitting={isPosting}
          onSubmit={(contact: CreateContactData) => post(contact)}
        />
      </View>
    </Screen>
  );
};

export default CreateContactScreen;
