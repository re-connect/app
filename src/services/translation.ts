import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import al from '../translations/al';
import ar from '../translations/ar';
import de from '../translations/de';
import es from '../translations/es';
import fr from '../translations/fr';
import gb from '../translations/gb';
import it from '../translations/it';
import prs from '../translations/prs';
import ps from '../translations/ps';
import pt from '../translations/pt';
import ro from '../translations/ro';
import ru from '../translations/ru';
import ua from '../translations/ua';
import et from '../translations/et';

export interface Language {
  code: string;
  flag: string;
  name: string;
}

const resources = {
  fr: { translation: fr },
  gb: { translation: gb },
  es: { translation: es },
  ar: { translation: ar },
  it: { translation: it },
  de: { translation: de },
  ru: { translation: ru },
  ro: { translation: ro },
  ps: { translation: ps },
  al: { translation: al },
  pt: { translation: pt },
  ua: { translation: ua },
  prs: { translation: prs },
  et: { translation: et },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    initImmediate: true,
    resources,
    lng: 'gb',
    keySeparator: false,
    fallbackLng: 'gb',
    interpolation: {
      escapeValue: false,
    },
  });

export const allLanguages: Language[] = [
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
  { code: 'et', flag: 'ET', name: 'ትግርኛ' },
];

export default i18n;
