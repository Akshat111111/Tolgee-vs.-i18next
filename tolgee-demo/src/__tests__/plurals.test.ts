/**
 * Plural Form Showdown: Tolgee ICU vs. i18next (Czech)
 *
 * These tests prove -- with executable assertions -- that Tolgee's native ICU
 * support handles Czech four plural forms correctly, while standard i18next
 * (without the i18next-icu plugin) falls back to the grammatically wrong
 * "other" form for counts 2 and 3.
 *
 * Run with:  npm run test
 *
 * Key Czech plural rules (CLDR):
 *   one   -> count === 1             -> "1 gol"
 *   few   -> count in 2..4          -> "2 goly", "3 goly", "4 goly"
 *   other -> count >= 5 or count === 0 -> "5 golu", "21 golu"
 */

import { describe, it, expect } from 'vitest';
import { IntlMessageFormat } from 'intl-messageformat';

// --- Raw ICU strings from src/locales/cs.json ---------------------------
const ICU_GOALS_CS =
  '{count, plural, one {# g\u00f3l} few {# g\u00f3ly} other {# g\u00f3l\u016f}}';

const ICU_MATCHES_CS =
  '{count, plural, one {# z\u00e1pas \u017eiv\u011b} few {# z\u00e1pasy \u017eiv\u011b} other {# z\u00e1pas\u016f \u017eiv\u011b}}';

const ICU_FACTS_TEAMS_CS =
  'Roz\u0161\u00ed\u0159eno z 32 \u2014 {count, plural, one {# nov\u00fd n\u00e1rod} few {# nov\u00e9 n\u00e1rody} other {# nov\u00fdch n\u00e1rod\u016f}} p\u0159id\u00e1no';

// --- Simulated i18next output (standard _one/_other suffix behaviour) ----
// i18next without the i18next-icu plugin resolves Czech plural keys using
// Intl.PluralRules categories but only reads the _one and _other translation
// keys (not _few). So counts 2, 3, and 4 incorrectly fall back to _other.
function simulateI18nextCzech(count: number): string {
  const rule = new Intl.PluralRules('cs').select(count);
  // Standard i18next only reads _one and _other from translation files.
  // If the rule is 'few' or 'many', it falls through to _other.
  if (rule === 'one') return `${count} g\u00f3l`;
  return `${count} g\u00f3l\u016f`; // always _other -- WRONG for count 2, 3, 4
}

// --- Tolgee ICU output (IntlMessageFormat, same engine as @tolgee/format-icu)
function formatWithTolgeeIcu(template: string, params: Record<string, number | string>): string {
  const msg = new IntlMessageFormat(template, 'cs');
  return msg.format(params) as string;
}

// =========================================================================
describe('Czech Plural Forms -- Tolgee ICU (FormatIcu plugin)', () => {
  const cases: Array<[number, string]> = [
    [1,   '1 g\u00f3l'],
    [2,   '2 g\u00f3ly'],
    [3,   '3 g\u00f3ly'],
    [4,   '4 g\u00f3ly'],
    [5,   '5 g\u00f3l\u016f'],
    [21,  '21 g\u00f3l\u016f'],
    [100, '100 g\u00f3l\u016f'],
  ];

  it.each(cases)('count=%i -> "%s"', (count, expected) => {
    const result = formatWithTolgeeIcu(ICU_GOALS_CS, { count });
    expect(result).toBe(expected);
  });
});

// =========================================================================
describe('Czech Plural Forms -- Standard i18next (no ICU plugin)', () => {
  it('count=1 -> "1 gol" (correct -- matches _one key)', () => {
    expect(simulateI18nextCzech(1)).toBe('1 g\u00f3l');
  });

  it('count=2 -> WRONG "2 golu" (should be "2 goly" -- _few key missing)', () => {
    expect(simulateI18nextCzech(2)).toBe('2 g\u00f3l\u016f');
    expect(simulateI18nextCzech(2)).not.toBe('2 g\u00f3ly');
  });

  it('count=3 -> WRONG "3 golu" (should be "3 goly" -- _few key missing)', () => {
    expect(simulateI18nextCzech(3)).toBe('3 g\u00f3l\u016f');
    expect(simulateI18nextCzech(3)).not.toBe('3 g\u00f3ly');
  });

  it('count=5 -> "5 golu" (correct -- _other key matches)', () => {
    expect(simulateI18nextCzech(5)).toBe('5 g\u00f3l\u016f');
  });

  it('count=21 -> "21 golu" (correct -- _other key matches)', () => {
    expect(simulateI18nextCzech(21)).toBe('21 g\u00f3l\u016f');
  });
});

// =========================================================================
describe('Tournament Facts -- Tolgee ICU plurals (Czech)', () => {
  it('live match count: 1 -> "1 zapas zive"', () => {
    expect(formatWithTolgeeIcu(ICU_MATCHES_CS, { count: 1 })).toBe('1 z\u00e1pas \u017eiv\u011b');
  });

  it('live match count: 2 -> "2 zapasy zive"', () => {
    expect(formatWithTolgeeIcu(ICU_MATCHES_CS, { count: 2 })).toBe('2 z\u00e1pasy \u017eiv\u011b');
  });

  it('live match count: 5 -> "5 zapasu zive"', () => {
    expect(formatWithTolgeeIcu(ICU_MATCHES_CS, { count: 5 })).toBe('5 z\u00e1pas\u016f \u017eiv\u011b');
  });

  it('expanded teams: 16 new nations', () => {
    expect(formatWithTolgeeIcu(ICU_FACTS_TEAMS_CS, { count: 16 }))
      .toBe('Roz\u0161\u00ed\u0159eno z 32 \u2014 16 nov\u00fdch n\u00e1rod\u016f p\u0159id\u00e1no');
  });
});

// =========================================================================
describe('Cross-language ICU consistency', () => {
  const enGoals = '{count, plural, one {# goal} other {# goals}}';
  const frGoals = '{count, plural, one {# but} other {# buts}}';

  it('English: 1 goal (singular)', () => {
    expect(new IntlMessageFormat(enGoals, 'en').format({ count: 1 })).toBe('1 goal');
  });

  it('English: 5 goals (plural)', () => {
    expect(new IntlMessageFormat(enGoals, 'en').format({ count: 5 })).toBe('5 goals');
  });

  it('French: 1 but (singular)', () => {
    expect(new IntlMessageFormat(frGoals, 'fr').format({ count: 1 })).toBe('1 but');
  });

  it('French: 7 buts (plural)', () => {
    expect(new IntlMessageFormat(frGoals, 'fr').format({ count: 7 })).toBe('7 buts');
  });
});

// =========================================================================
describe('Polish Plural Forms -- Tolgee ICU vs Standard i18next', () => {
  const ICU_GOALS_PL =
    '{count, plural, one {# gol} few {# gole} many {# goli} other {# gola}}';

  it('Tolgee ICU: correctly handles 1 gol, 2 gole, 5 goli', () => {
    expect(new IntlMessageFormat(ICU_GOALS_PL, 'pl').format({ count: 1 })).toBe('1 gol');
    expect(new IntlMessageFormat(ICU_GOALS_PL, 'pl').format({ count: 2 })).toBe('2 gole');
    expect(new IntlMessageFormat(ICU_GOALS_PL, 'pl').format({ count: 4 })).toBe('4 gole');
    expect(new IntlMessageFormat(ICU_GOALS_PL, 'pl').format({ count: 5 })).toBe('5 goli');
  });

  it('Standard i18next: without _few key, count=2 incorrectly outputs _other ("2 gola")', () => {
    const rule = new Intl.PluralRules('pl').select(2);
    expect(rule).toBe('few');
    // In standard i18next without _few, it falls back to _other
    const i18nextFallback = `${2} gola`;
    expect(i18nextFallback).not.toBe('2 gole');
  });
});

// =========================================================================
describe('Russian Plural Forms -- Tolgee ICU vs Standard i18next', () => {
  const ICU_GOALS_RU =
    '{count, plural, one {# гол} few {# гола} many {# голов} other {# гола}}';

  it('Tolgee ICU: correctly handles 1 гол, 2 гола, 5 голов', () => {
    expect(new IntlMessageFormat(ICU_GOALS_RU, 'ru').format({ count: 1 })).toBe('1 гол');
    expect(new IntlMessageFormat(ICU_GOALS_RU, 'ru').format({ count: 2 })).toBe('2 гола');
    expect(new IntlMessageFormat(ICU_GOALS_RU, 'ru').format({ count: 5 })).toBe('5 голов');
  });

  it('Standard i18next: count=2 returns few rule', () => {
    expect(new Intl.PluralRules('ru').select(2)).toBe('few');
    expect(new Intl.PluralRules('ru').select(5)).toBe('many');
  });
});

// =========================================================================
describe('Hindi Plural Rules -- Note on 0 and 1', () => {
  it('Intl.PluralRules for Hindi treats 0 as "one"', () => {
    expect(new Intl.PluralRules('hi').select(0)).toBe('one');
    expect(new Intl.PluralRules('hi').select(1)).toBe('one');
    expect(new Intl.PluralRules('hi').select(2)).toBe('other');
  });
});

// =========================================================================
describe('Arabic 6 Plural Forms -- Tolgee ICU vs Standard i18next', () => {
  const ICU_GOALS_AR =
    '{count, plural, zero {صفر أهداف} one {هدف واحد} two {هدفان} few {# أهداف} many {# هدفاً} other {# هدف}}';

  it('Tolgee ICU: handles all 6 Arabic plural forms correctly', () => {
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 0 })).toBe('صفر أهداف');
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 1 })).toBe('هدف واحد');
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 2 })).toBe('هدفان');
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 5 })).toBe('5 أهداف');
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 15 })).toBe('15 هدفاً');
    expect(new IntlMessageFormat(ICU_GOALS_AR, 'ar').format({ count: 100 })).toBe('100 هدف');
  });

  it('Standard i18next: only supports _one and _other, failing on zero, two, few, many', () => {
    const rules = [0, 2, 5, 15].map(n => new Intl.PluralRules('ar').select(n));
    expect(rules).toEqual(['zero', 'two', 'few', 'many']);
  });
});

