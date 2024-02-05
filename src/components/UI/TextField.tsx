import { FormikErrors, FormikTouched } from 'formik';
import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { KeyboardType, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';

const styles = StyleSheet.create({
  icon: { marginHorizontal: 16 },
  error: { color: colors.red },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 3,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
  },
  input: {
    paddingLeft: 24,
    width: '100%',
    height:48,
    fontSize:18,
  },
});

export interface TextFieldProps {
  autocompleteType?: string;
  contentType?: any;
  disabled?: boolean;
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
  displayError?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  autocompleteType,
  contentType,
  disabled,
  error,
  displayError,
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
  style = { color: colors.darkGray, borderColor: !error ? colors.darkGray : colors.red, ...style };

  const leftIconStyle = { ...styles.icon, color: colors.darkGray, ...iconSyle };
  const rightIconColor = contentType === 'password'
    ? colors.darkGray
    : okIcon ? !!value && !!touched && !error ? colors.green : colors.red : 'transparent';
  const rightIconName = !!value && !!okIcon && !!touched && !error ? 'check' : 'times';
  const rightIconStyle = { ...styles.icon, color: rightIconColor};
;
  return (
    <View>
      <View style={[styles.inputContainer, style]}>
        { leftElement ? leftElement : !iconName ? null : <Icon style={leftIconStyle} name={iconName} />}
        <TextInput
          style={[styles.input, style]}
          autoCapitalize='none'
          autoComplete={!autocompleteType ? contentType : autocompleteType}
          editable={!disabled}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onChangeText={handleChange}
          onFocus={onFocus}
          placeholder={t(fieldLabel ?? '')}
          placeholderTextColor={colors.darkGray}
          secureTextEntry={contentType === 'password' && !showPassword}
          textContentType={contentType}
          value={!value ? '' : value}
        />
        {
          contentType === 'password'
          ? <Icon name='eye' style={rightIconStyle} onPress={showPasswordActions.toggle} />
          : !touched ? null : <Icon name={rightIconName} style={rightIconStyle} />
        }
      </View>
      {displayError && !!error && (
        <View style={{marginTop: 16, paddingHorizontal: 16}}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default TextField;
