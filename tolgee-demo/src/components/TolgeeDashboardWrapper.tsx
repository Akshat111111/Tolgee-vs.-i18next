import { useState } from 'react';
import { useTranslate, useTolgee } from '@tolgee/react';
import { FifaDashboard } from './FifaDashboard';

export function TolgeeDashboardWrapper() {
  const { t } = useTranslate();
  const tolgee = useTolgee(['language']);
  const [lang, setLang] = useState('en');

  const handleLangChange = (code: string) => {
    setLang(code);
    tolgee.changeLanguage(code);
  };

  // Wrap t() to match the shared interface: (key, params?) => string
  const translate = (key: string, params?: Record<string, unknown>) =>
    t(key, params as Record<string, string | number>) as string;

  return (
    <FifaDashboard
      t={translate}
      mode="tolgee"
      lang={lang}
      onLangChange={handleLangChange}
    />
  );
}
