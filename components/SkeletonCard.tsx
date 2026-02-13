export default function SkeletonCard() {
  return (
    <div className="card-elevated p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded-lg animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded-lg animate-pulse w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-muted rounded-lg animate-pulse w-full" />
      <div className="flex justify-between items-center pt-3 border-t border-border">
        <div className="h-3 bg-muted rounded-lg animate-pulse w-16" />
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
          <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
