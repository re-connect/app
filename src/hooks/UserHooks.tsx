import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import { ResetPasswordData } from '../components/User/ResetPasswordForm';
import BeneficiaryContext from '../context/BeneficiaryContext';
import CenterContext from '../context/CenterContext';
import ContactContext from '../context/ContactContext';
import DocumentContext from '../context/DocumentContext';
import EventContext from '../context/EventContext';
import LoginTemporisationContext from '../context/LoginTemporisationContext';
import NoteContext from '../context/NoteContext';
import ThemeContext from '../context/ThemeContext';
import UserContext from '../context/UserContext';
import { getTruncatedFullName } from '../helpers/userHelpers';
import { login } from '../services/authentication';
import { LoginFormValues } from '../services/forms';
import { fetchCurrentUser, makeRequestv2, makeRequestv3 } from '../services/requests';
import t from '../services/translation';
import { UserField } from '../types/Users';
import { useFetchInvitations } from './CentersHooks';
import { useTranslation } from 'react-i18next';

export const useGetLastUsername = () => {
  const { lastUsername, setLastUsername } = React.useContext(UserContext);

  const getLastUsername = React.useCallback(async () => {
    const username = await AsyncStorage.getItem('lastUsername');
    setLastUsername(!username ? '' : username);
  }, [setLastUsername]);

  React.useEffect(() => {
    getLastUsername();
  }, [getLastUsername]);

  return lastUsername;
};

export const useGetUser = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { user, setUser } = React.useContext(UserContext);
  const { setCurrent } = React.useContext(BeneficiaryContext);
  // const registerToNotificationsService = useRegisterToNotificationsService();
  const theme = React.useContext(ThemeContext);
  const triggerGetUser = React.useCallback(async () => {
    try {
      const lastLanguage = await AsyncStorage.getItem('lastLanguage');
      if (!lastLanguage) {
        await AsyncStorage.setItem('lastLanguage', 'fr');
      } else {
        t.changeLanguage(lastLanguage);
      }
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        if (route.name !== 'Login') {
          navigation.reset({ routes: [{ name: 'Auth' }] });
        }
        return;
      }
      // await registerToNotificationsService();
      const newUser = await fetchCurrentUser();
      if (JSON.stringify(user) !== JSON.stringify(newUser)) setUser(newUser);
      if ((!newUser || !newUser.type_user) && route && route.name !== 'Login') {
        navigation.navigate('Auth');
        navigation.reset({ routes: [{ name: 'Auth' }] });
        return;
      }
      if (!newUser) return;
      const userType = newUser.type_user;
      if (userType === 'ROLE_BENEFICIAIRE') {
        setCurrent(newUser);
        theme.actions.setFalse();
        navigation.reset({ routes: [{ name: !newUser.question_secrete ? 'Activation' : 'Home' }] });
      } else {
        theme.actions.setTrue();
        navigation.reset({ routes: [{ name: 'Home' }] });
      }
    } catch (error) {
      if (route.name !== 'Login') {
        navigation.reset({ routes: [{ name: 'Auth' }] });
      }
    }
  }, [navigation, setUser, theme.actions, user, setCurrent, route]);

  React.useEffect(() => {
    triggerGetUser();
  }, []);

  return triggerGetUser;
};

export const useLogin = () => {
  const [isLoginIn, isLoginInActions] = useBoolean(false);
  const getUser = useGetUser();
  const fetchInvitations = useFetchInvitations();
  // const registerToNotificationsService = useRegisterToNotificationsService();
  const { setAttempts } = React.useContext(LoginTemporisationContext);

  const triggerLogin = React.useCallback(
    async (values: LoginFormValues) => {
      try {
        isLoginInActions.setTrue();
        AsyncStorage.setItem('lastUsername', values.username.toLowerCase());
        await login(values.username, values.password);
        await getUser();
        fetchInvitations();
        isLoginInActions.setFalse();
        setAttempts(0);
      } catch (error) {
        isLoginInActions.setFalse();
        Alert.alert(t.t('wrong_password_or_email'));
        setAttempts(attempt => attempt + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getUser, isLoginInActions, fetchInvitations],
  );

  return { isLoginIn, triggerLogin };
};

export const useSetTitleToBenefName = () => {
  const navigation = useNavigation<any>();
  const { current } = React.useContext(BeneficiaryContext);
  const { user } = React.useContext(UserContext);
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';

  const set = React.useCallback(() => {
    if (isMember) {
      navigation.setOptions({ title: getTruncatedFullName(current) });
    }
  }, [current, navigation, isMember]);

  React.useEffect(() => {
    set();
  }, [isMember, current, set]);
};

export const useUpdateUser = () => {
  const [isUpdating, actions] = useBoolean(false);
  const { user, setUser } = React.useContext(UserContext);
  const { setCurrent } = React.useContext(BeneficiaryContext);

  const update = React.useCallback(
    async (newValues: Record<UserField, string>) => {
      try {
        actions.setTrue();
        if (user) {
          const updatedUser = { ...user, ...newValues };
          if (updatedUser.date_naissance) {
            updatedUser.date_naissance = format(new Date(updatedUser.date_naissance), 'yyyy-MM-dd');
          }
          const newData = await makeRequestv2(`/users/${user?.id}`, 'PUT', updatedUser);
          if (newData) {
            if (newData.type_user === 'ROLE_BENEFICIAIRE') setCurrent(newData);
            setUser(newData);
          }
        }
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_updating_user'));
      }
    },
    [actions, user, setUser, setCurrent],
  );

  return { isUpdating, update };
};

export const useLogout = () => {
  const [isLoggingOut, isoLggingOutActions] = useBoolean(false);
  const userContext = React.useContext(UserContext);
  const beneficiaryContext = React.useContext(BeneficiaryContext);
  const centerContext = React.useContext(CenterContext);
  const contactContext = React.useContext(ContactContext);
  const documentContext = React.useContext(DocumentContext);
  const eventContext = React.useContext(EventContext);
  const navigation = useNavigation<any>();
  const noteContext = React.useContext(NoteContext);

  const logout = React.useCallback(async () => {
    Alert.alert(
      t.t('log_out_confirm'),
      '',
      [
        {
          text: t.t('yes'),
          onPress: async () => {
            userContext.setUser(null);
            beneficiaryContext.setCurrent(null);
            beneficiaryContext.setList([]);
            centerContext.setList([]);
            contactContext.setList([]);
            documentContext.setList([]);
            eventContext.setList([]);
            noteContext.setList([]);
            await AsyncStorage.removeItem('accessToken');
            isoLggingOutActions.setFalse();
            navigation.navigate('Auth');
          },
        },
        { text: t.t('no'), onPress: isoLggingOutActions.setFalse },
      ],
      { cancelable: true },
    );
  }, [
    navigation,
    userContext,
    isoLggingOutActions,
    beneficiaryContext,
    centerContext,
    contactContext,
    documentContext,
    eventContext,
    noteContext,
  ]);

  return { isoLggingOutActions, isLoggingOut, logout };
};

export const useResetPassword = () => {
  const { user } = React.useContext(UserContext);
  const [isResetting, resetActions] = useBoolean(false);
  const navigation = useNavigation<any>();

  const reset = React.useCallback(
    async (values: ResetPasswordData) => {
      try {
        if (user && user.subject_id && values.password && values.password === values.confirm) {
          resetActions.setTrue();
          const newData = await makeRequestv2(`/beneficiaries/${user.subject_id}/password`, 'PATCH', {
            password: values.password,
          });
          if (newData) {
            Alert.alert(t.t('password_successfully_updated'));
            navigation.goBack();
          }
          resetActions.setFalse();
        }
      } catch (error) {
        resetActions.setFalse();
        Alert.alert(t.t('error_updating_password'));
      }
    },
    [resetActions, navigation, user],
  );

  return { isResetting, reset };
};

export const useUserLocale = (): {
  updateLocale: (locale: string) => Promise<void>;
  currentLanguageCode: string;
} => {
  const { i18n } = useTranslation();
  const [currentLanguageCode, setCurrentLanguageCode] = React.useState<string>('fr');
  AsyncStorage.getItem('lastLanguage').then((lastLanguage: string | null): void => {
    setCurrentLanguageCode(lastLanguage !== null ? lastLanguage : 'fr');
  });

  const updateLocale = async (locale: string) => {
    try {
      if (locale) {
        const newData = await makeRequestv3(`/user/switch-locale/${locale}`, 'GET');
        if (newData) {
          setCurrentLanguageCode(locale);
          AsyncStorage.setItem('lastLanguage', locale);
          i18n.changeLanguage(locale);
        } else {
          Alert.alert(t.t('error_updating_locale'));
        }
      }
    } catch (error) {
      Alert.alert(t.t('error_updating_locale'));
    }
  };

  return { updateLocale, currentLanguageCode };
};
