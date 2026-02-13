import { login } from "@/lib/auth-actions";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl mb-8">
            <BookOpen className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">BookNest</h1>
          <p className="text-xl text-white/90 text-center max-w-md leading-relaxed">
            Your cozy corner for saving and organizing all the links that matter to you.
          </p>
          <div className="mt-12 flex gap-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold">📚</div>
              <div className="text-sm mt-1">Organize</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">🔍</div>
              <div className="text-sm mt-1">Search</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">⚡</div>
              <div className="text-sm mt-1">Quick Save</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your bookmarks
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="input"
              />
            </div>

            <button formAction={login} className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or continue with</span>
            </div>
          </div>

          <AuthButton label="Continue with Google" />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
