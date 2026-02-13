import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center animate-pulse">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 animate-ping opacity-20" />
      </div>
      <div className="space-y-2 text-center">
        <p className="text-lg font-semibold text-foreground">Loading BookNest...</p>
        <p className="text-sm text-muted-foreground">Preparing your bookmarks</p>
      </div>
    </div>
  );
}
