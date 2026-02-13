import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        We encountered an unexpected error. Please try again or go back to your dashboard.
      </p>
      <div className="flex gap-3">
        <Link href="/dashboard" className="btn-primary">
          Go to Dashboard
        </Link>
        <Link href="/login" className="btn-secondary">
          Sign In
        </Link>
      </div>
    </div>
  );
}
