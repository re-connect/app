import * as React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import UserContext from '../../context/UserContext';
import { colors } from '../../style';
import { getUserColor } from '../../helpers/userHelpers';
import Icon from './Icon';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  addPlusIcon?: boolean;
  iconColor?: string;
  iconName: string;
  isLoading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
}
const styles = StyleSheet.create({
  container: { backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  loading: { backgroundColor: colors.gray },
  plusIcon: { position: 'absolute', right: -8, top: 4 },
});

const IconButton: React.FC<Props> = ({
  onPress,
  isLoading,
  iconName,
  disabled,
  iconColor,
  backgroundColor,
  size,
  addPlusIcon,
}) => {
  const { user } = React.useContext(UserContext);
  const userColor = getUserColor(user);

  const sizedStyle = {
    height: !size ? 50 : size,
    width: !size ? 50 : size,
    borderRadius: !size ? 25 : size / 2,
  };
  const iconSize = !size ? 20 : size / 2.5;
  const computedBackgroundColor = disabled || isLoading ? colors.gray : !backgroundColor ? userColor : backgroundColor;

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={{
        ...styles.container,
        ...sizedStyle,
        backgroundColor: computedBackgroundColor,
      }}
      onPress={onPress}>
      {!isLoading ? (
        <>
          <Icon
            style={{ fontSize: iconSize, width: iconSize }}
            color={!iconColor ? colors.white : iconColor}
            name={iconName}
          />
          {!addPlusIcon ? null : (
            <Icon name="plus" color={colors.white} style={[styles.plusIcon, { fontSize: iconSize * 0.7 }]} />
          )}
        </>
      ) : (
        <ActivityIndicator size="small" color={colors.black} />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
