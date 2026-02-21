"use client";

import { UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "./logout-button";

export function ProfileMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="cursor-pointer text-foreground hover:opacity-80 transition"
        aria-label="Profile menu"
      >
        <UserCircle size={32} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-background shadow-md p-4 text-sm z-50">
          <p className="mb-3 font-medium break-all">Hey, {email}!</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
