"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createBookmark } from "@/app/actions/bookmark";
import { PlusIcon } from "lucide-react";

type State = {
  error?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex gap-2 justify-center align-center bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PlusIcon />
      {pending ? "Saving..." : "Create Bookmark"}
    </button>
  );
}

export default function CreateBookmark({ returnTo = "/" }) {
  const [state, formAction] = useActionState<State, FormData>(createBookmark, { error: undefined });

  const [clientError, setClientError] = useState<string | null>(null);

  function handleValidate(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")?.toString().trim() || "";
    const url = formData.get("url")?.toString().trim() || "";

    if (!title) {
      e.preventDefault();
      setClientError("Title is required");
      return;
    }

    if (title.length < 3) {
      e.preventDefault();
      setClientError("Title must be at least 3 characters");
      return;
    }

    if (!url) {
      e.preventDefault();
      setClientError("URL is required");
      return;
    }

    try {
      new URL(url);
    } catch {
      e.preventDefault();
      setClientError("Invalid URL format");
      return;
    }

    setClientError(null);
  }

  return (
    <div className="bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Create Bookmark</h1>
          <p className="text-muted-foreground mt-2">Save a link so you can access it later.</p>
        </div>

        <form
          action={formAction}
          onSubmit={handleValidate}
          className="bg-card border rounded-xl p-6 space-y-6 shadow-sm min-w-[40vw]"
        >
          <input type="hidden" name="returnTo" value={returnTo} />

          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">Title</label>
            <input
              name="title"
              placeholder="Example: Supabase Docs"
              className="w-full p-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">URL</label>
            <input
              name="url"
              placeholder="https://example.com"
              className="w-full p-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          {(clientError || state.error) && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {clientError || state.error}
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
