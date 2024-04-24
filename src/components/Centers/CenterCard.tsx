import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAcceptCenterInvitation, useLeaveCenter } from '../../hooks/CentersHooks';
import { colors } from '../../style';
import { UserCenterInterface } from '../../types/Centers';
import Text from '../UI/Text';
import Icon from '../UI/Icon';

interface CenterCardProps {
  center: UserCenterInterface;
  isInvitation?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    minHeight: 80,
    marginLeft: 0,
    marginVertical: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    borderLeftColor: colors.black,
    borderLeftWidth: 4,
  },
  name: {
    flex: 1,
  },
  centerIcon: {
    fontSize: 40,
    marginHorizontal: 16,
  },
  leaveIcon: {
    fontSize: 25,
    marginHorizontal: 8,
  },
  acceptInvitation: {
    backgroundColor: colors.blue,
    width: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CenterCard: React.FC<CenterCardProps> = ({ center }) => {
  const { isAcceptingInvitation, triggerAcceptInvitation } = useAcceptCenterInvitation();
  const { isLeaving, leave } = useLeaveCenter(center.centre.id);

  return (
    <View style={styles.container} key={center.id}>
      <Icon style={styles.centerIcon} color={colors.black} name='hotel' />
      <Text style={styles.name}>{center.centre.nom}</Text>
      {!center.b_valid ? (
        <TouchableOpacity
          style={styles.acceptInvitation}
          disabled={isAcceptingInvitation}
          onPress={() => triggerAcceptInvitation(center.centre)}>
          {!isAcceptingInvitation ? (
            <Text style={{ color: colors.white }}>accept</Text>
          ) : (
            <ActivityIndicator size='large' color={colors.white} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled={isLeaving} onPress={leave}>
          {!isLeaving ? (
            <Icon style={styles.leaveIcon} name='sign-out-alt' color={colors.red} />
          ) : (
            <ActivityIndicator size='large' color={colors.red} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CenterCard;
