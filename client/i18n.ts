import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files
import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import esTranslation from './locales/es.json';

// Configure i18next
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    debug: import.meta.env.DEV, // Only show debug in development
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: enTranslation,
      hi: hiTranslation,
      es: esTranslation,
    },
  });

export default i18n;