import { TextArea as BaseTextArea } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';
import { TextFieldProps } from './TextField';

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
    marginRight: 16,
  },
});

const TextArea: React.FC<TextFieldProps> = ({
  disabled,
  error,
  fieldLabel,
  handleBlur,
  handleChange,
  iconName,
  iconSyle,
  leftElement,
  okIcon,
  onFocus,
  touched,
  value,
}) => {
  const { t } = useTranslation();
  error = !error ? '' : Array.isArray(error) ? error.join(', ') : error;

  const getRightIconName = () => {
    return !!value && !!okIcon && !!touched && !error ? 'check' : 'times';
  };

  const getIconColor = () => {
    if (okIcon) {
      return !!value && !!touched && !error ? colors.green : colors.red;
    }

    return 'transparent';
  };

  const LeftElement = leftElement ? (
    leftElement
  ) : !iconName ? (
    undefined
  ) : (
    <Icon style={{ ...styles.icon, color: colors.darkGray, ...iconSyle }} name={iconName} />
  );

  const RightElement = !touched ? (
    undefined
  ) : (
    <Icon name={getRightIconName()} style={{ ...styles.icon, color: getIconColor() }} />
  );

  return (
    <BaseTextArea
      size='2xl'
      h='150'
      autoCapitalize='none'
      numberOfLines={100}
      autoCompleteType='off'
      isDisabled={disabled}
      isInvalid={!!error}
      multiline={true}
      backgroundColor={colors.white}
      borderColor={colors.darkGray}
      onBlur={handleBlur}
      borderRadius={24}
      onChangeText={handleChange}
      onFocus={onFocus}
      placeholder={t(fieldLabel ?? '')}
      placeholderTextColor={colors.darkGray}
      value={value ?? ''}
      leftElement={LeftElement}
      rightElement={RightElement}
    />
  );
};

export default TextArea;
