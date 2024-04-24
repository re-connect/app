import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import TextField from './TextField';

interface PickerFieldProps {
  handleChange?: (itemValue: string, itemIndex: number) => void;
  touched?: boolean;
  error?: string;
  iconName?: string;
  fieldLabel: string;
  value?: string;
  items: any[];
}

const PickerField: React.FC<PickerFieldProps> = ({
  handleChange,
  error,
  iconName,
  fieldLabel,
  touched,
  value,
  items,
}) => {
  const { t } = useTranslation();

  return (
    <View>
      <TextField
        value={value}
        fieldLabel={fieldLabel}
        iconName={iconName}
        style={{ paddingRight: 32 }}
        error={error}
        touched={touched}
        okIcon
      />
      <View style={{ position: 'absolute', width: '100%' }}>
        <Picker selectedValue='' onValueChange={handleChange}>
          {items.map(item => (
            <Picker.Item key={item} value={item} label={t(item)} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PickerField;
