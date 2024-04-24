import * as Sentry from '@sentry/react-native';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import BeneficiaryContext from './src/context/BeneficiaryContext';
import CenterContext from './src/context/CenterContext';
import ContactContext from './src/context/ContactContext';
import DocumentContext from './src/context/DocumentContext';
import EventContext from './src/context/EventContext';
import FolderContext from './src/context/FolderContext';
import NoteContext from './src/context/NoteContext';
import ThemeContext from './src/context/ThemeContext';
import UserContext from './src/context/UserContext';
import LoginTemporisationContext from './src/context/LoginTemporisationContext';
// import { isCodePushEnabled } from './src/helpers/codePushHelper';
import Routes from './src/routing/Router.tsx';
import './src/services/translation';
import { BeneficiaryInterface } from './src/types/Beneficiaries';
import { UserCenterInterface } from './src/types/Centers';
import { ContactInterface } from './src/types/Contact';
import { DocumentInterface } from './src/types/Documents';
import { EventInterface } from './src/types/Event';
import { FolderInterface } from './src/types/Folder';
import { NoteInterface } from './src/types/Note';
import { UserInterface } from './src/types/Users';
import { config } from './src/config';
import { MAX_LOGIN_ATTEMPTS } from './src/appConstants';
import { useNumber } from 'react-hanger';
import { useCheckAndUpdateApp } from './src/hooks/UpdateHooks';
SplashScreen.hide();

Sentry.init({ dsn: config.sentrySecret });

const App: React.FC = () => {
  const [documents, setDocuments] = React.useState<DocumentInterface[]>([]);
  const [folders, setFolders] = React.useState<FolderInterface[]>([]);
  const [centers, setCenters] = React.useState<UserCenterInterface[]>([]);
  const [contacts, setContacts] = React.useState<ContactInterface[]>([]);
  const [notes, setNotes] = React.useState<NoteInterface[]>([]);
  const [events, setEvents] = React.useState<EventInterface[]>([]);
  const [user, setUser] = React.useState<UserInterface | null>(null);
  const [beneficiaries, setBeneficiaries] = React.useState<BeneficiaryInterface[]>([]);
  const [beneficiary, setBeneficiary] = React.useState<UserInterface | null>(null);
  const [lastUsername, setLastUsername] = React.useState<string | null>(null);
  const [theme, themeActions] = useBoolean(false);
  const attempts = useNumber(0);

  const isTemporarlyBlocked = () => attempts.value === MAX_LOGIN_ATTEMPTS;

  useCheckAndUpdateApp();

  return (
    <LoginTemporisationContext.Provider
      value={{ attempts: attempts.value, setAttempts: attempts.setValue, isTemporarlyBlocked }}>
      <UserContext.Provider value={{ user, setUser, lastUsername, setLastUsername }}>
        <BeneficiaryContext.Provider
          value={{ current: beneficiary, setCurrent: setBeneficiary, list: beneficiaries, setList: setBeneficiaries }}>
          <CenterContext.Provider value={{ list: centers, setList: setCenters }}>
            <ContactContext.Provider value={{ list: contacts, setList: setContacts }}>
              <NoteContext.Provider value={{ list: notes, setList: setNotes }}>
                <EventContext.Provider value={{ list: events, setList: setEvents }}>
                  <DocumentContext.Provider value={{ list: documents, setList: setDocuments }}>
                    <FolderContext.Provider value={{ list: folders, setList: setFolders }}>
                      <ThemeContext.Provider value={{ value: theme, actions: themeActions }}>
                        <StatusBar barStyle='light-content' />
                        <Routes user={user} />
                      </ThemeContext.Provider>
                    </FolderContext.Provider>
                  </DocumentContext.Provider>
                </EventContext.Provider>
              </NoteContext.Provider>
            </ContactContext.Provider>
          </CenterContext.Provider>
        </BeneficiaryContext.Provider>
      </UserContext.Provider>
    </LoginTemporisationContext.Provider>
  );
};

// const { ON_APP_START } = CodePush.CheckFrequency;
// const { ON_NEXT_RESTART } = CodePush.InstallMode;

// export default isCodePushEnabled ? CodePush({
//   checkFrequency: ON_APP_START,
//   installMode: ON_NEXT_RESTART,
// })(App) : App;

export default Sentry.wrap(App);
