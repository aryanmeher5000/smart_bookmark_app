"use client";

import useGetUserBookmarks from "@/hooks/useGetUserBookmarks";
import useDeleteBookmark from "@/hooks/useDeleteBookmark";
import { Trash2Icon, ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

const GRID = "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
const CARD =
  "bg-card border rounded-xl p-5 flex flex-col justify-between min-h-[130px] transition hover:shadow-md hover:border-accent/40";

export default function DisplayBookmarks() {
  const { data, hasNextPage, isLoading, fetchNextPage } = useGetUserBookmarks();

  if (isLoading && data.length === 0) return <SkeletonGrid count={6} />;

  if (!isLoading && data.length === 0)
    return <div className="w-full py-20 text-center text-muted-foreground">No bookmarks yet.</div>;

  return (
    <div className="w-full space-y-8">
      <div className={GRID}>
        {data.map((b) => (
          <BookmarkCard key={b.id} bookmark={b} />
        ))}
        {isLoading && <SkeletonCards count={3} />}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button disabled={isLoading} onClick={fetchNextPage}>
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}

function BookmarkCard({ bookmark: b }: { bookmark: Bookmark }) {
  const { deleteBookmark, isDeleting } = useDeleteBookmark();

  return (
    <div className={CARD}>
      <div className="min-w-0 space-y-1.5">
        <h2 className="font-medium text-foreground truncate">{b.title}</h2>
        <a
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors min-w-0"
        >
          <span className="truncate">{b.url}</span>
          <ExternalLinkIcon size={13} className="shrink-0" />
        </a>
      </div>

      <div className="pt-3 flex justify-end">
        <button
          aria-label="Delete bookmark"
          disabled={isDeleting}
          onClick={() => deleteBookmark(b.id)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
        >
          <Trash2Icon size={16} />
        </button>
      </div>
    </div>
  );
}

function SkeletonCards({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${CARD} animate-pulse`}>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
          <div className="h-7 bg-muted rounded w-7 ml-auto" />
        </div>
      ))}
    </>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className={`${GRID} w-full`}>
      <SkeletonCards count={count} />
    </div>
  );
}
