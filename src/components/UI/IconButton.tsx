import * as React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserContext from '../../context/UserContext';
import { colors } from '../../style';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  solid?: boolean;
  iconColor?: string;
  iconName: string;
  isLoading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: colors.gray,
  },
});

const IconButton: React.FC<Props> = ({
  onPress,
  isLoading,
  iconName,
  disabled,
  iconColor,
  backgroundColor,
  size,
  solid,
}) => {
  const { user } = React.useContext(UserContext);
  const isMember = !!user && user.type_user !== 'ROLE_BENEFICIAIRE';
  const userColor = isMember ? colors.blue : colors.primary;

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
          {!iconName ? null : (
            <Icon
              solid={solid}
              style={{ fontSize: iconSize }}
              color={!iconColor ? colors.white : iconColor}
              name={iconName}
            />
          )}
        </>
      ) : (
        <ActivityIndicator size="small" color={colors.black} />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
