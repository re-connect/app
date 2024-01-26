import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import Flag from 'react-native-flags';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ArabLeagueFlag from '../../images/arab-league-flag.png';
import { colors } from '../../style';
import { Language, allLanguages } from '../../services/translation';
import { useUserLocale } from '../../hooks/UserHooks';

const styles = StyleSheet.create({
  bitmapFlag: {
    height: 20,
    top: 6,
    width: 32,
  },
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

const LanguageSwitch: React.FC = () => {
  const [open, openActions] = useBoolean(false);
  const { updateLocale, currentLanguageCode } = useUserLocale();
  const currentLanguage = allLanguages.find((language: Language) => language.code === currentLanguageCode);

  return (
    <TouchableOpacity style={styles.container} onPress={openActions.toggle}>
      <TouchableOpacity style={styles.flag} onPress={openActions.toggle}>
        {'ar' === currentLanguageCode ? (
          <Image source={ArabLeagueFlag} style={styles.bitmapFlag} />
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
                  updateLocale(code);
                  openActions.setFalse();
                }}>
                {'ar' === code ? (
                  <Image source={ArabLeagueFlag} style={styles.bitmapFlag} />
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
