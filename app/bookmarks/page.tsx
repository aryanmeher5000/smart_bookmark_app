import AddBookmarkButton from "@/components/add_bookmark_button";
import DisplayBookmarks from "@/components/display_bookmarks";

export default function ProtectedPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      <div className="md:flex min-w-[72vw] items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Your Bookmarks</h1>
        <AddBookmarkButton />
      </div>

      <DisplayBookmarks />
    </div>
  );
}
