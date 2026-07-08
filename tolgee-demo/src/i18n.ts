import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'cs'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
    // NOTE: i18next plurals use _one/_other suffix by default.
    // Czech has 4 plural forms (gól/góly/gólů) but i18next without
    // the i18next-icu plugin can only handle 2 (one/other).
    // Tolgee with FormatIcu handles all 4 natively.
  });

export default i18n;
