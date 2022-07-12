import { Stack } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { colors } from '../../style';
import { TextFieldProps } from './TextField';
import Icon from 'react-native-vector-icons/FontAwesome5';
import parsePhoneNumber from 'libphonenumber-js';
export type PhoneNumberType = Omit<TextFieldProps, 'fieldLabel'>;

const PhoneInputField: React.FC<PhoneNumberType> = ({ handleChange, touched, value, error, okIcon, style }) => {
  const { t } = useTranslation();

  const phoneInput = useRef<PhoneInput>(null);
  const [displayedValue, setDisplayedValue] = React.useState<string | null>(null);
  const [defaultCode, setDefaultCode] = React.useState('FR');

  useEffect(() => {
    if (value && value !== '') {
      const phoneNumber = parsePhoneNumber(value);

      if (phoneNumber) {
        setDisplayedValue(phoneNumber.nationalNumber);
        phoneNumber.country && setDefaultCode(phoneNumber.country);
      }
    } else {
      setDisplayedValue('');
    }
  }, [value]);

  const getRightIconName = () => {
    return !!value && !!okIcon && !!touched && !error ? 'check' : 'times';
  };

  const getIconColor = () => {
    if (okIcon) {
      return !!value && !!touched && !error ? colors.green : colors.red;
    }
    return 'transparent';
  };

  const RightElement = () => {
    return !touched ? null : <Icon name={getRightIconName()} style={{ ...styles.icon }} color={getIconColor()} />;
  };

  return (
    <Stack mt={3} space={4} w="100%" backgroundColor={colors.white} borderRadius="24">
      <View style={[styles.wrapper, !!error && { borderColor: colors.red }]}>
        {displayedValue !== null && (
          <>
            <PhoneInput
              filterProps={{ placeholder: t('choose_a_country'), style: { width: '100%' } }}
              placeholder={t('phone')}
              ref={phoneInput}
              defaultValue={displayedValue}
              //@ts-ignore
              defaultCode={defaultCode}
              layout="first"
              onChangeFormattedText={handleChange}
              textContainerStyle={styles.textContainer}
              containerStyle={styles.container}
              textInputStyle={[style, styles.textInput]}
              codeTextStyle={[style, styles.textInput]}
            />
            <RightElement />
          </>
        )}
      </View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  phoneIndicator: { fontSize: 18, marginLeft: 16 },
  wrapper: {
    flex: 1,
    height: 50,
    borderRadius: 30,
    borderColor: colors.darkGray,
    borderWidth: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  container: { height: 50 },
  textContainer: {
    backgroundColor: colors.white,
    height: Platform.OS === 'ios' ? 60 : 66,
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
  },
  textInput: {
    fontSize: 15.5,
    alignSelf: 'center',
  },
});

export default PhoneInputField;
