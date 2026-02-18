"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import google from "@/assets/google.png";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

export default function Page() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg border">
        <h1 className="text-2xl font-bold">Welcome back</h1>

        <p className="mt-2 text-sm text-muted-foreground">Log in to access your bookmarks.</p>

        <button
          onClick={signInWithGoogle}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:opacity-90"
        >
          <Image src={google} alt="Google" width={20} height={20} />
          <span>Continue with Google</span>
        </button>

        <div className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" className="font-medium underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
