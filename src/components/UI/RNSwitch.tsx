import * as React from 'react';
import { Platform, Switch } from 'react-native';
import { colors } from '../../style';

interface Props {
  onPress: () => void;
  value: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

const RNSwitch: React.FC<Props> = ({ onPress, value, activeColor, inactiveColor }) => {
  const isIos = Platform.OS === 'ios';
  const offColor = !inactiveColor ? colors.blue : inactiveColor;
  const onColor = !activeColor ? colors.red : activeColor;
  const currentColor = !value ? offColor : onColor;
  const thumbColor = isIos ? undefined : currentColor;
  const trackColor = !isIos ? undefined : { false: offColor, true: onColor };

  return (
    <Switch
      ios_backgroundColor={currentColor}
      thumbColor={thumbColor}
      value={value}
      onValueChange={onPress}
      trackColor={trackColor}
    />
  );
};

export default RNSwitch;
