<div align="center">

# React i18n Showdown: Tolgee vs. i18next
### A Developer-First, Code-Driven Comparison — FIFA World Cup 2026™ Dashboard (7 Languages)

![Tolgee](https://img.shields.io/badge/Tolgee-SDK_v7-6c63ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite)
![Tests](https://img.shields.io/badge/Tests-27%20passing-22c55e?style=for-the-badge&logo=vitest)
![Open Source](https://img.shields.io/badge/Tolgee-Open_Source-22c55e?style=for-the-badge&logo=github)

</div>

---

> **TL;DR** — We built the same production-grade multilingual dashboard twice: once with **i18next** (the industry standard), once with **Tolgee** (the modern open-source challenger with native ICU MessageFormat). We localized it into **7 languages across 4 writing systems** (`en`, `fr`, `cs-CZ`, `pl`, `ru`, `hi`, `ar`). Complex Slavic 4-form plurals (`one`/`few`/`many`/`other`) and Arabic 6-form plurals (`zero`/`one`/`two`/`few`/`many`/`other`) broke standard i18next silently. Tolgee handled all 7 languages natively with zero extra config.

---

## 📸 Live Application Screenshots

### 1. Full 7-Language FIFA World Cup 2026™ Dashboard
*Featuring instant language switching across English, French, Czech, Polish, Russian, Hindi, and Arabic.*

![FIFA World Cup 2026 Dashboard](./images/incontext_editing_dashboard.png)

---

### 2. Live In-Context Editing Overlay (`Alt + Click`)
*Translators and developers hold `Alt` and click any string on the page to open the live Tolgee editor dialog connected to Tolgee Cloud. All 6 Arabic plural forms and 4 Czech plural forms are editable directly in context.*

![Tolgee In-Context Editing Dialog](./images/in_context_editing_hd.png)

---

### 3. Multi-Language Plural Showdown & Language Selection
*Interactive plural demonstration card comparing Tolgee ICU vs. standard i18next across all CLDR plural categories.*

![Plural Showdown & Language Selection](./images/incontext_editing%205.png)

---

## 📖 Read the Full Technical Comparison
Read our complete developer blog post with code diffs, architecture diagrams, and test suite breakdowns:
👉 **[Read blog_post.md](./blog_post.md)**

---

## 🌐 7 Supported Languages & Plural Rule Families

| Language | Code | Script | CLDR Plural Forms | Key Technical Comparison |
|---|---|---|---|---|
| **English** | `en` | Latin | `one` / `other` (2 forms) | Both engines render cleanly |
| **French** | `fr` | Latin | `one` / `other` (2 forms) | Both engines render cleanly |
| **Czech** | `cs-CZ` | Latin + Diacritics | `one` / `few` / `many` / `other` (4 forms) | Standard i18next outputs `gólů` for counts 2–4 instead of `góly`. Tolgee ICU renders all 4 correctly. |
| **Polish** | `pl` | Latin + Diacritics | `one` / `few` / `many` / `other` (4 forms) | Standard i18next outputs `goli` for counts 2–4 instead of `gole`. |
| **Russian** | `ru` | Cyrillic | `one` / `few` / `many` / `other` (4 forms) | First Cyrillic script in demo. Standard i18next outputs `голов` for count 2 instead of `гола`. |
| **Hindi** | `hi` | Devanagari | `one` / `other` (2 forms) | Demonstrates non-Latin script and CLDR rule where `0` uses `one`. |
| **Arabic** | `ar` | Arabic (RTL) | `zero` / `one` / `two` / `few` / `many` / `other` (**6 forms**) | **CLDR Maximum.** Standard i18next fails on 4 of 6 plural forms. Tolgee ICU handles all 6 natively + Right-To-Left (`dir="rtl"`) layout. |

---

## 🚀 Running the Project Locally

```bash
cd tolgee-demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Run the 27 Automated Plural Tests
```bash
cd tolgee-demo
npm test
```

All 27 unit tests pass, verifying CLDR plural category resolution across all supported locales.
