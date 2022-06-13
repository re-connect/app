import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'native-base';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore
import Flag from 'react-native-flags';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ArabLeagueFlag from '../../images/arab-league-flag.png';
import { colors } from '../../style';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  flag: {
    height: 32,
    marginLeft: 4,
    marginRight: 4,
    flexDirection: 'row',
  },
  languageCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 100,
  },
  languageCode: {
    color: colors.darkGray,
    textAlign: 'center',
  },
});

interface Language {
  code: string;
  flag: string;
  name: string;
}

const allLanguages: Language[] = [
  { code: 'fr', flag: 'FR', name: 'Français' },
  { code: 'gb', flag: 'GB', name: 'English' },
  { code: 'es', flag: 'ES', name: 'Español' },
  { code: 'ar', flag: 'AR', name: 'عرب' },
  { code: 'ro', flag: 'RO', name: 'Română' },
  { code: 'ru', flag: 'RU', name: 'русский' },
  { code: 'de', flag: 'DE', name: 'Deutsch' },
  { code: 'ua', flag: 'UA', name: 'український' },
  { code: 'pt', flag: 'PT', name: 'Português' },
  { code: 'al', flag: 'AL', name: 'shqiptare' },
  { code: 'it', flag: 'IT', name: 'Italiano' },
  { code: 'ps', flag: 'AF', name: 'پښتو' },
  { code: 'prs', flag: 'AF', name: 'دری' },
];

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, openActions] = useBoolean(false);
  const [currentLanguageCode, setCurrentLanguageCode] = React.useState<string>('fr');
  AsyncStorage.getItem('lastLanguage').then((lastLanguage: string | null): void => {
    setCurrentLanguageCode(lastLanguage !== null ? lastLanguage : 'fr');
  });
  const currentLanguage = allLanguages.find((language: Language) => language.code === currentLanguageCode);

  return (
    <TouchableOpacity style={styles.container} onPress={openActions.toggle}>
      <TouchableOpacity style={styles.flag} onPress={openActions.toggle}>
        {'ar' === currentLanguageCode ? (
          <Image source={ArabLeagueFlag} style={{ top: 6, height: 20, width: 32 }} />
        ) : (
          <Flag type='flat' code={currentLanguage?.flag} size={32} />
        )}
        <View style={styles.languageCodeContainer}>
          <Text style={styles.languageCode}>{currentLanguage?.name}</Text>
          <Icon name={`chevron-${open ? 'up' : 'down'}`} color={colors.darkGray} size={16}></Icon>
        </View>
      </TouchableOpacity>
      {!open ? null : (
        <View>
          {allLanguages.map(({ code, flag, name }: Language) => {
            if (code === currentLanguageCode) return null;

            return (
              <TouchableOpacity
                key={code}
                style={styles.flag}
                onPress={() => {
                  AsyncStorage.setItem('lastLanguage', code);
                  i18n.changeLanguage(code);
                  setCurrentLanguageCode(code);
                  openActions.setFalse();
                }}
              >
                {'ar' === code ? (
                  <Image source={ArabLeagueFlag} style={{ top: 6, height: 20, width: 32 }} />
                ) : (
                  <Flag type='flat' code={flag} size={32} />
                )}
                <View style={styles.languageCodeContainer}>
                  <Text style={styles.languageCode}>{name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LanguageSwitch;
