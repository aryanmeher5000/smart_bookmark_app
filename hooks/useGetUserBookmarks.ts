"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bookmark } from "@/components/display_bookmarks";
import { createClient } from "@/lib/supabase/client";
import useBookmarksRealtime from "./useBookmarksRealtime";

const PAGE_SIZE = 10;

interface GetBookmarkHook {
  data: Bookmark[];
  hasNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => Promise<void>;
}

export default function useGetUserBookmarks(): GetBookmarkHook {
  const supabase = createClient();
  const [data, setData] = useState<Bookmark[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(0);

  useBookmarksRealtime(setData);

  const fetchPage = useCallback(async (pageNumber: number) => {
    setIsLoading(true);

    const from = pageNumber * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const {
      data: bookmarks,
      count,
      error,
    } = await supabase
      .from("bookmarks")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    setIsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    const fetched = bookmarks ?? [];
    setData((prev) => (pageNumber === 0 ? fetched : [...prev, ...fetched]));
    setHasNextPage((pageNumber + 1) * PAGE_SIZE < (count ?? 0));
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !hasNextPage) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    await fetchPage(nextPage);
  }, [isLoading, hasNextPage, fetchPage]);

  return { data, hasNextPage, isLoading, fetchNextPage };
}
