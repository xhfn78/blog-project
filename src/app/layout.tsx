import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Toolbox Blog",
  description: "개발자를 위한 미니 도구 모음과 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-background/80 backdrop-blur">
            <nav className="container mx-auto flex h-14 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight">
                  Dev Toolbox
                </span>
              </Link>
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link href="/tools" className="hover:text-primary">
                  도구
                </Link>
                <Link href="/blog" className="hover:text-primary">
                  블로그
                </Link>
              </div>
            </nav>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t py-4 text-center text-xs text-muted-foreground">
            <div className="container mx-auto px-4">
              Dev Toolbox Blog · Made with Next.js &amp; TypeScript
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
