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
| Deployment   | Vercel (recommended)                |

---

## 📁 Project Structure

```
booknest/
├── app/
│   ├── (auth)/
│   │   ├── auth/confirm/       # OAuth & email verification callback
│   │   ├── login/              # Login page
│   │   ├── logout/             # Logout handler
│   │   └── register/           # Registration page
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

## 🧞 Available Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start development server       |


---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo at [https://book-nest-three.vercel.app/](https://book-nest-three.vercel.app/)
3. Add your environment variables in Vercel's dashboard
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain
5. Update Google OAuth redirect URI to include your production Supabase callback URL
