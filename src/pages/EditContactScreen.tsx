import { RouteProp } from '@react-navigation/native';
import { View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import ContactForm from '../components/Contacts/ContactForm';
import Screen from '../components/Screen';
import ContactContext from '../context/ContactContext';
import { useUpdateData } from '../hooks/DataHooks';
import { ContactInterface, CreateContactData } from '../types/Contact';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  actions: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  form: {
    paddingHorizontal: 32,
    flex: 1,
    alignSelf: 'stretch',
  },
});

type CreateContactScreenParams = {
  Contact: { contactId: number };
};
type Props = {
  route: RouteProp<CreateContactScreenParams, 'Contact'>;
};

const EditContactScreen: React.FC<Props> = ({ route }) => {
  const { contactId } = route.params;
  const { list } = React.useContext(ContactContext);
  const { isUpdating, update } = useUpdateData(`contacts/${contactId}`, contactId, ContactContext);
  const contact = list.find((contact: ContactInterface) => contact.id === contactId);

  if (!contact) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <ContactForm
          contact={contact}
          isSubmitting={isUpdating}
          onSubmit={(newContact: CreateContactData) => update({ ...contact, ...newContact })}
        />
      </View>
    </Screen>
  );
};

export default EditContactScreen;
