import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon, PlusIcon } from "lucide-react";
import { Suspense } from "react";

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1>Your Bookmarks</h1>

      <button>
        Create <PlusIcon />
      </button>
    </div>
  );
}
