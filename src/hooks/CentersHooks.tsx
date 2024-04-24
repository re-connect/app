import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import CenterContext from '../context/CenterContext';
import UserContext from '../context/UserContext';
import { acceptCenterInList, removeCenterFromList } from '../helpers/centersHelper';
import { makeRequestv2 } from '../services/requests';
import t from '../services/translation';
import { CenterInterface, UserCenterInterface } from '../types/Centers';

export const useFetchCenters = () => {
  const [isFetchingCenters, actions] = useBoolean(false);
  const { setList } = React.useContext(CenterContext);

  const triggerFetchCenters = React.useCallback(async () => {
    try {
      actions.setTrue();
      const centers = await makeRequestv2('/centers', 'GET');
      if (centers) {
        setList(centers);
      }
      actions.setFalse();
    } catch (error) {
      actions.setFalse();
      Alert.alert(t.t('error_fetching_centers'));
    }
  }, [setList, actions]);

  React.useEffect(() => {
    triggerFetchCenters();
  }, [triggerFetchCenters]);

  return { isFetchingCenters, triggerFetchCenters };
};

export const useAcceptCenterInvitation = () => {
  const [isAcceptingInvitation, actions] = useBoolean(false);
  const { list, setList } = React.useContext(CenterContext);

  const triggerAcceptInvitation = React.useCallback(
    async (center: CenterInterface) => {
      try {
        actions.setTrue();
        const newCenter = await makeRequestv2(`/centers/${center.id}/accept`, 'PATCH');
        if (newCenter) {
          setList(acceptCenterInList(list, center));
        }
        actions.setFalse();
      } catch (error) {
        actions.setFalse();
        Alert.alert(t.t('error_accepting_invitation'));
      }
    },
    [actions, list, setList],
  );

  return { isAcceptingInvitation, triggerAcceptInvitation };
};

export const useLeaveCenter = (centerId: number) => {
  const [isLeaving, actions] = useBoolean(false);
  const { list, setList } = React.useContext(CenterContext);
  const { user } = React.useContext(UserContext);

  const leave = React.useCallback(async () => {
    try {
      Alert.alert(t.t('warning'), t.t('leave_center_confirm'), [
        { text: t.t('no'), onPress: actions.setFalse, style: 'cancel' },
        {
          text: t.t('yes'),
          style: 'default',
          onPress: async () => {
            actions.setTrue();
            try {
              await makeRequestv2(`/users/${user?.id}/centers/${centerId}/leave`, 'PATCH');
              setList(removeCenterFromList(list, centerId));
              actions.setFalse();
            } catch (error) {
              actions.setFalse();
            }
          },
        },
      ]);
      actions.setFalse();
    } catch (error) {
      actions.setFalse();
      Alert.alert(t.t('error_leaving_center'));
    }
  }, [centerId, list, setList, actions, user]);

  return { isLeaving, leave };
};

const triggerAcceptInvitationAlert = (
  invitations: UserCenterInterface[],
  triggerAcceptInvitation: (center: CenterInterface) => void,
) => {
  const center = invitations.pop();
  if (center) {
    Alert.alert(
      'invitation',
      `Le centre ${center.centre.nom} vous invite à le rejoindre`,
      [
        {
          text: t.t('accept'),
          onPress: async () => {
            triggerAcceptInvitation(center.centre);
          },
        },
        {
          text: t.t('refuse'),
          onPress: () => {},
        },
      ],
      { cancelable: true },
    );
  }
};

export const useFetchInvitations = () => {
  const { triggerAcceptInvitation } = useAcceptCenterInvitation();
  const fetchInvitations = React.useCallback(async () => {
    try {
      const centers = await makeRequestv2('/centers', 'GET');
      if (centers && Array.isArray(centers)) {
        const invitations = centers.filter((center: UserCenterInterface) => {
          return !center.b_valid;
        });
        triggerAcceptInvitationAlert(invitations, triggerAcceptInvitation);
      }
    } catch (exception) {}
  }, []);

  React.useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return fetchInvitations;
};
