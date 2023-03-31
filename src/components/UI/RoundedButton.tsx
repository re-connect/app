import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ThemeContext from '../../context/ThemeContext';
import { colors } from '../../style';
import Text from './Text';

interface Props {
  disabled?: boolean;
  iconColor?: string;
  color?: string;
  iconName?: string;
  isLoading?: boolean;
  onPress?: (event: any) => void;
  text: string;
  fontSize?: number;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loader: {
    marginLeft: 16,
  },
  loading: {
    backgroundColor: colors.gray,
  },
  icon: { fontSize: 20, marginHorizontal: 16 },
});

const RoundedButton: React.FC<Props> = ({
  text,
  onPress,
  isLoading,
  iconName,
  iconColor,
  disabled,
  color,
  fontSize,
}) => {
  const theme = React.useContext(ThemeContext);
  const userColor = theme.value ? colors.primaryPro : colors.primary;
  const fontSizeStyle = fontSize ? { fontSize } : {};
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      style={[
        styles.container,
        { backgroundColor: color ? color : userColor },
        isLoading || disabled ? styles.loading : {},
      ]}
      onPress={onPress}>
      {!iconName ? null : <Icon style={styles.icon} color={!iconColor ? colors.white : iconColor} name={iconName} />}
      <Text style={[styles.text, fontSizeStyle]}>{text}</Text>
      {isLoading ? <ActivityIndicator style={styles.loader} size='small' color={colors.black} /> : null}
    </TouchableOpacity>
  );
};

export default RoundedButton;
