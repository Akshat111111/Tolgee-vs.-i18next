import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FifaDashboard } from './FifaDashboard';

export function I18nextDashboardWrapper() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const handleLangChange = (code: string) => {
    setLang(code);
    i18n.changeLanguage(code);
  };

  // Wrap t() to match the shared interface: (key, params?) => string
  const translate = (key: string, params?: Record<string, unknown>) =>
    t(key, params as Record<string, string | number>) as string;

  return (
    <FifaDashboard
      t={translate}
      mode="i18next"
      lang={lang}
      onLangChange={handleLangChange}
    />
  );
}
