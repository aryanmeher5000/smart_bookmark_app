import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Bookmark } from "@/components/display_bookmarks";

export default function useBookmarksRealtime(setData: React.Dispatch<React.SetStateAction<Bookmark[]>>) {
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookmarks" }, (payload) => {
        const { eventType, new: newRow, old: oldRow } = payload;

        if (eventType === "INSERT") {
          setData((prev) => [newRow as Bookmark, ...prev]);
        }

        if (eventType === "DELETE") {
          setData((prev) => prev.filter((b) => b.id !== oldRow.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setData]);
}
