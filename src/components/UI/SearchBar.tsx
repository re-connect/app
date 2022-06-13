import { Input, View } from 'native-base';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../style';

interface Props {
  onChange: React.SetStateAction<any>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 8,
    borderRadius: 100,
  }, 
  leftIcon: {
    marginLeft: 8,
    fontSize: 20 
  }
});

const SearchBar: React.FC<Props> = ({ onChange }) => {
  const { t } = useTranslation();

  return(
    <View style={styles.container}>
      <Input
        placeholder={t('search')}
        placeholderTextColor={colors.darkGray}
        onChangeText={(text) => onChange(text)}
        leftElement={<Icon style={styles.leftIcon} color={colors.darkGray} name="search" />}
        variant="rounded"
        isFullWidth
        size="xl"
        h="48px"
      />
    </View>
  );
}

export default SearchBar;
