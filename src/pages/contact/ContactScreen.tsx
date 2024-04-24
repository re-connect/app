import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import Text from '../../components/UI/Text';
import TogglePrivacySwitch from '../../components/UI/TogglePrivacySwitch';
import ContactContext from '../../context/ContactContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import { ContactInterface } from '../../types/Contact';
import Section from '../../components/UI/Section';
import { ContactScreenProps } from '../../routing/routes/types/Contact';
import Icon from '../../components/UI/Icon';

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' },
  actions: { flexDirection: 'row', alignSelf: 'stretch' },
  form: { paddingHorizontal: 32, flex: 1, alignSelf: 'stretch' },
  icon: { fontSize: 20, marginLeft: 8, marginRight: 16 },
});

const FieldContent: React.FC<{ value: string; icon: string }> = ({ value, icon }) => (
  <>
    <Icon style={styles.icon} name={icon} color={colors.gray} />
    <Text>{value}</Text>
  </>
);

const Field: React.FC<{ value?: string; action?: () => void; icon: string }> = ({ value, action, icon }) => {
  if (!value) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
      {!action ? (
        <FieldContent value={value} icon={icon} />
      ) : (
        <TouchableOpacity style={styles.actions} onPress={action}>
          <FieldContent value={value} icon={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const ContactScreen: React.FC<ContactScreenProps> = ({ route, navigation }) => {
  const { list } = React.useContext(ContactContext);
  const { contactId } = route.params;
  const { isDeleting, deleteItem } = useDeleteData(ContactContext, `contacts/${contactId}`, contactId);
  if (!list) {
    return null;
  }
  const contact = list.find((contact: ContactInterface) => contact.id === contactId);
  if (!contact) {
    return null;
  }

  const openEmail = () => {
    if (contact && contact.email) {
      Linking.canOpenURL(contact.email).then(() => Linking.openURL(`mailto: ${contact.email}`));
    }
  };
  const openPhone = () => {
    if (contact && contact.telephone) {
      Linking.canOpenURL(`tel:${contact.telephone}`).then(() => Linking.openURL(`tel:${contact.telephone}`));
    }
  };

  const fields = [
    { value: contact.email, action: openEmail, icon: 'at' },
    { value: contact.telephone, action: openPhone, icon: 'phone' },
    { value: contact.association, icon: 'hotel' },
    { value: contact.commentaire, icon: 'comment-alt' },
  ];

  return (
    <Screen>
      <Section>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TogglePrivacySwitch
            Context={ContactContext}
            isPrivate={contact.b_prive}
            itemId={contactId}
            endpoint={`contacts/${contactId}`}
          />
        </View>
        <View style={{ marginVertical: 8 }}>
          <Text style={styles.title}>{`${contact?.prenom} ${contact?.nom}`}</Text>
        </View>
        {fields.map(({ value, action, icon }) => (
          <Field value={value} action={action} icon={icon} key={value} />
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity onPress={() => navigation.navigate('EditContact', { contactId: contact.id })}>
            <Icon style={styles.icon} name='pen' color={colors.darkGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(true)} disabled={isDeleting}>
            {isDeleting ? (
              <ActivityIndicator size='small' color={colors.primary} />
            ) : (
              <Icon style={styles.icon} name='trash' color={colors.red} />
            )}
          </TouchableOpacity>
        </View>
      </Section>
    </Screen>
  );
};

export default ContactScreen;
