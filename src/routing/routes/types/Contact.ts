import { NavigationProp, RouteProp } from '@react-navigation/native';

type ContactScreenParams = { contactId: number };
export type ContactScreenProps = {
  route: RouteProp<{ Contact: ContactScreenParams }, 'Contact'>;
  navigation: NavigationProp<any, any>;
};

type EditContactScreenParams = { contactId: number };
export type EditContactScreenProps = {
  route: RouteProp<{ EditContact: EditContactScreenParams }, 'EditContact'>;
};

export type ContactStackParamList = {
  ContactsList: {};
  CreateContact: {};
  Contact: ContactScreenParams;
  EditContact: EditContactScreenParams;
};
