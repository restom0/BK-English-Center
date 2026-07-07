# Client — BK English Center

Static frontend: plain HTML pages, compiled SCSS, and Vanilla JS. Served by nginx in production.

---

## Directory structure

```
client/
├── styles/                  # SCSS source — single compilation entry point
│   ├── main.scss            # Entry: @use all partials
│   ├── main.css             # Compiled output (committed, served by nginx)
│   ├── _variables.scss      # Design tokens (colours, spacing, fonts)
│   ├── _base.scss           # Resets, typography, layout utilities, footer
│   ├── _components.scss     # Shared UI components (cards, buttons, nav…)
│   ├── _mobile.scss         # Global responsive overrides
│   └── pages/
│       ├── _index.scss      # Barrel — @use all page partials
│       ├── _home.scss
│       ├── _courses.scss
│       ├── _courses-detail.scss
│       ├── _my-courses.scss
│       ├── _my-page.scss
│       └── _contact.scss
│
├── i18n/                    # Internationalisation
│   ├── labels.js            # Master bundle (7 languages, IIFE)
│   └── features/            # Feature-split i18n files
│       ├── auth.js
│       ├── navigation.js
│       └── …
│
├── components/              # Shared HTML snippets (navigation, etc.)
├── utils/                   # Shared JS utilities
├── img/                     # Static images
│
├── HomePage/
├── CoursesPage/
├── CoursesPageDetail/
├── MyCourses/
├── MyPage/
├── ContactPage/
├── Loginpage/               # Login, Signup, ForgotPass, ChooseActor
├── Adminpage/
├── Staffpage/
├── Attendstaffpage / Attendstupage / Attendteapage
├── Fileteapage / Infostaffpage / Infostupage / Infoteapage
├── Markstupage / Paystaffpage / Paystupage / Payteapage
├── Rateteapage / Stataccesspage / Statclasspage / Statfinancialpage
└── manageCoursePage/
```

---

## SCSS workflow

Every page links only `styles/main.css` — never individual CSS files. All styles live in the SCSS source tree.

### Adding styles for a new page

1. Create `styles/pages/_mypage.scss`:
   ```scss
   @use '../variables' as *;

   .my-page { … }
   ```
2. Add `@use 'mypage';` to `styles/pages/_index.scss`.
3. Run `npm run build:css` (or `watch:css` while developing).
4. In the HTML, add only `<link rel="stylesheet" href="../styles/main.css">` — nothing else.

### Public pages (Bootstrap fixed navbar)

Pages that use the public navigation bar must add `has-public-nav` to `<body>`:

```html
<body class="has-public-nav">
```

This class adds a responsive `margin-top` (100 px / 200 px / 300 px at sm/md breakpoints) defined in `_base.scss` so content isn't hidden under the fixed navbar.

---

## npm scripts

| Script             | What it does                                        |
|--------------------|-----------------------------------------------------|
| `build:css`        | Compile SCSS → minified `main.css` (production)     |
| `build:css:dev`    | Compile SCSS → expanded `main.css` (readable)       |
| `watch:css`        | Watch + recompile on save (development)             |
| `lint:css`         | Dry-run SCSS compilation (CI check)                 |

```bash
npm install
npm run watch:css   # development
npm run build:css   # before committing
```

---

## Internationalisation (i18n)

Supported languages: **vi · en · zh · ja · ko · fr · de**

All translatable strings use `data-i18n="key"` attributes. The `i18n/labels.js` bundle auto-applies them on page load based on `localStorage.lang` (defaults to `'vi'`).

Feature-split files in `i18n/features/` mirror the same key namespace — they are standalone and can be loaded on specific pages that need only a subset of strings.

To add a new key:

1. Add it to every language object in `i18n/labels.js`.
2. Mirror it in the relevant `i18n/features/` file if one exists.
3. Use `data-i18n="your.key"` in the HTML element.

---

## Adding a new page

1. Create a folder `client/MyNewPage/` with `myNewPage.html`.
2. Link `../styles/main.css` (and optionally `../i18n/labels.js`).
3. Add `class="has-public-nav"` to `<body>` if it uses the public nav.
4. Add page-specific SCSS to `styles/pages/_mynewpage.scss` and register it in `_index.scss`.
5. Link `../Navigation/navigation.js` if the shared nav component is used.
