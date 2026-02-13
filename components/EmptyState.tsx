import { BookOpen, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-amber-500" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No bookmarks yet</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Start building your personal library by adding your first bookmark above.
        Your saved links will appear here.
      </p>
    </div>
  );
}
