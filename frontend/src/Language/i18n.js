// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json'; 
import translationBE from './locales/be.json'; 
import translationHI from './locales/hi.json'; 
import translationKA from './locales/ka.json'; 
import translationPU from './locales/pu.json'; 
import translationTA from './locales/ta.json'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      be: {
        translation:translationBE,
      },
      hi: {
        translation:translationHI,
      },
      ka: {
        translation:translationKA,
      },
      pu: {
        translation:translationPU,
      },
      ta: {
        translation:translationTA,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes the output
    },
  });

export default i18n;
