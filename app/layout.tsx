import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";
import { BookmarkCheck } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bookmarks",
  description: "Your personal bookmark manager",
};

const geist = Geist({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center px-5 text-sm">
              <Link href="/" className="flex items-center gap-1.5 font-semibold">
                <BookmarkCheck className="size-5" />
                Bookmarks
              </Link>

              <div className="flex gap-2">
                <Suspense fallback={null}>
                  <AuthButton />
                </Suspense>

                <ThemeSwitcher />
              </div>
            </div>
          </nav>

          <main className="min-h-screen flex flex-col items-center p-5">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
