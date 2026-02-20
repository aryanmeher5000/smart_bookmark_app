"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddBookmarkButton() {
  const router = useRouter();

  return (
    <button
      className="flex gap-2 items-center text-sm bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => router.push("/bookmarks/add")}
    >
      <PlusIcon className="w-4 h-4" />
      Add Bookmark
    </button>
  );
}
