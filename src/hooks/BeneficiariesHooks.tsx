import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import BeneficiaryContext from '../context/BeneficiaryContext';
import ContactContext from '../context/ContactContext';
import DocumentContext from '../context/DocumentContext';
import EventContext from '../context/EventContext';
import NoteContext from '../context/NoteContext';
import { formatEnableBeneficiaryErrors } from '../middlewares/dataTransformer';
import { makeRequestv2, makeRequestv3 } from '../services/requests';
import t from '../services/translation';
import {
  BeneficiaryInterface,
  CreateBeneficiaryDataInterface,
  EnableBeneficiaryDataInterface,
  EnableBeneficiaryErrorsInterface,
} from '../types/Beneficiaries';

export const useFetchBeneficiaries = () => {
  const [isFetchingBeneficiaries, setIsFetchingBeneficiaries] = useState<boolean>(false);
  const { list, setList } = useContext(BeneficiaryContext);

  const triggerFetchBeneficiaries = useCallback(async () => {
    try {
      setIsFetchingBeneficiaries(true);
      const beneficiaries = await makeRequestv2('/beneficiaires', 'GET');
      if (beneficiaries && JSON.stringify(beneficiaries) !== JSON.stringify(list)) {
        setList(beneficiaries);
      }

      setIsFetchingBeneficiaries(false);
    } catch (error) {
      setIsFetchingBeneficiaries(false);
      Alert.alert(t.t('error_fetching_beneficiary'));
    }
  }, [list, setList]);

  useEffect((): void => {
    triggerFetchBeneficiaries();
  }, [triggerFetchBeneficiaries]);

  return { list, isFetchingBeneficiaries, triggerFetchBeneficiaries };
};

export const useGoToBeneficiary = () => {
  const { navigate } = useNavigation<any>();
  const { setCurrent } = useContext(BeneficiaryContext);
  const contactContext = useContext(ContactContext);
  const documentContext = useContext(DocumentContext);
  const eventContext = useContext(EventContext);
  const noteContext = useContext(NoteContext);

  const goToBeneficiary = useCallback(
    (beneficiary: BeneficiaryInterface) => {
      setCurrent({ ...beneficiary, ...beneficiary.user, subject_id: beneficiary.id });
      contactContext.setList([]);
      documentContext.setList([]);
      eventContext.setList([]);
      noteContext.setList([]);
      navigate('Beneficiary', {
        screen: 'DocumentsList',
        params: { beneficiaryId: beneficiary.id },
      });
    },
    [navigate, setCurrent, contactContext, documentContext, eventContext, noteContext],
  );

  return goToBeneficiary;
};

export const useCreateBeneficiary = () => {
  const [isCreating, isCreatingActions] = useBoolean(false);
  const { list, setList } = useContext(BeneficiaryContext);
  const { goBack } = useNavigation<any>();
  // TODO: set errors or remove this state
  const [errors] = useState<Record<string, any>>({});
  const goToBeneficiary = useGoToBeneficiary();

  const triggerCreateBeneficiary = useCallback(
    async (data: CreateBeneficiaryDataInterface) => {
      try {
        isCreatingActions.setTrue();
        const createdBeneficiary = await makeRequestv2('/beneficiaries', 'POST', data);
        isCreatingActions.setFalse();
        if (createdBeneficiary && createdBeneficiary.centres && createdBeneficiary.centres.length > 0) {
          Alert.alert(
            t.t('success'),
            t.t('beneficiary_creation_success', { username: createdBeneficiary?.user?.username }),
          );
          setList([createdBeneficiary, ...list]);
          goToBeneficiary(createdBeneficiary);
        } else {
          goBack();
        }
      } catch (error) {
        isCreatingActions.setFalse();
        if (!(error instanceof Error)) {
          Alert.alert(t.t('error_creating_beneficiary'));
        }
      }
    },
    [isCreatingActions, list, setList, goBack, goToBeneficiary],
  );

  return { isCreating, triggerCreateBeneficiary, createErrors: errors };
};

export const useFetchSecretQuestions = () => {
  const [secretQuestionList, setSecretQuestionList] = useState<string[]>([]);

  const triggerFetchSecretQuestions = useCallback(async () => {
    try {
      const secretQuestions = await makeRequestv2('/get-secret-questions', 'GET');
      setSecretQuestionList(Object.keys(secretQuestions).map(question => secretQuestions[question]));
    } catch (error) {
      Alert.alert(t.t('error_fetching_secret_answers'));
    }
  }, [setSecretQuestionList]);

  useEffect(() => {
    triggerFetchSecretQuestions();
  }, [triggerFetchSecretQuestions]);

  return { secretQuestionList, triggerFetchSecretQuestions };
};

export const useEnableBeneficiary = () => {
  const [isCreating, isCreatingActions] = useBoolean(false);
  const [errors, setErrors] = useState<EnableBeneficiaryErrorsInterface>({});
  const navigation = useNavigation<any>();

  const triggerEnableBeneficiary = useCallback(
    async (data: EnableBeneficiaryDataInterface) => {
      try {
        isCreatingActions.setTrue();

        const updatedBeneficiary = await makeRequestv2('/beneficiary/enable', 'PATCH', data);
        if (updatedBeneficiary) {
          navigation.navigate('Home');
        }
        isCreatingActions.setFalse();
      } catch (error) {
        if (error instanceof Error) {
          const errors = formatEnableBeneficiaryErrors(JSON.parse(error.message));
          setErrors(errors);
        }
        isCreatingActions.setFalse();
        Alert.alert(t.t('error_activating_beneficiary'));
      }
    },
    [isCreatingActions, navigation],
  );

  return { isCreating, triggerEnableBeneficiary, enableErrors: errors };
};

export const useDeleteBeneficiary = () => {
  const { t } = useTranslation();
  const [isDeleting, isDeletingActions] = useBoolean(false);
  const navigation = useNavigation<any>();

  const triggerDeleteBeneficiary = useCallback(
    async (id: number) => {
      try {
        isDeletingActions.setTrue();
        Alert.alert(t('delete_my_account_confirm'), t('this_action_is_irreversible'), [
          {
            text: t('yes'),
            onPress: async () => {
              await makeRequestv2(`/beneficiaries/${id}`, 'DELETE');
              await AsyncStorage.removeItem('accessToken');
              navigation.navigate('Auth');
              isDeletingActions.setFalse();
            },
            style: 'cancel',
          },
          {
            text: t('cancel'),
            onPress: isDeletingActions.setFalse,
          },
        ]);
      } catch (error) {
        isDeletingActions.setFalse();
        Alert.alert(t('error_generic'));
      }
    },
    [isDeletingActions, navigation],
  );

  return { isDeleting, isDeletingActions, triggerDeleteBeneficiary };
};

export const useRequestDataForBeneficiary = () => {
  const { t } = useTranslation();
  const [isGetingData, isGetingDataActions] = useBoolean(false);
  const navigation = useNavigation<any>();

  const triggerRequestDataBeneficiary = useCallback(
    async (id: number) => {
      try {
        isGetingDataActions.setTrue();
        Alert.alert(t('get_my_data_confirm'), t('get_my_data_text'), [
          {
            text: t('yes'),
            onPress: async () => {
              await makeRequestv3('/users/request-personal-account-data/', 'POST');
              isGetingDataActions.setFalse();
            },
            style: 'cancel',
          },
          {
            text: t('cancel'),
            onPress: isGetingDataActions.setFalse,
          },
        ]);
      } catch (error) {
        isGetingDataActions.setFalse();
        Alert.alert(t('error_generic'));
      }
    },
    [isGetingDataActions, navigation],
  );

  return { isGetingData, isGetingDataActions, triggerRequestDataBeneficiary };
};
