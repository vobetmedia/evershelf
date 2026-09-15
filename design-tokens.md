# EverShelf design tokens

Extracted from the live realself.com homepage on 2026-09-15 (computed styles via browser
devtools), then re-mapped: every pink/rose accent becomes dark green, RealSelf's proprietary
fonts become open Google Fonts with the same shape. Tokens live in `src/app/globals.css`
under `@theme` (Tailwind v4) — never hardcode colors in components.

## What RealSelf actually uses (reference)

| Token | RealSelf value | Notes |
|---|---|---|
| Heading font | `abc-gravity-condensed` 900, uppercase | ABC Dinamo, proprietary |
| Body font | `abc-rom` 400/700 | ABC Dinamo, proprietary |
| Accent (rose) | `#BB6668` — hsl(359 38% 57%) | star ratings, rating text, newsletter block bg |
| Accent (promo pink) | `#EE94B0` — hsl(341 73% 76%) | decorative headline on hero |
| Accent (block-page coral) | `#F2837E` | logo dot / banner on their bot-wall page |
| Ink / paper | `#000000` / `#FFFFFF` | |
| Mist (surface gray) | `#E2E6E7` | search input bg, review card bg, input borders |
| Cream | `#FEF9EB` | alt review card bg |
| Clay | `#BE8871` | alt review card bg |
| Gray 300 / 400 / 600 | `#CCCCCC` / `#BDBDBD` / `#717171` | dividers, disabled btn, muted text |
| Header | 62px tall, sticky, white, no border, z 240, 48px side padding | |
| Nav links | 14px / 700 / uppercase / black | |
| Container | max-width 1344px, 48px gutter desktop | |
| Search | 74px tall, mist bg, 18px text, square, black icon button | |
| Category tiles | 200px tall, square, dark image overlay, white condensed title | |
| Section title (large) | 74px / 70px line-height, 900, centered | `IS IT WORTH IT?` |
| Section title (small) | 28px / 26px, 900 | `FEATURED PROVIDERS` |
| Subtitle / caption | 17px / 24px body | |
| Worth It badge | 105px black circle, 32px condensed % + 10px bold label | |
| Tile title | 36px condensed on image, bottom-left | |
| Buttons | 54px tall, 14px 700 uppercase, 0px radius, 0.8px border. Primary: black bg/white text. Secondary: transparent, black border | |
| Review card | 410×540, padding 31/40/20, tinted bg, big quote glyph, condensed uppercase quote | |
| Newsletter block | rose bg, padding 75/46/46, 42px white title, 60px input, 62px button | |
| Footer | black bg, 60px top / 20px bottom padding, 26px condensed column titles, 17px white links | |

## EverShelf token set

### Colors

| Token | Value | HSL | Replaces | Contrast |
|---|---|---|---|---|
| `accent` | `#2D6A4F` | 153 40% 30% | `#BB6668` on solid fills (buttons, badges, newsletter) | white on it 6.39:1 (AA) |
| `accent-dark` | `#1B4332` | 155 43% 18% | hover / pressed state | white on it 11.08:1 |
| `accent-mid` | `#40916C` | 153 39% 41% | `#BB6668` where it was *text/icons* on white (stars) — same lightness role | 3.83:1 on white (large text / icons only) |
| `accent-soft` | `#74C69D` | 150 42% 62% | `#EE94B0` decorative headline pink — dark backgrounds only | 10.3:1 on black |
| `accent-tint` | `#E8F1EC` | 147 24% 93% | light tint behind badges / review cards | accent text on it 5.55:1 (AA) |
| `sage` | `#D8E8DD` | — | `#BE8871` clay review-card bg | |
| `ink` | `#000000` | | | |
| `paper` | `#FFFFFF` | | | |
| `mist` | `#E2E6E7` | | unchanged | |
| `cream` | `#FEF9EB` | | unchanged | |
| `gray-300/400/600` | `#CCCCCC` / `#BDBDBD` / `#717171` | | unchanged | |

Saturation stays in the ~40% band the rose accent used; lightness drops from 57% → 30% for the
base because the spec asks for a *dark* green and because RealSelf's rose only hit 4.03:1
against white (fails AA for body text) — the darker green fixes that.

### Type

| Role | Font | Fallback | Settings |
|---|---|---|---|
| Display / headings | Archivo (variable, `wdth` axis) | Impact, Arial Narrow, sans-serif | weight 900, `font-stretch: 75%`, uppercase, line-height 0.95 |
| Body / UI | Inter | Helvetica Neue, Arial, sans-serif | 400 / 700, 17px / 24px base |

Archivo at 75% width and 900 weight is the closest open match to ABC Gravity Condensed;
Inter stands in for ABC Rom.

### Type scale (desktop → mobile)

`display-xl` 74/70 → 42/40 · `display-lg` 42/44 → 32/32 · `display-md` 36/34 → 28/26 ·
`display-sm` 28/26 → 22/22 · `display-xs` 22/22 · body 17/24 · small 14/20 · micro 12/16 · nav 14/700.

### Spacing / layout

Container 1344px, gutters 16px (mobile) / 24px (tablet) / 48px (desktop). Section rhythm 64px
mobile / 96px desktop. Header 62px sticky. Radius: 0 everywhere except circular badges/avatars.
Buttons 54px tall. Inputs 60px tall.

## Pink audit

`grep -riE "#(bb6668|ee94b0|f2837e)|pink|rose|magenta|fuchsia" src` must return nothing
outside this doc. All accent usage goes through `bg-accent`, `text-accent`, `border-accent`,
`ring-accent`, etc.

## Swapping in the licensed fonts

RealSelf's wordmark and headings are **ABC Gravity Condensed** (ABC Dinamo) and body is **ABC Rom**.
Both are commercial; buy a web license from abcdinamo.com, then:

1. Drop `ABCGravityCondensed-Black.woff2` (and `ABCRom-Regular/Bold.woff2`) into `src/fonts/`.
2. In `src/app/layout.tsx` replace the `Archivo(...)` / `Inter(...)` calls with `localFont({ src: ..., variable: "--font-archivo" })` and `--font-inter`.
3. In `src/app/globals.css` set `--display-stretch: 100%` (Gravity is already condensed; Archivo needs the 75% squeeze).

Nothing else changes — every component reads the tokens.

## Swapping in the licensed fonts

RealSelf's wordmark and headings are **ABC Gravity Condensed** (ABC Dinamo) and body is **ABC Rom**.
Both are commercial; buy a web license from abcdinamo.com, then:

1. Drop `ABCGravityCondensed-Black.woff2` (and `ABCRom-Regular/Bold.woff2`) into `src/fonts/`.
2. In `src/app/layout.tsx` replace the `Archivo(...)` / `Inter(...)` calls with `localFont({ src: ..., variable: "--font-archivo" })` and `--font-inter`.
3. In `src/app/globals.css` set `--display-stretch: 100%` (Gravity is already condensed; Archivo needs the 75% squeeze).

Nothing else changes — every component reads the tokens.
