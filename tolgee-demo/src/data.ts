export const LIVE_MATCH = {
  home: { name: 'France', flag: '🇫🇷', score: 2, color: '#003189' },
  away: { name: 'Argentina', flag: '🇦🇷', score: 1, color: '#74ACDF' },
  minute: 67,
  stage: 'live_match_title',
  venue: 'live_match_venue',
  stats: {
    possession: [62, 38],
    shots: [8, 3],
    corners: [6, 2],
    fouls: [9, 14],
  },
};

export const STATS = [
  { key: 'stat_total_goals', value: 163, icon: '⚽', subtitleKey: 'stat_goals_subtitle', subtitleCount: 163 },
  { key: 'stat_matches_played', value: 56, icon: '🏙️', subtitleKey: 'stat_matches_subtitle', subtitleCount: 56 },
  { key: 'stat_teams', value: 48, icon: '🌍', subtitleKey: 'stat_teams_subtitle', subtitleCount: 6 },
  { key: 'stat_avg_goals', value: 2.91, icon: '📊', subtitleKey: 'stat_avg_subtitle', subtitleCount: 0 },
];

export const FIXTURES = [
  {
    id: 1,
    stageKey: 'fixture_qf',
    home: { name: 'France', flag: '🇫🇷' },
    away: { name: 'Argentina', flag: '🇦🇷' },
    score: '2 – 1',
    time: '18:00',
    city: 'East Rutherford',
    stadium: 'MetLife Stadium',
    isLive: true,
    minute: 67,
  },
  {
    id: 2,
    stageKey: 'fixture_qf',
    home: { name: 'England', flag: '🇬🇧' },
    away: { name: 'Spain', flag: '🇪🇸' },
    score: '1 – 1',
    time: '21:00',
    city: 'Dallas',
    stadium: 'AT&T Stadium',
    isLive: true,
    minute: 54,
  },
  {
    id: 3,
    stageKey: 'fixture_qf',
    home: { name: 'Brazil', flag: '🇧🇷' },
    away: { name: 'Germany', flag: '🇩🇪' },
    score: null,
    time: '22:00',
    city: 'Seattle',
    stadium: 'Lumen Field',
    isLive: false,
    minute: 0,
  },
  {
    id: 4,
    stageKey: 'fixture_qf',
    home: { name: 'Portugal', flag: '🇵🇹' },
    away: { name: 'Morocco', flag: '🇲🇦' },
    score: null,
    time: '02:00',
    city: 'Los Angeles',
    stadium: 'SoFi Stadium',
    isLive: false,
    minute: 0,
  },
];

export const STANDINGS = [
  { pos: 1, team: 'France', flag: '🇫🇷', mp: 4, w: 3, d: 1, l: 0, gd: '+8', pts: 10, form: ['W','W','D','W'], qualified: true },
  { pos: 2, team: 'Argentina', flag: '🇦🇷', mp: 4, w: 3, d: 0, l: 1, gd: '+6', pts: 9, form: ['W','W','W','L'], qualified: true },
  { pos: 3, team: 'Poland', flag: '🇵🇱', mp: 4, w: 1, d: 0, l: 3, gd: '-5', pts: 3, form: ['L','W','L','L'], qualified: false },
  { pos: 4, team: 'Saudi Arabia', flag: '🇸🇦', mp: 4, w: 0, d: 1, l: 3, gd: '-9', pts: 1, form: ['L','L','D','L'], qualified: false },
];

export const SCORERS = [
  { rank: 1, name: 'Kylian Mbappe', flag: '🇫🇷', club: 'France', goals: 7, assists: 3, photo: '⚽' },
  { rank: 2, name: 'Lionel Messi', flag: '🇦🇷', club: 'Argentina', goals: 6, assists: 5, photo: '⚽' },
  { rank: 3, name: 'Harry Kane', flag: '🇬🇧', club: 'England', goals: 5, assists: 2, photo: '⚽' },
  { rank: 4, name: 'Vinicius Jr.', flag: '🇧🇷', club: 'Brazil', goals: 4, assists: 4, photo: '⚽' },
  { rank: 5, name: 'Cristiano Ronaldo', flag: '🇵🇹', club: 'Portugal', goals: 4, assists: 1, photo: '⚽' },
];

export const FEED_EVENTS = [
  { minute: 67, type: 'goal', player: 'Vinicius Jr.', club: 'Real Madrid', team: '' },
  { minute: 63, type: 'yellow', player: 'Mohammed Al-Burayk', club: 'Al-Hilal', team: '' },
  { minute: 54, type: 'sub', out: 'Bellingham', in: 'Valverde', club: '', team: '' },
  { minute: 45, type: 'ht', player: '', club: '', team: '' },
  { minute: 38, type: 'goal', player: 'Kylian Mbappé', club: 'Real Madrid', team: '' },
  { minute: 22, type: 'var', player: '', club: '', team: '' },
  { minute: 18, type: 'yellow', player: 'Carvajal', club: 'Real Madrid', team: '' },
  { minute: 1, type: 'ko', player: '', club: '', team: '' },
];
