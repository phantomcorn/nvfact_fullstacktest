import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import login_en from "./locales/en/login.json"
import login_th from "./locales/th/login.json"


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        login: login_en
      },
      th: {
        login: login_th
      }
    },
    ns: ['login','dashboard'],
    defaultNS: 'login',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;