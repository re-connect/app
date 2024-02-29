import * as React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet } from 'react-native';
import { colors } from '../../style';
import FaIcon from '@expo/vector-icons/FontAwesome6';
import { FontAwesome6IconProps } from 'react-native-vector-icons/FontAwesome6';

type Props = Omit<FontAwesome6IconProps, 'name'> & {
  style?: StyleProp<any>;
  color?: string;
  size?: number;
  name?: any;
  onPress?: (_event: GestureResponderEvent) => void;
};

const styles = StyleSheet.create({
  icon: { fontSize: 15, marginHorizontal: 16 },
});

const Icon: React.FC<Props> = ({ style, color, name, size, onPress }) =>
  !name ? null : (
  <FaIcon
    style={[styles.icon, style]}
    color={!color ? colors.white : color}
    name={name}
    size={size}
    solid
    onPress={onPress}
  />
);
export default Icon;
