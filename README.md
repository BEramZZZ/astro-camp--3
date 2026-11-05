# AstroX Camp 3

Official website of **AstroX Camp 3**, an astronomy and tech event organized by **Astrotech** at the École Nationale Supérieure d'Informatique (ESI), Oued Smar, Algiers.

The site presents the event (about, agenda, conferences and workshops) and lets visitors register for sessions through a validated form that saves to a Google Sheet.

**Live site:** <https://astro-camp-3.vercel.app/>

> Built for the Astrotech club integration program (Dev track).

---

## Features

- **Landing page**: hero, about, agenda, conferences and workshops, call-to-action banner and footer
- **Registration modal**: opens from every "Register" button; agenda buttons pre-select their session (`#register:<session-id>`)
- **Form validation**: full name, email, optional phone, status/university, at least one session
- **Duplicate protection**: an email that is already registered shows "already registered" under the Email field and no new row is added (email is trimmed and lowercased before comparing)
- **Spam protection**: hidden honeypot field plus a shared secret between the API and the Sheet script
- **Google Sheets backend**: registrations are appended to a Sheet through a Google Apps Script web app
- **Space-themed design**: liquid-glass cards and buttons, star clusters, sparkles, nebula footer
- **Custom 404 page**: "Lost in space" with a *Return to base* button
- **Responsive layout** for phone, tablet and desktop

## Tech stack

| Area | Tool |
|---|---|
| Framework | Next.js (App Router) + React |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (theme tokens in `globals.css`) |
| Icons | `react-icons` (Font Awesome 6) |
| Fonts | `next/font/google` (Exo 2 for headings, Inter for body) |
| Images | `next/image` |
| Backend | Next.js route handler + Google Apps Script |

## Getting started

### Prerequisites

- Node.js 18.18 or newer
- npm

### Install and run

```bash
git clone <repository-url>
cd astro-camp-3
npm install
npm run dev
```

Open <http://localhost:3000>.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the code
```

## Environment variables

Create a file named exactly `.env.local` in the project root:

```dotenv
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/<deployment-id>/exec
SHEETS_SECRET=<a-long-random-string>
```

| Variable | Purpose |
|---|---|
| `SHEETS_WEBHOOK_URL` | The **Web app URL** of the deployed Apps Script (ends in `/exec`) |
| `SHEETS_SECRET` | Shared secret. Must be identical in `.env.local` and in the Apps Script |

Notes:

- Without `SHEETS_WEBHOOK_URL`, registrations are only printed in the terminal (`REGISTRATION { ... }`). Nothing is saved. This is the dev fallback.
- Restart `npm run dev` after changing `.env.local`.
- Never commit `.env.local`. It is already ignored by Git in a default Next.js project.

## Setting up the registration Sheet

1. Create a Google Sheet. In row 1, put these headers in this exact order (email must stay in column C):

   ```
   date | fullName | email | phone | status | university | sessions
   ```

2. Open **Extensions → Apps Script** and paste the script (`doPost` function). It must:
   - compare `secret` with its own `SECRET` constant,
   - read column C to detect an existing email and return `{ "status": "duplicate" }`,
   - otherwise append the row and return `{ "status": "ok" }`,
   - use `LockService` so two simultaneous submissions cannot both pass the duplicate check.
3. Deploy it: **Deploy → New deployment → Web app**
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Copy the `/exec` URL into `SHEETS_WEBHOOK_URL`.
5. After any later edit to the script, deploy a **new version**. Saving the code alone does not update the live deployment.

### API contract

`POST /api/register`

| Status | Meaning |
|---|---|
| `200` | Registered (also returned silently for honeypot hits) |
| `409` | Email already registered |
| `422` | Validation failed |
| `400` | Invalid JSON body |
| `502` | The Sheet could not be reached or replied with an error |

### Troubleshooting

| Symptom | Likely cause |
|---|---|
| "Signal lost" on submit | The Sheet call failed. Check the terminal for the logged reason |
| Sheet reply `401` with an HTML page | The deployment is not public. Redeploy as **Execute as: Me**, **Access: Anyone**, and use the new URL |
| Terminal prints `REGISTRATION {...}` and nothing reaches the Sheet | `SHEETS_WEBHOOK_URL` is empty or `.env.local` is misnamed or misplaced |
| A replaced image still shows the old one | Cache. Hard refresh (`Ctrl + Shift + R`), then delete `.next` and restart |
| Broken image icons | The path in the code does not match the file in `public/images/` (case and extension must match) |

## Project structure

```
.
├── public/
│   └── images/              # all site images (hero, agenda photos, planets, logos, formulas...)
├── src/
│   ├── app/
│   │   ├── api/register/
│   │   │   └── route.ts     # registration endpoint (validation, honeypot, Sheet call)
│   │   ├── globals.css      # theme tokens, liquid-glass, star-cluster, animations
│   │   ├── layout.tsx       # fonts, metadata, background
│   │   ├── not-found.tsx    # 404 page
│   │   └── page.tsx         # landing page
│   ├── components/          # Navbar, Hero, About, Agenda, AgendaCard,
│   │                        # CtaBanner, RegisterModal, Footer, Sprinkles...
│   ├── data/
│   │   └── event.ts         # event info, agenda items and session ids
│   └── lib/
│       └── validation.ts    # shared form types and validation rules
└── .env.local               # secrets (not committed)
```

## Editing the content

Most event content lives in one file: `src/data/event.ts`.

- **Agenda sessions**: each item has an `id`, title, type, date, time, room, `image` and CTA label.
  Current session ids: `ai-astronomy`, `cs-beyond-earth`, `arduino`.
- **Adding a session**: add an item to `event.agenda`. The registration form, validation and agenda buttons pick it up automatically, because they read the same list.
- **Images**: files go in `public/images/` and are referenced as `/images/<name>` (the `public` part is never written in code). Search `/images/` in the project to see every reference.

## Design system

The palette follows a 50 / 40 / 10 split:

| Share | Color role | Used for |
|---|---|---|
| ~50% | Deep space (`#05050f`, navy) | Page background, modal surfaces |
| ~40% | Periwinkle (`#8085f0`) and plum (`#3f0a58`) | Headings, cards, buttons, footer |
| ~10% | Orange | Formulas, orbiting dot, checkmarks, required marks, errors |

Reusable classes in `globals.css`:

- `.liquid-glass` for cards
- `.glass-btn` for buttons
- `.star-cluster` for the star cloud behind the call-to-action
- `.no-scrollbar` to hide a scrollbar while keeping scroll

Fonts are set in `src/app/layout.tsx` through two CSS variables (`--font-display-src`, `--font-body-src`). Changing fonts only touches the two constants in that file.

## Accessibility and UX notes

- The register form uses the native `<dialog>` element (focus trap, `Esc` to close, backdrop click to close).
- Decorative layers (stars, sparkles, planets) are `aria-hidden`.
- Star twinkle animation is disabled with `prefers-reduced-motion`.

## Deployment

The site is deployed on [Vercel](https://astro-camp-3.vercel.app/).

To deploy your own copy:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add `SHEETS_WEBHOOK_URL` and `SHEETS_SECRET` under **Settings → Environment Variables**.
4. Deploy. After adding or changing an environment variable later, redeploy so it takes effect.

## Roadmap

- [x] Countdown timer in the hero (Dec 26, 09:00)
- [x] Responsive pass on phone and tablet
- [x] Apply `.glass-btn` to all buttons
- [x] Production deployment (Vercel)
- [x] Real links for the social icons and the Astrotech logo in the footer
- [x] Open Graph tags (title, image) for link previews

## Team

Built by the **Astrotech** dev team.

- Organizer: Astrotech club, ESI
- Developer: Ramzy

## License

Add a license here (for example MIT), or state that the project is for internal club use only.