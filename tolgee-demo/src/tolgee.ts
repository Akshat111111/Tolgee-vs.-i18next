import { Tolgee, DevTools } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
// FormatIcu handles complex plural rules natively — critical for Slavic languages!
// Czech, Polish, Russian: 4 plural forms (one/few/many/other)
// Arabic: 6 plural forms (zero/one/two/few/many/other) — the CLDR maximum
// e.g. Czech: "1 gól", "2 góly", "5 gólů"
// e.g. Arabic: "هدف واحد", "هدفان", "3 أهداف", "15 هدفاً"

export const tolgee = Tolgee()
  .use(DevTools())       // Enables Alt+click in-context editing in dev mode
  .use(FormatIcu())      // Full ICU MessageFormat: plurals, genders, selects
  .init({
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
    language: 'en',
    // NOTE: Tolgee Cloud uses 'cs-CZ' as the Czech language tag
    availableLanguages: ['en', 'fr', 'cs-CZ', 'pl', 'ru', 'hi', 'ar'],
    // Fallback static translations — work without a cloud connection
    staticData: {
      en:      () => import('./locales/en.json'),
      fr:      () => import('./locales/fr.json'),
      'cs-CZ': () => import('./locales/cs-CZ.json'),
      pl:      () => import('./locales/pl.json'),
      ru:      () => import('./locales/ru.json'),
      hi:      () => import('./locales/hi.json'),
      ar:      () => import('./locales/ar.json'),
    },
  });
