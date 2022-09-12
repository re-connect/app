import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import Button from './components/UI/Button';
import AuthLoadingScreen from './pages/AuthLoadingScreen';
import BeneficiariesScreen from './pages/BeneficiariesScreen';
import CentersScreen from './pages/CentersScreen';
import ChatScreen from './pages/ChatScreen';
import ContactScreen from './pages/ContactScreen';
import ContactsScreen from './pages/ContactsScreen';
import CreateBeneficiaryScreen from './pages/CreateBeneficiaryScreen';
import CreateContactScreen from './pages/CreateContactScreen';
import CreateEventScreen from './pages/CreateEventScreen';
import CreateNoteScreen from './pages/CreateNoteScreen';
import DocumentScreen from './pages/DocumentScreen';
import DocumentsScreen from './pages/DocumentsScreen';
import EditContactScreen from './pages/EditContactScreen';
import EditEventScreen from './pages/EditEventScreen';
import EditNoteScreen from './pages/EditNoteScreen';
import EnableBeneficiaryScreen from './pages/EnableBeneficiaryScreen';
import EventScreen from './pages/EventScreen';
import EventsScreen from './pages/EventsScreen';
import FolderScreen from './pages/FolderScreen';
import LegalNoticesScreen from './pages/LegalNoticesScreen';
import LoginScreen from './pages/LoginScreen';
import NoteScreen from './pages/NoteScreen';
import NotesScreen from './pages/NotesScreen';
import PitchesScreen from './pages/PitchesScreen';
import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
import ProfileScreen from './pages/ProfileScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import SettingsScreen from './pages/SettingsScreen';
import TermsOfUseScreen from './pages/TermsOfUseScreen';
import { navigationRef } from './RootNavigation';
import { getTabStackIcon } from './services/navigation';
import { colors } from './style';
import { UserInterface } from './types/Users';

let activeTheme = false;

const SettingsButton = ({ navigation }: { navigation: NavigationProp<any, any> }) => (
  <Button
    onPress={() => navigation.navigate('Settings')}
    iconColor="white"
    text=""
    iconName="user-alt"
    backgroundColor="transparent"
  />
);

const getBeneficiaryHeader =
  (title: string) =>
  ({ navigation }: { navigation: NavigationProp<any, any> }) => ({
    title,
    headerStyle: {
      backgroundColor: colors.green,
    },
    headerTintColor: colors.white,
    headerRight: 'Support' === title ? undefined : () => <SettingsButton navigation={navigation} />,
  });

const getMemberHeader =
  (title: string) =>
  ({ navigation }: { navigation: NavigationProp<any, any> }) => ({
    title,
    headerStyle: {
      backgroundColor: colors.blue,
    },
    headerTintColor: colors.white,
    headerRight: 'Support' === title ? undefined : () => <SettingsButton navigation={navigation} />,
  });

let getHeader = getBeneficiaryHeader;

const TabBarButton = (props: any) => <TouchableOpacity {...props} />;
const getTabScreenOptions =
  (t: any) =>
  ({ route }: { route: RouteProp<ParamListBase, string> }) => ({
    tabBarIcon: getTabStackIcon(route),
    tabBarButton: TabBarButton,
    tabBarLabel: t(route.name.toLowerCase()),
    tabBarActiveTintColor: activeTheme ? colors.primaryPro : colors.primary,
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {
      backgroundColor: 'white',
    },
  });

const SettingsStack = createStackNavigator();
const DocumentsStack = createStackNavigator();
const ContactsStack = createStackNavigator();
const NotesStack = createStackNavigator();
const EventsStack = createStackNavigator();
const AuthLoadingStack = createStackNavigator();
const ChatStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MemberBeneficiariesStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const ActivationTab = createBottomTabNavigator();
const ActivationStack = createStackNavigator();
const Root = createStackNavigator();

const Settings = () => {
  const { t } = useTranslation();

  return (
    <SettingsStack.Navigator initialRouteName="SettingsIndex">
      <SettingsStack.Screen name="SettingsIndex" component={SettingsScreen} options={getHeader(t('settings'))} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} options={getHeader(t('profil'))} />
      <SettingsStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={getHeader(t('new_password'))}
      />
      <SettingsStack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={getHeader(t('terms_of_use'))} />
      <SettingsStack.Screen name="LegalNotices" component={LegalNoticesScreen} options={getHeader(t('legal_notice'))} />
      <SettingsStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={getHeader(t('privacy_policy'))}
      />
      <SettingsStack.Screen name="Pitches" component={PitchesScreen} options={getHeader(t('pitches'))} />
      <SettingsStack.Screen name="Centers" component={CentersScreen} options={getHeader(t('centers'))} />
      <SettingsStack.Screen name="Chat" component={ChatScreen} options={getHeader(t('support'))} />
    </SettingsStack.Navigator>
  );
};

const Documents = () => {
  const { t } = useTranslation();

  return (
    <DocumentsStack.Navigator initialRouteName="DocumentsList">
      <DocumentsStack.Screen name="DocumentsList" component={DocumentsScreen} options={getHeader(t('documents'))} />
      <DocumentsStack.Screen name="Folder" component={FolderScreen} options={getHeader(t('folders'))} />
      <DocumentsStack.Screen name="Document" component={DocumentScreen} options={getHeader(t('documents'))} />
    </DocumentsStack.Navigator>
  );
};

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <ContactsStack.Navigator initialRouteName="ContactsList">
      <ContactsStack.Screen name="ContactsList" component={ContactsScreen} options={getHeader(t('contacts'))} />
      <ContactsStack.Screen
        name="CreateContact"
        component={CreateContactScreen}
        options={getHeader(t('new_contact'))}
      />
      <ContactsStack.Screen name="Contact" component={ContactScreen} options={getHeader(t('contact'))} />
      <ContactsStack.Screen name="EditContact" component={EditContactScreen} options={getHeader(t('update_contact'))} />
    </ContactsStack.Navigator>
  );
};

const Notes = () => {
  const { t } = useTranslation();

  return (
    <NotesStack.Navigator initialRouteName="NotesList">
      <NotesStack.Screen name="NotesList" component={NotesScreen} options={getHeader(t('notes'))} />
      <NotesStack.Screen name="CreateNote" component={CreateNoteScreen} options={getHeader(t('new_note'))} />
      <NotesStack.Screen name="Note" component={NoteScreen} options={getHeader(t('note'))} />
      <NotesStack.Screen name="EditNote" component={EditNoteScreen} options={getHeader(t('update_note'))} />
    </NotesStack.Navigator>
  );
};

const Events = () => {
  const { t } = useTranslation();

  return (
    <EventsStack.Navigator initialRouteName="EventsList">
      <EventsStack.Screen name="EventsList" component={EventsScreen} options={getHeader(t('events'))} />
      <EventsStack.Screen name="CreateEvent" component={CreateEventScreen} options={getHeader(t('new_event'))} />
      <EventsStack.Screen name="Event" component={EventScreen} options={getHeader(t('event'))} />
      <EventsStack.Screen name="EditEvent" component={EditEventScreen} options={getHeader(t('update_event'))} />
    </EventsStack.Navigator>
  );
};

const AuthLoading = () => {
  const { t } = useTranslation();

  return (
    <AuthLoadingStack.Navigator initialRouteName="AuthLoading">
      <AuthLoadingStack.Screen name="AuthLoading" component={AuthLoadingScreen} options={getHeader(t('loading'))} />
    </AuthLoadingStack.Navigator>
  );
};

const Chat = () => (
  <ChatStack.Navigator initialRouteName="ChatIndex">
    <ChatStack.Screen name="ChatIndex" component={ChatScreen} options={{ headerShown: false }} />
  </ChatStack.Navigator>
);

const Auth = () => {
  const { t } = useTranslation();

  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Chat" component={ChatScreen} options={getHeader(t('loading'))} />
    </AuthStack.Navigator>
  );
};

const BeneficiaryHome = () => {
  const { t } = useTranslation();

  return (
    <HomeTab.Navigator screenOptions={getTabScreenOptions(t)}>
      <HomeTab.Screen name="Documents" component={Documents} options={{ headerShown: false }} />
      <HomeTab.Screen name="Events" component={Events} options={{ headerShown: false }} />
      <HomeTab.Screen name="Contacts" component={Contacts} options={{ headerShown: false }} />
      <HomeTab.Screen name="Notes" component={Notes} options={{ headerShown: false }} />
      <HomeTab.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
    </HomeTab.Navigator>
  );
};

const MemberHome = () => {
  const { t } = useTranslation();

  return (
    <MemberBeneficiariesStack.Navigator initialRouteName="Beneficiaries">
      <MemberBeneficiariesStack.Screen
        name="Beneficiaries"
        component={BeneficiariesScreen}
        options={getHeader(t('beneficiaries'))}
      />
      <MemberBeneficiariesStack.Screen
        name="Beneficiary"
        component={BeneficiaryHome}
        options={{ headerShown: false }}
      />
      <MemberBeneficiariesStack.Screen
        name="CreateBeneficiary"
        component={CreateBeneficiaryScreen}
        options={getHeader(t('create_beneficiary'))}
      />
    </MemberBeneficiariesStack.Navigator>
  );
};

const ActivationScreen = () => (
  <ActivationStack.Navigator>
    <ActivationStack.Screen
      name="EnableBeneficiary"
      component={EnableBeneficiaryScreen}
      options={{ headerShown: false }}
    />
  </ActivationStack.Navigator>
);

const Activation = () => {
  const { t } = useTranslation();

  return (
    <ActivationTab.Navigator initialRouteName="EnableBeneficiary" screenOptions={getTabScreenOptions(t)}>
      <ActivationTab.Screen name="Enabling" component={ActivationScreen} options={getHeader(t('enabling'))} />
      <ActivationTab.Screen name="Support" component={Chat} options={getHeader(t('support'))} />
    </ActivationTab.Navigator>
  );
};

const AppContainer = ({ user }: { user: UserInterface }) => {
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';
  activeTheme = isMember;

  if (isMember) {
    getHeader = getMemberHeader;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator initialRouteName="AuthLoadingRoot" screenOptions={{ headerShown: false }}>
        <Root.Screen name="AuthLoadingRoot" component={AuthLoading} />
        <Root.Screen name="Auth" component={Auth} />
        <Root.Screen name="Home" component={isMember ? MemberHome : BeneficiaryHome} />
        <Root.Screen name="Activation" component={Activation} />
        <Root.Screen name="Settings" component={Settings} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
