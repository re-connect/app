import * as React from 'react';
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { colors } from '../../style';
import Text from './Text';
import Icon from './Icon';

interface Props {
  disabled?: boolean;
  iconColor?: string;
  color?: string;
  iconName?: string;
  isLoading?: boolean;
  onPress?: (event: any) => void;
  text: string;
  fontSize?: number;
  wrapperStyle?: ViewStyle;
  textStyle?: TextStyle;
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
  text: { color: colors.white, fontSize: 20, fontWeight: 'bold' },
  loader: { marginLeft: 16 },
  loading: { backgroundColor: colors.gray },
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
  wrapperStyle,
  textStyle,
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
        wrapperStyle,
      ]}
      onPress={onPress}>
      <Icon style={styles.icon} color={iconColor} name={iconName} />
      <Text style={[styles.text, fontSizeStyle, textStyle]}>{text}</Text>
      {isLoading ? <ActivityIndicator style={styles.loader} size='small' color={colors.black} /> : null}
    </TouchableOpacity>
  );
};

export default RoundedButton;
