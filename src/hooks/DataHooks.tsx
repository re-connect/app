import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import UserContext from '../context/UserContext';
import { removeDatumInList, updateDatumInList } from '../helpers/dataHelper';
import { makeRequestv2 } from '../services/requests';
import t from '../services/translation';
import { CreateAnyDataInterface, CreateDataInterface, DataInterface, ListContextInterface } from '../types/Data';
import { isPro } from '../helpers/userHelpers';

interface FetchDataInformation {
  isFetching: boolean;
  triggerFetch: () => Promise<void>;
}

export const useFetchData = (
  context: React.Context<ListContextInterface<any>>,
  endpoint?: string | null,
): FetchDataInformation => {
  const [isFetching, actions] = useBoolean(false);
  const { setList } = React.useContext(context);

  const triggerFetch = React.useCallback(async () => {
    try {
      actions.setTrue();
      if (endpoint !== null) {
        const data = await makeRequestv2(`/${endpoint}`, 'GET');
        if (data) {
          setList(data);
        }
      }
      actions.setFalse();
    } catch (error) {
      actions.setFalse();
      Alert.alert(t.t('error_fetching_data'));
    }
  }, [setList, actions, endpoint]);

  React.useEffect(() => {
    triggerFetch();
  }, [triggerFetch]);

  return { isFetching, triggerFetch };
};

interface PostDataInformation {
  isPosting: boolean;
  post: (data: CreateDataInterface) => Promise<void>;
}

export const usePostData = (
  endpoint: string,
  context: React.Context<ListContextInterface<any>>,
): PostDataInformation => {
  const [isPosting, actions] = useBoolean(false);
  const { list, setList } = React.useContext(context);
  const navigation = useNavigation<any>();

  const post = React.useCallback(
    async (data: CreateDataInterface) => {
      try {
        actions.setTrue();
        const createdData = await makeRequestv2(`/${endpoint}`, 'POST', data);
        if (createdData) {
          setList([createdData, ...list]);
        }
        navigation.goBack();
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_creating_data'));
      }
    },
    [setList, actions, endpoint, list, navigation],
  );
  return { isPosting, post };
};

interface UpdateDataInformation {
  isUpdating: boolean;
  update: (data: CreateAnyDataInterface) => Promise<void>;
}

export const useUpdateData = (
  endpoint: string,
  itemId: number,
  context: React.Context<ListContextInterface<any>>,
): UpdateDataInformation => {
  const [isUpdating, actions] = useBoolean(false);
  const { list, setList } = React.useContext(context);
  const { user } = React.useContext(UserContext);
  const navigation = useNavigation<any>();

  const update = React.useCallback(
    async (data: CreateAnyDataInterface) => {
      try {
        actions.setTrue();
        const updatedData = await makeRequestv2(`/${endpoint}`, 'PUT', data);
        if (updatedData) {
          if (updatedData.b_prive && isPro(user)) {
            setList(removeDatumInList(list, itemId));
            navigation.goBack();
          } else {
            setList(updateDatumInList(list, itemId, updatedData));
          }
        }
        navigation.goBack();
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_updating_data'));
      }
    },
    [setList, actions, endpoint, list, navigation, itemId, user],
  );
  return { isUpdating, update };
};

interface DeleteDataInformation {
  isDeleting: boolean;
  deleteItem: (goBackAfter?: boolean) => Promise<void>;
  hasBeenDeleted: boolean;
}

export const useDeleteData = (
  context: React.Context<ListContextInterface<any>>,
  endpoint: string,
  itemId: number,
): DeleteDataInformation => {
  const [isDeleting, actions] = useBoolean(false);
  const { list, setList } = React.useContext(context);
  const navigation = useNavigation<any>();
  const [hasBeenDeleted, actionDelete] = useBoolean(false);

  const deleteItem = React.useCallback(
    async (goBackAfter?: boolean) => {
      try {
        actions.setTrue();
        Alert.alert(t.t('warning'), t.t('delete_data_confirm'), [
          { text: t.t('cancel'), onPress: actions.setFalse, style: 'cancel' },
          {
            text: t.t('yes'),
            style: 'default',
            onPress: async () => {
              actions.setTrue();
              const deletedItem = await makeRequestv2(`/${endpoint}`, 'DELETE');
              if (deletedItem !== undefined) {
                setList(list.filter((item: DataInterface) => item.id !== itemId));
              }
              actions.setFalse();
              actionDelete.setTrue();
              if (goBackAfter && goBackAfter === true) {
                navigation.goBack();
              }
            },
          },
        ]);
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_deleting_data'));
      }
    },
    [setList, actions, endpoint, list, itemId, navigation],
  );
  return { isDeleting, deleteItem, hasBeenDeleted };
};

interface PatchDataInformation {
  isPatching: boolean;
  patch: (goBackAfter?: boolean) => Promise<void>;
}

export const usePatchData = (
  endpoint: string,
  itemId: number,
  context: React.Context<ListContextInterface<any>>,
): PatchDataInformation => {
  const [isPatching, actions] = useBoolean(false);
  const { list, setList } = React.useContext(context);
  const { user } = React.useContext(UserContext);
  const navigation = useNavigation<any>();

  const patch = React.useCallback(
    async (goBackAfter?: boolean) => {
      try {
        actions.setTrue();
        const newData = await makeRequestv2(`/${endpoint}`, 'PATCH');
        if (newData) {
          if (newData.b_prive && isPro(user)) {
            setList(removeDatumInList(list, itemId));
            if (goBackAfter) {
              navigation.goBack();
            }
          } else {
            setList(updateDatumInList(list, itemId, newData));
          }
        } else if (newData === null || newData === '') {
          setList(removeDatumInList(list, itemId));
          if (goBackAfter) {
            navigation.goBack();
          }
        }
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_updating_data_privacy'));
      }
    },
    [setList, actions, endpoint, list, itemId, navigation, user],
  );

  return { isPatching, patch };
};
