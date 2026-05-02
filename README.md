# AM-Gym Next.js 🏋️

> Train Smart. Eat Right. — Free fitness companion with exercise guides and nutrition tracking.

**This is a Next.js conversion of the original AM-Gym HTML app.**

## Features

- **80+ exercises** with GIF demonstrations from ExerciseDB
- **5 training programs** (PPL, Hybrid, Arms Focus, Bodyweight, Dumbbell)
- **40+ local meals** — Saudi/Arabic cuisine with macro breakdowns
- **Weekly challenges** with progress tracking
- **Rest timer** with presets and Tabata mode
- **Bilingual support** — English/Arabic with RTL
- **Gender-specific** exercise recommendations
- Mobile-first design with bottom tab navigation

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **NextAuth.js** for authentication (optional)
- **Prisma** for database (optional - works with localStorage)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aothman11/AM-GYM)

Or manually:

1. Push to GitHub
2. Import to Vercel
3. Deploy ✓

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Environment Variables

Create `.env.local`:

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
DATABASE_URL="postgresql://..." # Optional
```

## Project Structure

```
src/
├── app/
│   ├── (app)/           # Main app pages with header/tabs
│   │   ├── page.tsx     # Home
│   │   ├── programs/    # Wizard + Plan view
│   │   ├── exercises/   # Exercise library
│   │   ├── calories/    # Food tracking
│   │   └── profile/     # Settings
│   ├── auth/            # Sign in/up pages
│   └── api/             # API routes
├── components/          # React components
├── contexts/            # App state (AppContext)
└── data/                # Exercises, programs, foods, challenges
```
