import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { ToastProvider } from "@/components/Toast";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <Navbar user={user} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <BookmarkForm userId={user!.id} />
          <BookmarkList userId={user!.id} />
        </main>
      </div>
    </ToastProvider>
  );
}
