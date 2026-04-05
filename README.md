# SK & Associates — Website

Website for SK & Associates, a tax advisory and bookkeeping firm based in Auckland, New Zealand. Built with React + Vite.

## Tech Stack

- **React 19** + **React Router v7**
- **Vite 8**
- **Supabase** — user authentication
- **Formspree** — contact and consultation form submissions
- **lucide-react** — icons
- CSS custom properties (Material Design tokens)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the dev server
```bash
npm run dev
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/services` | Services |
| `/pricing` | Pricing |
| `/about` | Why Us |
| `/contact` | Contact Us |
| `/consultation` | Book a Consultation |
| `/faq` | FAQ |

## Forms

Both forms use [Formspree](https://formspree.io) to email submissions to the admin.

| Form | File | Formspree ID |
|------|------|--------------|
| Contact Us | `src/pages/Contact.jsx` | `xvzvdpjr` |
| Book a Consultation | `src/pages/Consultation.jsx` | `xreorgbk` |

Submissions are emailed to `amitshah@skassociates.co.nz`.

## Auth

User authentication is handled by Supabase. The `useAuth()` hook (from `src/context/AuthContext.jsx`) exposes `{ user, signOut }` and is available throughout the app.

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```
