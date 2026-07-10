import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    // Using 'cs' here (not 'cs-CZ') because i18next loads files from
    // public/locales/cs/translation.json — the folder is named 'cs'.
    // The FifaDashboard maps 'cs-CZ' (Tolgee) ↔ 'cs' (i18next) via onLangChange.
    supportedLngs: ['en', 'fr', 'cs', 'pl', 'ru', 'hi', 'ar'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
    // NOTE: i18next plurals use _one/_other suffix by default (Intl.PluralRules).
    // Czech, Polish, Russian each have 4 plural forms (one/few/many/other).
    // i18next without i18next-icu only resolves _one and _other —
    // the _few and _many keys silently fall back to _other (wrong output).
    // Arabic has 6 forms — i18next gets 4 of 6 wrong without i18next-icu.
    // Tolgee with FormatIcu handles all forms natively.
  });

export default i18n;
