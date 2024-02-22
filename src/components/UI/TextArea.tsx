import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../style';
import { TextFieldProps } from './TextField';
import Icon from './Icon';

const styles = StyleSheet.create({
  style: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 24,
    height: 150,
    padding: 16,
    fontSize: 16,
  },
  validityIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
    color: colors.red,
  },
  invalidStyle: { borderColor: colors.red },
});

const TextArea: React.FC<TextFieldProps> = ({
  disabled,
  error,
  fieldLabel,
  handleBlur,
  handleChange,
  okIcon,
  onFocus,
  touched,
  value,
}) => {
  const { t } = useTranslation();
  error = !error ? '' : Array.isArray(error) ? error.join(', ') : error;

  const rightIconName = !!value && !!okIcon && !!touched && !error ? 'check' : 'xmark';
  const rightIconColor = !!value && !!okIcon && !!touched && !error ? colors.green : colors.red;

  const inputStyle = [styles.style, error ? styles.invalidStyle : {}];

  return (
    <View>
      <TextInput
        style={inputStyle}
        autoCapitalize='none'
        numberOfLines={100}
        autoComplete='off'
        editable={!disabled}
        multiline={true}
        onBlur={handleBlur}
        onChangeText={handleChange}
        onFocus={onFocus}
        placeholder={t(fieldLabel ?? '')}
        placeholderTextColor={colors.darkGray}
        value={value ?? ''}
      />
      {!touched ? null : <Icon name={rightIconName} style={{ ...styles.validityIcon, color: rightIconColor }} />}
    </View>
  );
};

export default TextArea;
