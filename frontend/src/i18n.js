import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import login_en from "./locales/en/login.json"
import login_th from "./locales/th/login.json"

import dashboard_en from "./locales/en/dashboard.json"
import dashboard_th from "./locales/th/dashboard.json"

import manage_users_page_en from "./locales/en/manage_users_page.json"
import manage_users_page_th from "./locales/th/manage_users_page.json"

import modal_en from "./locales/en/modal.json"
import modal_th from "./locales/th/modal.json"

import navbar_en from "./locales/en/navbar.json"
import navbar_th from "./locales/th/navbar.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        login: login_en,
        dashboard: dashboard_en,
        modal: modal_en,
        manage_users_page: manage_users_page_en,
        navbar: navbar_en
      },
      th: {
        login: login_th,
        dashboard: dashboard_th,
        modal: modal_th,
        manage_users_page: manage_users_page_th,
        navbar: navbar_th
      }
    },
    ns: ['login', 'dashboard', 'manage_users_page', 'modal', 'navbar'],
    defaultNS: 'login',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;