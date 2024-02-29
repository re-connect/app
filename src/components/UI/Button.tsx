import React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../style';
import Text from './Text';
import Icon from './Icon';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconColor?: string;
  iconName?: string;
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: colors.black, fontSize: 20 },
  loader: { marginLeft: 16 },
  loading: { backgroundColor: colors.gray },
  fullWidth: { flex: 1 },
  icon: { fontSize: 20, marginHorizontal: 16 },
});

const Button: React.FC<Props> = ({
  text,
  onPress,
  isLoading,
  iconName,
  disabled,
  iconColor,
  fullWidth,
  backgroundColor,
}) => (
  <TouchableOpacity
    disabled={disabled || isLoading}
    style={[
      styles.container,
      disabled || isLoading ? styles.loading : {},
      fullWidth ? styles.fullWidth : {},
      !backgroundColor ? {} : { backgroundColor },
    ]}
    onPress={onPress}>
    <Icon style={styles.icon} color={!iconColor ? colors.white : iconColor} name={iconName} />
    <Text style={styles.text}>{text}</Text>
    {isLoading ? <ActivityIndicator style={styles.loader} size="small" color={colors.black} /> : null}
  </TouchableOpacity>
);

export default Button;
