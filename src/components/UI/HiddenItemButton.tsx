import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../style';
import Text from './Text';
import Icon from './Icon';

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    textAlign: 'center',
  },
  icon: {
    color: colors.white,
    fontSize: 20,
  },
  btn: {
    marginVertical: 2,
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    top: 0,
    width: 80,
  },
});

interface Props {
  isLoading?: boolean;
  onPress: () => void;
  color?: string;
  text?: string;
  iconName?: string;
  position?: 'left' | 'right';
}

const HiddenItemButton: React.FC<Props> = ({ isLoading, onPress, text, color, iconName }) => (
  <TouchableOpacity
    style={{ ...styles.btn, backgroundColor: !color ? colors.red : color }}
    disabled={isLoading}
    onPress={onPress}>
    {!isLoading ? (
      <>
        <Icon style={styles.icon} name={iconName} />
        {!text ? null : <Text style={styles.text}>{text}</Text>}
      </>
    ) : (
      <ActivityIndicator size="large" color={colors.white} />
    )}
  </TouchableOpacity>
);

export default HiddenItemButton;
