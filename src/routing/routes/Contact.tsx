import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ContactScreen from '../../pages/contact/ContactScreen';
import ContactsScreen from '../../pages/contact/ContactsScreen';
import CreateContactScreen from '../../pages/contact/CreateContactScreen';
import EditContactScreen from '../../pages/contact/EditContactScreen';
import { getHeader } from '../helpers';
import { ContactStackParamList } from './types/Contact';

const ContactsStack = createStackNavigator<ContactStackParamList>();

const Contact = () => {
  const { t } = useTranslation();

  return (
    <ContactsStack.Navigator initialRouteName='ContactsList'>
      <ContactsStack.Screen name='ContactsList' component={ContactsScreen} options={getHeader(t('contacts'))} />
      <ContactsStack.Screen
        name="CreateContact"
        component={CreateContactScreen}
        options={getHeader(t('new_contact'))}
      />
      <ContactsStack.Screen name='Contact' component={ContactScreen} options={getHeader(t('contact'))} />
      <ContactsStack.Screen name='EditContact' component={EditContactScreen} options={getHeader(t('update_contact'))} />
    </ContactsStack.Navigator>
  );
};

export default Contact;
