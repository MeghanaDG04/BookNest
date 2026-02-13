import { signup } from "@/lib/auth-actions";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl mb-8">
            <BookOpen className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">BookNest</h1>
          <p className="text-xl text-white/90 text-center max-w-md leading-relaxed">
            Start building your personal library of knowledge today.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 text-left max-w-sm">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
              <span className="text-2xl">✨</span>
              <span className="text-sm">Save bookmarks in one click</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
              <span className="text-2xl">🔄</span>
              <span className="text-sm">Real-time sync across devices</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
              <span className="text-2xl">🎯</span>
              <span className="text-sm">Search & find instantly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Create your account</h2>
            <p className="mt-2 text-muted-foreground">
              Join BookNest and start saving what matters
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium text-foreground">
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  placeholder="John"
                  required
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium text-foreground">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  placeholder="Doe"
                  required
                  className="input"
                />
              </div>
            </div>

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

            <button formAction={signup} className="btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or sign up with</span>
            </div>
          </div>

          <AuthButton label="Sign up with Google" />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
