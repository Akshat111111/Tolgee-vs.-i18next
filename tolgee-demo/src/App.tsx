import { useState, Suspense } from 'react';
import { TolgeeProvider } from '@tolgee/react';
import { I18nextProvider } from 'react-i18next';
import { tolgee } from './tolgee';
import i18n from './i18n';
import { TolgeeDashboardWrapper } from './components/TolgeeDashboardWrapper';
import { I18nextDashboardWrapper } from './components/I18nextDashboardWrapper';
import './index.css';

type Tab = 'tolgee' | 'i18next';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tolgee');

  return (
    <div className="app">
      {/* ── Mode Switcher ── */}
      <nav className="tab-nav" role="navigation" aria-label="Mode switcher">
        <div className="tab-nav-inner">
          <div className="tab-brand">
            <span className="brand-icon">🏆</span>
            <span className="brand-text">React i18n Showdown · FIFA WC 2026</span>
          </div>
          <div className="tab-buttons">
            <button
              id="tab-tolgee"
              className={`tab-btn ${activeTab === 'tolgee' ? 'tab-active tolgee-active' : ''}`}
              onClick={() => setActiveTab('tolgee')}
            >
              <span className="tab-icon">✨</span>
              Tolgee
            </button>
            <button
              id="tab-i18next"
              className={`tab-btn ${activeTab === 'i18next' ? 'tab-active i18next-active' : ''}`}
              onClick={() => setActiveTab('i18next')}
            >
              <span className="tab-icon">📦</span>
              i18next
            </button>
          </div>
        </div>
      </nav>

      {/* ── Tolgee Panel ── */}
      {activeTab === 'tolgee' && (
        <TolgeeProvider tolgee={tolgee} fallback={<LoadingScreen />}>
          <TolgeeDashboardWrapper />
        </TolgeeProvider>
      )}

      {/* ── i18next Panel ── */}
      {activeTab === 'i18next' && (
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<LoadingScreen />}>
            <I18nextDashboardWrapper />
          </Suspense>
        </I18nextProvider>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p>Loading tournament data…</p>
    </div>
  );
}

export default App;
