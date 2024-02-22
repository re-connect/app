import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useFetchSecretQuestions } from '../../hooks/BeneficiariesHooks';
import { colors } from '../../style';
import RNPickerSelect from 'react-native-picker-select';
import { useField } from 'formik';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 32,
    backgroundColor: colors.white,
    borderRadius: 48,
    height: 48,
    borderColor: colors.darkGray,
    borderWidth: 1,
    justifyContent: 'center',
  },
  icon: { position: 'absolute', top: 16, left: 16 },
});

const SecretQuestionPicker: React.FC<{ fieldName: string }> = ({ fieldName }) => {
  const { t } = useTranslation();
  const { secretQuestionList } = useFetchSecretQuestions();
  const secretQuestionsForPicker = secretQuestionList.map(item => {
    return { label: item, value: t(item) };
  });
  const [, , helpers] = useField(fieldName);

  return (
    <View style={styles.wrapper}>
      <Icon name='question' color={colors.darkGray} style={styles.icon} />
      <RNPickerSelect
        onValueChange={value => helpers.setValue(value)}
        items={secretQuestionsForPicker}
        placeholder={{ label: t('secret_question'), value: '' }}
      />
    </View>
  );
};

export default SecretQuestionPicker;
