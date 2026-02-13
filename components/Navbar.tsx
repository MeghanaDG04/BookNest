import Link from "next/link";
import { BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user }: any) {
  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            BookNest
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="flex items-center gap-3 pl-3 border-l border-border">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-9 h-9 rounded-full ring-2 ring-amber-500/20"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                {initials}
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground leading-none">{displayName}</p>
            </div>
          </div>

          <Link
            href="/logout"
            className="btn-ghost text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
