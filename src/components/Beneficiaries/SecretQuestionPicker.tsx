import { Select } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFetchSecretQuestions } from '../../hooks/BeneficiariesHooks';
import { colors } from '../../style';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    backgroundColor: colors.white,
    borderRadius: 48,
    height: 48,
    borderColor: colors.darkGray,
    borderWidth: 1,
  },
});

interface Props {
  value?: string;
  onChange: (itemValue: string) => void;
}

const SecretQuestionPicker: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const { secretQuestionList } = useFetchSecretQuestions();

  return (
    <View style={styles.wrapper}>
      <Icon name='question' color={colors.darkGray} />
      <Select
        selectedValue={value}
        minWidth='200'
        borderWidth='0'
        color={colors.darkGray}
        placeholderTextColor={colors.darkGray}
        accessibilityLabel={t('secret_question_required')}
        placeholder={t('secret_question_required')}
        variant='outline'
        _selectedItem={{ endIcon: <Icon name='check' color={colors.green} /> }}
        dropdownCloseIcon={<Icon name='chevron-down' color={colors.darkGray} style={{ marginRight: 20 }} />}
        dropdownOpenIcon={<Icon name='chevron-up' color={colors.darkGray} style={{ marginRight: 20 }} />}
        onValueChange={onChange}>
        {secretQuestionList.map(label => (
          <Select.Item key={label} label={label} value={label} />
        ))}
      </Select>
    </View>
  );
};

export default SecretQuestionPicker;
