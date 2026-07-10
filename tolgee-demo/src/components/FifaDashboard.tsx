import { useState, useEffect, useCallback } from 'react';
import { LIVE_MATCH, STATS, FIXTURES, STANDINGS, SCORERS, FEED_EVENTS } from '../data';

export type DashboardMode = 'tolgee' | 'i18next';

interface DashboardProps {
  t: (key: string, params?: Record<string, unknown>) => string;
  mode: DashboardMode;
  lang: string;
  onLangChange: (lang: string) => void;
}

const LANGS = [
  { code: 'en',    label: 'English',   flag: '🇬🇧' },
  { code: 'fr',    label: 'Français',  flag: '🇫🇷' },
  { code: 'cs-CZ', label: 'Čeština',   flag: '🇨🇿' },
  { code: 'pl',    label: 'Polski',    flag: '🇵🇱' },
  { code: 'ru',    label: 'Русский',   flag: '🇷🇺' },
  { code: 'hi',    label: 'हिंदी',      flag: '🇮🇳' },
  { code: 'ar',    label: 'العربية',   flag: '🇸🇦' },
];

const NAV_ITEMS = [
  { key: 'nav_dashboard', icon: '⚽', id: 'dashboard' },
  { key: 'nav_fixtures', icon: '📅', id: 'fixtures' },
  { key: 'nav_standings', icon: '🏆', id: 'standings' },
  { key: 'nav_scorers', icon: '🥅', id: 'scorers' },
  { key: 'nav_teams', icon: '🌍', id: 'teams' },
  { key: 'nav_stats', icon: '📊', id: 'stats' },
];

export function FifaDashboard({ t, mode, lang, onLangChange }: DashboardProps) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [tick, setTick] = useState(0);
  const isTolgee = mode === 'tolgee';

  // Simulate live minute ticking
  useEffect(() => {
    const interval = setInterval(() => setTick(p => p + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const currentMinute = LIVE_MATCH.minute + Math.floor(tick / 2);

  const getFormClass = (result: string) =>
    result === 'W' ? 'form-w' : result === 'D' ? 'form-d' : 'form-l';

  const getFeedLine = useCallback((ev: typeof FEED_EVENTS[0]) => {
    switch (ev.type) {
      case 'goal': return t('feed_goal', { player: ev.player, club: ev.club });
      case 'yellow': return t('feed_yellow', { player: ev.player });
      case 'red': return t('feed_red', { player: ev.player });
      case 'sub': return t('feed_sub', { out: ev.out, in: ev.in });
      case 'var': return t('feed_var');
      case 'ko': return t('feed_ko');
      case 'ht': return t('feed_ht');
      case 'ft': return t('feed_ft');
      default: return '';
    }
  }, [t]);

  return (
    <div className="dashboard-layout" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* ── Sidebar ── */}
      <aside className="sidebar" role="navigation" aria-label="Main navigation">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🏆</span>
          <div>
            <div className="sidebar-logo-title">FIFA WC</div>
            <div className="sidebar-logo-year">2026™</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`sidebar-nav-item ${activeNav === item.id ? 'sidebar-nav-active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{t(item.key)}</span>
              {activeNav === item.id && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>

        {/* Language Switcher in sidebar */}
        <div className="sidebar-lang">
          <div className="sidebar-lang-label">{t('footer_language')}</div>
          {LANGS.map(l => (
            <button
              key={l.code}
              id={`lang-${l.code}-${mode}`}
              className={`lang-pill ${lang === l.code ? 'lang-pill-active' : ''}`}
              onClick={() => onLangChange(l.code)}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>

        <div className="sidebar-footer-badge">
          <span className={`mode-dot ${isTolgee ? 'mode-dot-tolgee' : 'mode-dot-i18next'}`} />
          {isTolgee ? 'Tolgee Mode' : 'i18next Mode'}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">{t('header_title')}</h1>
            <span className="topbar-subtitle">{t('header_subtitle')}</span>
          </div>
          <div className="topbar-right">
            <div className="live-pill">
              <span className="live-dot" />
              {t('header_live_count', { count: 2 })}
            </div>
            <input
              className="search-input"
              placeholder={t('header_search')}
              id="dashboard-search"
              aria-label="Search"
            />
          </div>
        </header>

        {/* Info Badge */}
        <div className={`info-badge ${isTolgee ? 'badge-tolgee' : 'badge-i18next'}`}>
          {isTolgee ? t('tolgee_badge') : t('i18next_badge')}
        </div>

        {/* ── Live Match Banner ── */}
        <section className="live-banner" aria-label="Live match">
          <div className="live-banner-bg" />
          <div className="live-banner-inner">
            <div className="live-banner-meta">
              <span className="live-label">{t('live_badge')}</span>
              <span className="live-stage">{t('live_match_title')}</span>
              <span className="live-venue">{t('live_match_venue')}</span>
            </div>

            <div className="scoreboard">
              <div className="team-block team-home">
                <span className="team-flag-big">{LIVE_MATCH.home.flag}</span>
                <span className="team-name">{LIVE_MATCH.home.name}</span>
              </div>
              <div className="score-center">
                <div className="score-digits">
                  {LIVE_MATCH.home.score} – {LIVE_MATCH.away.score}
                </div>
                <div className="score-minute">{t('live_minute', { minute: currentMinute })}</div>
              </div>
              <div className="team-block team-away">
                <span className="team-flag-big">{LIVE_MATCH.away.flag}</span>
                <span className="team-name">{LIVE_MATCH.away.name}</span>
              </div>
            </div>

            {/* Match stats bars */}
            <div className="match-stats-grid">
              {[
                { key: 'live_possession', values: LIVE_MATCH.stats.possession, unit: '%' },
                { key: 'live_shots', values: LIVE_MATCH.stats.shots, unit: '' },
                { key: 'live_corners', values: LIVE_MATCH.stats.corners, unit: '' },
                { key: 'live_fouls', values: LIVE_MATCH.stats.fouls, unit: '' },
              ].map(stat => (
                <div className="match-stat" key={stat.key}>
                  <span className="match-stat-val">{stat.values[0]}{stat.unit}</span>
                  <div className="match-stat-bar-wrap">
                    <div className="match-stat-label">{t(stat.key)}</div>
                    <div className="match-stat-bar">
                      <div
                        className="match-stat-fill"
                        style={{ width: `${(stat.values[0] / (stat.values[0] + stat.values[1])) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="match-stat-val away-val">{stat.values[1]}{stat.unit}</span>
                </div>
              ))}
            </div>

            <div className="live-actions">
              <button className={`live-btn-primary ${isTolgee ? '' : 'orange'}`}>{t('live_watch')}</button>
              <button className="live-btn-ghost">{t('live_stats')}</button>
            </div>
          </div>
        </section>

        {/* ── Stats Row ── */}
        <section className="stats-row" aria-label="Tournament statistics">
          {STATS.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{t(s.key)}</div>
              <div className="stat-sub">
                {s.subtitleCount > 0
                  ? t(s.subtitleKey, { count: s.subtitleCount })
                  : t(s.subtitleKey)}
              </div>
            </div>
          ))}
        </section>

        {/* ── Tournament Facts Banner ── */}
        <section className="facts-banner" aria-label="Tournament facts">
          <div className="facts-header">
            <div>
              <h2 className="facts-title">{t('facts_section_title')}</h2>
              <p className="facts-subtitle">{t('facts_section_sub')}</p>
            </div>
            <div className="facts-hosts-badge">
              <span className="facts-hosts-flags">🇺🇸 🇨🇦 🇲🇽</span>
              <span className="facts-hosts-text">{t('facts_hosts_label')}</span>
            </div>
          </div>

          {/* Fact Cards Row */}
          <div className="facts-cards">
            {/* 39 Days — the hero fact */}
            <div className={`fact-card fact-hero ${isTolgee ? '' : 'fact-hero-orange'}`}>
              <div className="fact-value">{t('facts_days_value')}</div>
              <div className="fact-label">{t('facts_days_label')}</div>
              <div className="fact-sub">{t('facts_days_sub')}</div>
              <div className="fact-record-badge">{t('facts_record_label')}</div>
              <div className="fact-record-sub">{t('facts_record_sub')}</div>
            </div>

            {/* 48 Teams */}
            <div className="fact-card">
              <div className="fact-value">{t('facts_teams_value')}</div>
              <div className="fact-label">{t('facts_teams_fact_label')}</div>
              <div className="fact-sub">{t('facts_teams_fact_sub', { count: 16 })}</div>
            </div>

            {/* 104 Matches */}
            <div className="fact-card">
              <div className="fact-value">{t('facts_matches_value')}</div>
              <div className="fact-label">{t('facts_matches_label')}</div>
              <div className="fact-sub">{t('facts_matches_sub', { count: 104 })}</div>
            </div>

            {/* 16 Cities */}
            <div className="fact-card">
              <div className="fact-value">{t('facts_cities_value')}</div>
              <div className="fact-label">{t('facts_cities_label')}</div>
              <div className="fact-sub">{t('facts_cities_sub')}</div>
            </div>

            {/* Hosts */}
            <div className="fact-card fact-hosts">
              <div className="fact-hosts-flags-big">🇺🇸 🇨🇦 🇲🇽</div>
              <div className="fact-label">{t('facts_hosts_label')}</div>
              <div className="fact-sub">{t('facts_hosts_sub')}</div>
            </div>
          </div>

          {/* Ticker */}
          <div className="facts-ticker-wrap">
            <div className="facts-ticker">
              {[1,2,3,4,5].map(n => (
                <span key={n} className="ticker-item">{t(`facts_ticker_${n}`)}</span>
              ))}
              {/* repeat for seamless loop */}
              {[1,2,3,4,5].map(n => (
                <span key={`r${n}`} className="ticker-item" aria-hidden="true">{t(`facts_ticker_${n}`)}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="bottom-grid">
          {/* Fixtures */}
          <section className="card-panel" aria-label="Today's fixtures">
            <div className="panel-header">
              <h2 className="panel-title">{t('fixtures_title')}</h2>
              <span className="panel-date">{t('fixtures_date')}</span>
            </div>
            <div className="fixtures-list">
              {FIXTURES.map(f => (
                <div className={`fixture-row ${f.isLive ? 'fixture-live' : ''}`} key={f.id}>
                  <div className="fixture-stage-badge">
                    {f.isLive && <span className="mini-live">LIVE {f.minute}'</span>}
                    {!f.isLive && <span className="fixture-time">{t('fixture_kickoff', { time: f.time })}</span>}
                  </div>
                  <div className="fixture-teams">
                    <span className="fixture-team">{f.home.flag} {f.home.name}</span>
                    <span className="fixture-score-or-vs">
                      {f.score ?? t('fixture_vs')}
                    </span>
                    <span className="fixture-team fixture-team-away">{f.away.flag} {f.away.name}</span>
                  </div>
                  <div className="fixture-meta">
                    {t('fixture_stadium', { city: f.city, stadium: f.stadium })}
                  </div>
                  <div className="fixture-actions">
                    <button className={`fixture-btn ${isTolgee ? '' : 'orange'}`}>{t('fixture_watch')}</button>
                    {!f.isLive && <button className="fixture-btn ghost">{t('fixture_reminder')}</button>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right column: Scorers + Standings + Feed */}
          <div className="right-col">
            {/* Top Scorers */}
            <section className="card-panel" aria-label="Top scorers">
              <div className="panel-header">
                <h2 className="panel-title">{t('scorers_title')}</h2>
              </div>
              <div className="scorers-list">
                {SCORERS.map(s => (
                  <div className="scorer-row" key={s.rank}>
                    <span className="scorer-rank">{t('scorers_rank', { rank: s.rank })}</span>
                    <span className="scorer-flag">{s.flag}</span>
                    <div className="scorer-info">
                      <span className="scorer-name">{s.name}</span>
                      <span className="scorer-club">{s.club}</span>
                    </div>
                    <div className="scorer-stats">
                      <span className={`scorer-goals ${isTolgee ? '' : 'orange'}`}>
                        {t('scorers_goals', { count: s.goals })}
                      </span>
                      <span className="scorer-assists">
                        {t('scorers_assists', { count: s.assists })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Match Feed */}
            <section className="card-panel" aria-label="Match events">
              <div className="panel-header">
                <h2 className="panel-title">{t('feed_title')}</h2>
                <span className="live-pill-mini">
                  <span className="live-dot" />{t('live_badge')}
                </span>
              </div>
              <div className="feed-list">
                {FEED_EVENTS.map((ev, i) => (
                  <div className={`feed-item feed-${ev.type}`} key={i}>
                    <span className="feed-minute">
                      {ev.type !== 'ht' && ev.type !== 'ft' && ev.type !== 'ko'
                        ? t('feed_minute', { minute: ev.minute })
                        : ''}
                    </span>
                    <span className="feed-text">{getFeedLine(ev)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ── Standings ── */}
        <section className="card-panel standings-panel" aria-label="Group standings">
          <div className="panel-header">
            <h2 className="panel-title">{t('standings_title')}</h2>
          </div>
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('standings_team')}</th>
                <th>{t('standings_mp')}</th>
                <th>{t('standings_w')}</th>
                <th>{t('standings_d')}</th>
                <th>{t('standings_l')}</th>
                <th>{t('standings_gd')}</th>
                <th>{t('standings_pts')}</th>
                <th>{t('standings_form')}</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map(row => (
                <tr key={row.pos} className={row.qualified ? 'row-qualified' : 'row-eliminated'}>
                  <td className="standings-pos">{row.pos}</td>
                  <td className="standings-team-cell">
                    <span>{row.flag}</span>
                    <span>{row.team}</span>
                    {row.qualified && (
                      <span className={`qual-dot ${isTolgee ? '' : 'orange-dot'}`} title={t('standings_qualified')} />
                    )}
                  </td>
                  <td>{row.mp}</td>
                  <td>{row.w}</td>
                  <td>{row.d}</td>
                  <td>{row.l}</td>
                  <td className={parseInt(row.gd) > 0 ? 'gd-pos' : 'gd-neg'}>{row.gd}</td>
                  <td className="standings-pts-cell">{row.pts}</td>
                  <td>
                    <div className="form-badges">
                      {row.form.map((r, i) => (
                        <span key={i} className={`form-badge ${getFormClass(r)}`}>{r}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="standings-legend">
            <span className={`qual-dot ${isTolgee ? '' : 'orange-dot'}`} /> {t('standings_qualified')}
            &nbsp;&nbsp;&nbsp;
            <span className="elim-dot" /> {t('standings_eliminated')}
          </div>
        </section>

        {/* ── Tolgee Advantage Panel ── */}
        <section className="advantage-panel" aria-label="Why Tolgee wins">
          <h3 className={`advantage-title ${isTolgee ? '' : 'orange-text'}`}>
            {t('tolgee_advantage_title')}
          </h3>
          <div className="advantage-grid">
            <div className="advantage-card">
              <p>{t('tolgee_advantage_plurals')}</p>
              {/* Czech plurals showcase */}
              <div className="plural-demo">
                <div className="plural-demo-title">
                  {lang === 'ar'
                    ? `Arabic Goal Count Demo (via ${isTolgee ? 'Tolgee ICU ✅' : 'i18next ⚠️'})`
                    : lang === 'pl'
                    ? `Polish Goal Count Demo (via ${isTolgee ? 'Tolgee ICU ✅' : 'i18next ⚠️'})`
                    : lang === 'ru'
                    ? `Russian Goal Count Demo (via ${isTolgee ? 'Tolgee ICU ✅' : 'i18next ⚠️'})`
                    : `Czech Goal Count Demo (via ${isTolgee ? 'Tolgee ICU ✅' : 'i18next ⚠️'})`}
                </div>
                <div className="plural-demo-grid">
                  {(lang === 'ar' ? [0, 1, 2, 5, 15, 100] : [1, 2, 3, 5, 21]).map(n => (
                    <div className="plural-demo-item" key={n}>
                      <span className="plural-num">{n}×</span>
                      <span className={`plural-word ${
                        (lang === 'cs-CZ' || lang === 'pl' || lang === 'ru' || lang === 'ar') && isTolgee
                          ? 'plural-correct'
                          : (lang === 'cs-CZ' || lang === 'pl' || lang === 'ru' || lang === 'ar')
                          ? 'plural-warn'
                          : ''
                      }`}>
                        {t('scorers_goals', { count: n })}
                      </span>
                    </div>
                  ))}
                </div>
                {lang === 'cs-CZ' && !isTolgee && (
                  <div className="plural-warning">
                    ⚠️ i18next shows "gólů" for counts 2–4. Czech needs: 1→gól, 2–4→góly, 5+→gólů. Needs i18next-icu plugin!
                  </div>
                )}
                {lang === 'cs-CZ' && isTolgee && (
                  <div className="plural-success">
                    ✅ Tolgee ICU correctly shows: 1 gól · 2 góly · 3 góly · 5 gólů · 21 gólů
                  </div>
                )}
                {lang === 'pl' && !isTolgee && (
                  <div className="plural-warning">
                    ⚠️ i18next shows "goli" for counts 2–4. Polish needs: 1→gol, 2–4→gole, 5+→goli. Missing _few key!
                  </div>
                )}
                {lang === 'pl' && isTolgee && (
                  <div className="plural-success">
                    ✅ Tolgee ICU correctly shows: 1 gol · 2 gole · 3 gole · 5 goli · 21 goli
                  </div>
                )}
                {lang === 'ru' && !isTolgee && (
                  <div className="plural-warning">
                    ⚠️ i18next shows "голов" for counts 2–4. Russian needs: 1→гол, 2–4→гола, 5+→голов. Missing _few key!
                  </div>
                )}
                {lang === 'ru' && isTolgee && (
                  <div className="plural-success">
                    ✅ Tolgee ICU correctly shows: 1 гол · 2 гола · 3 гола · 5 голов · 21 гол
                  </div>
                )}
                {lang === 'ar' && !isTolgee && (
                  <div className="plural-warning">
                    ⚠️ i18next only knows _one/_other — 4 of 6 Arabic forms are wrong! Missing: zero, two (dual هدفان), few (3–10), many (11–99).
                  </div>
                )}
                {lang === 'ar' && isTolgee && (
                  <div className="plural-success">
                    ✅ Tolgee ICU: 0→صفر أهداف · 1→هدف واحد · 2→هدفان · 5→أهداف · 15→هدفاً · 100→هدف
                  </div>
                )}
              </div>
            </div>
            <div className="advantage-card">
              <p>{t('tolgee_advantage_context')}</p>
              {isTolgee && (
                <div className="context-hint">
                  <kbd>Alt</kbd> + <kbd>Click</kbd> any text above →
                  <span className="context-dialog-preview">[ Translation editor opens ]</span>
                </div>
              )}
              {!isTolgee && (
                <div className="i18next-workflow">
                  <div className="workflow-step">1️⃣ Edit JSON file locally</div>
                  <div className="workflow-arrow">↓</div>
                  <div className="workflow-step">2️⃣ git commit + push</div>
                  <div className="workflow-arrow">↓</div>
                  <div className="workflow-step">3️⃣ CI/CD pipeline runs</div>
                  <div className="workflow-arrow">↓</div>
                  <div className="workflow-step">4️⃣ Redeploy to production</div>
                </div>
              )}
            </div>
            <div className="advantage-card">
              <p>{t('tolgee_advantage_live')}</p>
            </div>
          </div>
        </section>

        <footer className="dash-footer">
          <span>{t('footer_tournament')}</span>
          <span className="footer-sep">·</span>
          <span>{t('footer_official')}</span>
          <span className="footer-sep">·</span>
          <span>{t('footer_updated', { time: new Date().toLocaleString(lang, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) })}</span>
        </footer>
      </main>
    </div>
  );
}
