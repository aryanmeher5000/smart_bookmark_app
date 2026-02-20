"use client";

import useGetUserBookmarks from "@/hooks/useGetUserBookmarks";
import { Trash2Icon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import useDeleteBookmark from "@/hooks/useDeleteBookmark";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export default function DisplayBookmarks() {
  const { data, hasNextPage, isLoading, fetchNextPage } = useGetUserBookmarks();

  // Initial load
  if (isLoading && data.length === 0) return <SkeletonGrid count={6} />;

  // Empty state
  if (!isLoading && data.length === 0)
    return <div className="py-20 text-center text-muted-foreground">No bookmarks yet.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <BookmarksGrid bookmarks={data} />

      {isLoading && <SkeletonGrid count={3} />}

      <FetchNextButton isLoading={isLoading} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </div>
  );
}

function BookmarksGrid({ bookmarks }: { bookmarks: Bookmark[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="group bg-card border rounded-xl p-6 flex flex-col justify-between transition hover:shadow-md hover:border-accent/40"
        >
          <div className="space-y-2 min-w-0">
            <h2 className="font-medium text-foreground truncate">{b.title}</h2>

            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition truncate"
            >
              <span className="truncate">{b.url}</span>
              <ExternalLinkIcon size={14} />
            </a>
          </div>

          <DeleteBookmarkButton id={b.id} />
        </div>
      ))}
    </div>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border rounded-xl p-6 animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-8 bg-muted rounded w-8 ml-auto" />
        </div>
      ))}
    </div>
  );
}

function FetchNextButton({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: {
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<void>;
}) {
  if (!hasNextPage) return null;

  return (
    <div className="flex justify-center">
      <Button disabled={isLoading} onClick={fetchNextPage}>
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

function DeleteBookmarkButton({ id }: { id: string }) {
  const { deleteBookmark, isDeleting } = useDeleteBookmark();

  return (
    <div className="pt-4 flex justify-end">
      <button
        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
        aria-label="Delete bookmark"
        disabled={isDeleting}
        onClick={() => deleteBookmark(id)}
      >
        <Trash2Icon size={18} />
      </button>
    </div>
  );
}
