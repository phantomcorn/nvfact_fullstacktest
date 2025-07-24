import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import login_en from "./locales/en/login.json"
import login_th from "./locales/th/login.json"

import dashboard_en from "./locales/en/dashboard.json"
import dashboard_th from "./locales/th/dashboard.json"

import modal_en from "./locales/en/modal.json"
import modal_th from "./locales/th/modal.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        login: login_en,
        dashboard: dashboard_en,
        modal: modal_en
      },
      th: {
        login: login_th,
        dashboard: dashboard_th,
        modal: modal_th
      }
    },
    ns: ['login','dashboard','modal'],
    defaultNS: 'login',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;