import { Tolgee, DevTools } from '@tolgee/react';
import { FormatIcu } from '@tolgee/format-icu';
// FormatIcu handles complex plural rules natively — critical for Czech!
// Czech has 4 plural forms: one (1), few (2-4), many (5+), other
// e.g. "1 gól", "2 góly", "5 gólů"

export const tolgee = Tolgee()
  .use(DevTools())       // Enables Alt+click in-context editing in dev mode
  .use(FormatIcu())      // Full ICU MessageFormat: plurals, genders, selects
  .init({
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
    language: 'en',
    availableLanguages: ['en', 'fr', 'cs'],
    // Fallback static translations — work without a cloud connection
    staticData: {
      en: () => import('./locales/en.json'),
      fr: () => import('./locales/fr.json'),
      cs: () => import('./locales/cs.json'),
    },
  });
