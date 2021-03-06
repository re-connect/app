import { View } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { usePatchData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import RNSwitch from './RNSwitch';

const styles = StyleSheet.create({
  icon: { fontSize: 20 },
});

interface Props {
  isPrivate: boolean;
  endpoint: string;
  Context: React.Context<any>;
  itemId: number;
}

const TogglePrivacySwitch: React.FC<Props> = ({ isPrivate, endpoint, Context, itemId }) => {
  const toggle = usePatchData(`${endpoint}/toggle-access`, itemId, Context);

  return (
    <>
      {toggle.isPatching ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ ...styles.icon, marginRight: 8 }} name="share" color={colors.blue} />
          <RNSwitch value={isPrivate} onPress={() => toggle.patch(true)} />
          <Icon style={{ ...styles.icon, marginLeft: 8 }} name="lock" color={colors.red} />
        </View>
      )}
    </>
  );
};

export default TogglePrivacySwitch;
