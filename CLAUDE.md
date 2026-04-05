# CLAUDE.md — Tax Accounting Firm Website

## Project Overview
A React + Vite website for **SK & Associates**, a local tax advisory and bookkeeping firm targeting small businesses and families in New Zealand (Auckland-based).

## Tech Stack
- **React 19** with React Router v7
- **Vite 8** (dev server: `npm run dev`, build: `npm run build`)
- **Supabase** — user auth only (`@supabase/supabase-js`)
- **Formspree** — form submissions emailed to admin
- **lucide-react** — icons
- CSS custom properties for theming (Material Design tokens: `--primary`, `--on-primary`, etc.)

## Project Structure
```
src/
  App.jsx               # Router, Header, Footer, ScrollToTop
  main.jsx              # Entry point
  index.css             # Global styles and CSS variables
  App.css
  supabaseClient.js     # Supabase client (reads VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
  pages/
    Home.jsx            # Landing page with hero, stats, services, testimonials, CTA
    Services.jsx        # Service cards with modal detail view
    Pricing.jsx
    About.jsx           # "Why Us" page
    Contact.jsx         # Contact form (Formspree ID: xvzvdpjr)
    Consultation.jsx    # Booking form (Formspree ID: xreorgbk)
    FAQ.jsx             # Accordion FAQ page
  components/
    AuthModal.jsx       # Sign in / Register modal
  context/
    AuthContext.jsx     # Supabase auth state (useAuth hook)
  assets/
    logo.png
```

## Routes
| Path            | Component        |
|-----------------|------------------|
| `/`             | Home             |
| `/services`     | Services         |
| `/pricing`      | Pricing          |
| `/about`        | About (Why Us)   |
| `/contact`      | Contact          |
| `/consultation` | Consultation     |
| `/faq`          | FAQ              |

## Forms
Both forms use **Formspree** with `FormData` (not JSON) submissions. Emails go to `amitshah@skassociates.co.nz`.
- Contact form: `https://formspree.io/f/xvzvdpjr`
- Consultation form: `https://formspree.io/f/xreorgbk`

## Auth
- Provided by `AuthContext` via `useAuth()` — exposes `{ user, signOut }`
- Supabase credentials must be set in `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Navigation (App.jsx)
Header has desktop nav, mobile hamburger menu, and auth buttons (Log In / Register / Sign Out). All internal links use React Router `<Link>` — never `<a href>`.

## Dev Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```
