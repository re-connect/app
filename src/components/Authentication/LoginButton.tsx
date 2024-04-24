import * as React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../style';
import Text from '../UI/Text';
import Icon from '../UI/Icon';

interface Props {
  text: string;
  isLoading?: boolean;
  iconName?: string;
  iconColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: colors.black, fontSize: 20, fontWeight: 'bold' },
  loader: { marginLeft: 16 },
  loading: { backgroundColor: colors.gray },
  icon: { fontSize: 20, marginHorizontal: 16 },
});

const Button: React.FC<Props> = ({ text, onPress, isLoading, iconName, iconColor }) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[styles.container, isLoading ? styles.loading : {}]}
      onPress={onPress}>
      <Icon style={styles.icon} color={!iconColor ? colors.black : iconColor} name={iconName} />
      <Text style={styles.text}>{text}</Text>
      {isLoading ? <ActivityIndicator style={styles.loader} size="small" color={colors.black} /> : null}
    </TouchableOpacity>
  );
};

export default Button;
