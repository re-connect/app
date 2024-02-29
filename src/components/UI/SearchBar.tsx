import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../style';
import Icon from './Icon';

interface Props {
  onChange: React.SetStateAction<any>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 8,
    borderRadius: 100,
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
  },
  input: { fontSize: 18 },
  leftIcon: { marginHorizontal: 8, fontSize: 20 },
});

const SearchBar: React.FC<Props> = ({ onChange }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Icon style={styles.leftIcon} color={colors.darkGray} name='magnifying-glass' />
      <TextInput
        style={styles.input}
        placeholder={t('search')}
        placeholderTextColor={colors.darkGray}
        onChangeText={text => onChange(text)}
      />
    </View>
  );
};

export default SearchBar;
