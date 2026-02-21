import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookmarkCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto px-5 py-20 flex flex-col gap-24">
      {/* Hero */}
      <section className="flex flex-col gap-6 max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground">
          <BookmarkCheck className="size-3.5" />
          Your personal web library
        </div>

        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Save what matters. <br />
          <span className="text-muted-foreground font-normal">Find it later.</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
          A minimal bookmark manager that gets out of your way. Save links, tag them — no clutter, no noise.
        </p>

        <Button asChild>
          <Link href="/bookmarks">View Your Bookmarks</Link>
        </Button>
      </section>
    </div>
  );
}
