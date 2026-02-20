import AddBookmarkButton from "@/components/add_bookmark_button";
import DisplayBookmarks, { Bookmark } from "@/components/display_bookmarks";

export default function ProtectedPage() {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <div className="min-w-[60vw] max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Your Bookmarks</h1>

        <AddBookmarkButton />
      </div>

      {/* Bookmark Grid */}
      <DisplayBookmarks />
    </div>
  );
}
