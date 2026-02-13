# 📚 BookNest — Your Personal Bookmark Manager

BookNest is a modern, full-stack bookmark manager built with **Next.js 16**, **Supabase**, and **Tailwind CSS**. Save, organize, and rediscover your favorite links — all in a fast, secure, and beautifully designed interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

### 🔐 Authentication
- **Email & Password** — Register and log in with email/password credentials
- **Google OAuth** — One-click sign-in with Google
- **Session Management** — Secure cookie-based sessions via Supabase SSR
- **Auth Event Logging** — Every login, register, Google sign-in, and logout is tracked in the `auth_logs` table

### 📑 Bookmark Management
- **Add Bookmarks** — Save any link with a title and URL
- **Delete Bookmarks** — Remove bookmarks you no longer need
- **Favorite Bookmarks** — Star important links for quick access
- **Copy URL** — One-click copy to clipboard with visual feedback
- **External Links** — Open bookmarks in a new tab

### 🔍 Search & Sort
- **Search** — Filter bookmarks by title or URL in real time
- **Sort** — Order by newest first, oldest first, or alphabetically (A–Z)
- **Bookmark Count** — See total bookmarks at a glance

### ⚡ Real-Time Sync
- **Live Updates** — Powered by Supabase Realtime (Postgres Changes)
- **Instant Reflection** — Add, delete, or favorite a bookmark and see it update across all open tabs without refreshing

### 🎨 UI & UX
- **Dark / Light Mode** — Toggle with smooth icon transitions, persisted in localStorage
- **Toast Notifications** — Animated feedback for every action (add, delete, copy, favorite)
- **Loading Skeletons** — Pulse-animated placeholder cards while data loads
- **Empty State** — Friendly illustration when no bookmarks exist
- **Responsive Design** — Fully mobile-friendly across all screen sizes
- **Staggered Animations** — Cards animate in with sequenced fade-in-up effects

### 🛡️ Security
- **Row Level Security (RLS)** — Database-level enforcement: users can only access their own bookmarks and auth logs
- **Per-User Data Isolation** — Bookmarks and activity logs are completely separated per user
- **Server-Side Auth** — All sensitive operations run as server actions

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack) |
| Language     | TypeScript 5                        |
| UI Library   | React 19                            |
| Styling      | Tailwind CSS 4, shadcn/ui          |
| Icons        | Lucide React                        |
| Backend      | Supabase (Auth, Database, Realtime) |
| Auth         | Supabase SSR (@supabase/ssr)        |
| Deployment   | Vercel                              |

---

## 🧩 Challenges Faced & How I Solved Them

### 1. Supabase Authentication — Learning from Scratch

The hardest part of this project was setting up authentication using Supabase since it was completely new to me. At first, it felt confusing — understanding the difference between the server client and browser client, how cookies work with SSR, and how to properly manage sessions in Next.js App Router. I didn't give up. I watched YouTube videos, asked questions on ChatGPT, and learned whatever was needed for this. With some trial and error, I was able to understand it and get authentication working for BookNest.

### 2. `createClient()` Not Being Awaited

**Problem:** After wiring up login and register, every auth action crashed with:
```
TypeError: Cannot read properties of undefined (reading 'signInWithPassword')
```

**Root cause:** The Supabase server client (`createClient()` in `utils/supabase/server.ts`) is an `async` function because it needs to `await cookies()`. But in `auth-actions.ts`, I was calling it without `await`:
```ts
// ❌ Bug — supabase is a Promise, not the client
const supabase = createClient();
await supabase.auth.signInWithPassword(data); // crashes
```

**Fix:** Added `await` to every `createClient()` call:
```ts
// ✅ Fix
const supabase = await createClient();
```

### 3. Login Redirecting Back to Login (Route Group Confusion)

**Problem:** After successful email login, the app redirected right back to the login page instead of the dashboard. An infinite loop.

**Root cause:** The dashboard page lived at `app/(dashboard)/page.tsx`. In Next.js, parenthesized folders like `(dashboard)` are **route groups** — they don't create a URL segment. So `app/(dashboard)/page.tsx` served the `/` route, NOT `/dashboard`. But `app/page.tsx` was redirecting to `/dashboard` after login, which didn't exist as a route. The middleware saw no matching page, treated it as unauthenticated, and sent the user back to `/login`.

**Fix:** Moved the dashboard from `app/(dashboard)/page.tsx` to `app/dashboard/page.tsx` (without parentheses) so `/dashboard` becomes a real route.

### 4. Middleware Not Preserving Session Cookies

**Problem:** Even after fixing the route, login still looped back. The session cookie wasn't surviving the redirect.

**Root cause:** The Supabase middleware was using the **old deprecated** cookie API (`get`, `set`, `remove`) instead of the current `getAll`/`setAll` API. The old API didn't properly forward auth cookies in the response, so every new request appeared unauthenticated.

**Fix:** Rewrote `utils/supabase/middleware.ts` to use the official `getAll`/`setAll` pattern:
```ts
---

## 📁 Project Structure

```
booknest/
├── app/
│   ├── (auth)/
│   │   ├── auth/confirm/       # Email verification callback
│   │   ├── login/              # Login page
│   │   ├── logout/             # Logout handler
│   │   └── register/           # Registration page
│   ├── auth/
│   │   └── callback/           # OAuth callback (Google sign-in)
│   ├── dashboard/              # Main dashboard (protected)
│   ├── error/                  # Error page
│   ├── globals.css             # Theme, animations, utility classes
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Global loading state
│   └── page.tsx                # Root redirect (→ login or dashboard)
├── components/
│   ├── AuthButton.tsx          # Google OAuth button with SVG icon
│   ├── BookmarkCard.tsx        # Individual bookmark card
│   ├── BookmarkForm.tsx        # Add bookmark form
│   ├── BookmarkList.tsx        # Bookmark grid with search & sort
│   ├── EmptyState.tsx          # No bookmarks illustration
│   ├── Navbar.tsx              # Sticky navigation bar
│   ├── SearchBar.tsx           # Search input component
│   ├── SkeletonCard.tsx        # Loading placeholder card
│   ├── SortSelect.tsx          # Sort dropdown component
│   ├── ThemeToggle.tsx         # Dark/light mode toggle
│   └── Toast.tsx               # Toast notification system
├── lib/
│   ├── auth-actions.ts         # Server actions (login, signup, logout, Google)
│   ├── realtime.ts             # Realtime utilities
│   └── utils.ts                # General utilities
├── types/
│   └── bookmark.ts             # Bookmark TypeScript interface
├── utils/
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── middleware.ts       # Session refresh middleware
│       └── server.ts           # Server Supabase client
├── middleware.ts               # Next.js middleware (auth guard)
├── supabase-setup.sql          # Database schema & RLS policies
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- A **Supabase** project ([create one free](https://supabase.com))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/booknest.git
cd booknest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Open **SQL Editor** and run the contents of `supabase-setup.sql` — this creates:
   - `bookmarks` table with RLS policies
   - `auth_logs` table with RLS policies
   - Performance indexes
   - Realtime publication

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Add `https://your-project-id.supabase.co/auth/v1/callback` as an authorized redirect URI
4. In **Supabase Dashboard → Authentication → Providers**, enable Google and paste your Client ID and Secret
5. In **Supabase Dashboard → Authentication → URL Configuration**, add your redirect URLs:
   ```
   http://localhost:3000/auth/callback
   ```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Database Schema

### `bookmarks`

| Column       | Type        | Description                  |
| ------------ | ----------- | ---------------------------- |
| id           | UUID (PK)   | Auto-generated unique ID     |
| user_id      | UUID (FK)   | References `auth.users(id)`  |
| title        | TEXT        | Bookmark display name        |
| url          | TEXT        | Bookmark URL                 |
| is_favorite  | BOOLEAN     | Favorite flag (default false) |
| created_at   | TIMESTAMPTZ | Auto-generated timestamp     |

### `auth_logs`

| Column       | Type        | Description                       |
| ------------ | ----------- | --------------------------------- |
| id           | UUID (PK)   | Auto-generated unique ID          |
| user_id      | UUID (FK)   | References `auth.users(id)`       |
| email        | TEXT        | User email at time of event       |
| event        | TEXT        | `login` / `register` / `google_login` / `logout` |
| ip_address   | TEXT        | Client IP address                 |
| user_agent   | TEXT        | Browser user agent string         |
| created_at   | TIMESTAMPTZ | Auto-generated timestamp          |

Both tables have **Row Level Security** enabled — users can only access their own rows.

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel's dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. In **Supabase Dashboard → Authentication → URL Configuration**, add:
   ```
   https://your-app.vercel.app/auth/callback
   ```
5. Update Google OAuth redirect URI if using Google sign-in

**Live Demo:** [https://book-nest-three.vercel.app](https://book-nest-three.vercel.app)

---
