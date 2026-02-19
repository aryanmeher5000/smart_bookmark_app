"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createBookmark(_prevState: { error?: string }, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title")?.toString().trim() || "";
  const url = formData.get("url")?.toString().trim() || "";
  const returnTo = "/bookmarks";

  // Simple validation
  if (!title) return { error: "Title is required" };
  if (title.length < 3) return { error: "Title must be at least 3 characters" };
  if (!url) return { error: "URL is required" };

  try {
    new URL(url);
  } catch {
    return { error: "Invalid URL" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("bookmarks").insert({
    title,
    url,
    user_id: user.id,
  });

  if (error) return { error: error.message };

  redirect(returnTo);
}
