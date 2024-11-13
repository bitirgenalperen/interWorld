import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {resources} from './locales/translations';



const savedLang = localStorage.getItem('lang') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang, // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
