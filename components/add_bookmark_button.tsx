"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function AddBookmarkButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/bookmarks/add")}>
      <PlusIcon className="w-4 h-4" />
      Add Bookmark
    </Button>
  );
}
