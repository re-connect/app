import { FormikErrors, FormikTouched } from 'formik';
import { Input, Stack } from 'native-base';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { KeyboardType, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
    marginRight: 16,
  },
});

export interface TextFieldProps {
  autocompleteType?: string;
  contentType?: any;
  disabled?: boolean;
  editable?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  fieldLabel?: string;
  handleBlur?: any;
  handleChange?: any;
  iconName?: string;
  iconSyle?: any;
  keyboardType?: KeyboardType;
  okIcon?: boolean;
  onFocus?: () => void;
  style?: any;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  value?: string;
  leftElement?: React.ReactElement;
}

const TextField: React.FC<TextFieldProps> = ({
  autocompleteType,
  contentType,
  disabled,
  editable,
  error,
  fieldLabel,
  handleBlur,
  handleChange,
  iconName,
  iconSyle,
  keyboardType,
  okIcon,
  onFocus,
  style,
  touched,
  leftElement,
  value,
}) => {
  const { t } = useTranslation();
  const [showPassword, showPasswordActions] = useBoolean(false);
  error = !error ? '' : Array.isArray(error) ? error.join(', ') : error;
  if (!style) {
    style = { color: colors.darkGray };
  }

  const getRightIconName = () => {
    return !!value && !!okIcon && !!touched && !error ? 'check' : 'times';
  };

  const getIconColor = () => {
    if (contentType === 'password') return colors.darkGray;
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

  const RightElement =
    contentType === 'password' ? (
      <Icon name='eye' style={{ ...styles.icon, color: getIconColor() }} onPress={showPasswordActions.toggle} />
    ) : !touched ? (
      undefined
    ) : (
      <Icon name={getRightIconName()} style={{ ...styles.icon, color: getIconColor() }} />
    );

  return (
    <Stack mt={3} space={4} w='100%' backgroundColor={colors.white} borderRadius='24'>
      <Input
        borderColor={colors.darkGray}
        h='48px'
        size='xl'
        autoCapitalize='none'
        autoCompleteType={!autocompleteType ? contentType : autocompleteType}
        isDisabled={disabled}
        isInvalid={!!error}
        editable={editable}
        keyboardType={keyboardType}
        onBlur={handleBlur}
        onChangeText={handleChange}
        onFocus={onFocus}
        placeholder={t(fieldLabel ?? '')}
        placeholderTextColor={colors.darkGray}
        secureTextEntry={contentType === 'password' && !showPassword}
        style={style}
        textContentType={contentType}
        value={!value ? '' : value}
        variant='rounded'
        isFullWidth
        leftElement={LeftElement}
        rightElement={RightElement}
      />
    </Stack>
  );
};

export default TextField;
