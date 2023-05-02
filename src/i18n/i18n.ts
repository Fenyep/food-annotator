import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


i18next
//i18n-http-backend
.use(Backend)
// detect user language
.use(LanguageDetector)
// pass the i18n instance to react-i18next
.use(initReactI18next)
// init i18next
.init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
});