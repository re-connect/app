import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../style';
import TranslatedText from '../UI/Text';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 },
  chip: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 4,
    margin: 2,
  },
  validCriterion: { backgroundColor: colors.green },
  invalidCriterion: { backgroundColor: colors.red },
  hint: {
    borderRadius: 16,
    backgroundColor: colors.white,
    color: colors.black,
    paddingHorizontal: 4,
    marginRight: 4,
  },
  validPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderColor: colors.white,
    borderWidth: 1,
    padding: 8,
    borderRadius: 16,
    paddingHorizontal: 32,
  },
  validPasswordText: { color: colors.white, fontSize: 18, marginLeft: 8 },
});

interface Props {
  password: string;
}

const criteria = [
  { name: 'lowercase', test: /.*[a-z].*/, getHint: () => 'a' },
  { name: 'uppercase', test: /.*[A-Z].*/, getHint: () => 'A' },
  { name: 'special_number', test: /.*[^A-Za-z].*/, getHint: () => '$' },
  { name: 'length', test: /.{9,}/, getHint: (length: number) => `${length}/9` },
];

const isPasswordValid = (password: string) => criteria.every(criteria => criteria.test.test(password));

const PasswordValidityWidget: React.FC<Props> = ({ password }) => (
  <View style={styles.container}>
    {isPasswordValid(password) ? (
      <View style={styles.validPasswordContainer}>
        <Icon name="lock" color={colors.white} size={16} />
        <TranslatedText style={styles.validPasswordText}>strong_password</TranslatedText>
      </View>
    ) : (
      <>
        {criteria.map(({ name, test, getHint }) => (
          <View key={name} style={[styles.chip, test.test(password) ? styles.validCriterion : styles.invalidCriterion]}>
            <View style={styles.hint}>
              <Text>{getHint(password.length)}</Text>
            </View>
            <TranslatedText style={{ color: colors.white }}>{name}</TranslatedText>
          </View>
        ))}
      </>
    )}
  </View>
);
export default PasswordValidityWidget;
