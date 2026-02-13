"use client";
import { createClient } from "@/utils/supabase/client";
import { Bookmark } from "@/types/bookmark";
import { useState } from "react";
import {
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Star,
  Globe,
} from "lucide-react";
import { useToast } from "./Toast";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const supabase = createClient();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(bookmark.url);
    setCopied(true);
    toast("URL copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDelete() {
    setDeleting(true);
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmark.id);

    if (error) {
      toast("Failed to delete bookmark", "error");
      setDeleting(false);
      return;
    }

    toast("Bookmark deleted", "success");
  }

  async function toggleFavorite() {
    const { error } = await supabase
      .from("bookmarks")
      .update({ is_favorite: !bookmark.is_favorite })
      .eq("id", bookmark.id);

    if (error) {
      toast("Failed to update favorite", "error");
      return;
    }

    toast(
      bookmark.is_favorite ? "Removed from favorites" : "Added to favorites",
      "success"
    );
  }

  function getDomain(url: string) {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  }

  function getTimeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  }

  return (
    <div
      className={`card-elevated p-5 group transition-all duration-300 hover:-translate-y-0.5 ${
        deleting ? "opacity-50 scale-95" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {bookmark.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {getDomain(bookmark.url)}
            </p>
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className="shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              bookmark.is_favorite
                ? "fill-amber-500 text-amber-500"
                : "text-muted-foreground hover:text-amber-500"
            }`}
          />
        </button>
      </div>

      {/* URL */}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors truncate max-w-full group/link"
      >
        <span className="truncate">{bookmark.url}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
      </a>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {getTimeAgo(bookmark.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Copy URL"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
