"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UseDeleteBookmarkReturn {
  deleteBookmark: (id: string) => Promise<boolean>;
  isDeleting: boolean;
}

export default function useDeleteBookmark(): UseDeleteBookmarkReturn {
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBookmark = async (id: string): Promise<boolean> => {
    setIsDeleting(true);

    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    setIsDeleting(false);

    if (error) {
      alert(`Delete failed: ${error.message}`);
      return false;
    }

    return true;
  };

  return { deleteBookmark, isDeleting };
}
