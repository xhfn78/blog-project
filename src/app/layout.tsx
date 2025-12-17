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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Dev Toolbox - 개발자를 위한 실전 도구 모음',
    template: '%s | Dev Toolbox'
  },
  description: '프론트엔드 개발을 가속화하는 무료 온라인 도구와 실무 가이드. Tailwind CSS, 코드 변환, 디버깅 도구를 한곳에서.',
  keywords: ['개발 도구', 'Tailwind CSS', '프론트엔드', '온라인 변환기', 'Next.js 도구', '개발자 유틸리티', '코드 포맷터', '웹 개발'],
  authors: [{ name: 'Dev Toolbox Team' }],
  creator: 'Dev Toolbox',
  publisher: 'Dev Toolbox',

  // Open Graph (소셜 공유)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: 'Dev Toolbox - 개발자를 위한 실전 도구 모음',
    description: '프론트엔드 개발을 가속화하는 무료 온라인 도구',
    siteName: 'Dev Toolbox',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Dev Toolbox - 개발자 도구 모음'
    }],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Toolbox - 개발자를 위한 실전 도구 모음',
    description: '프론트엔드 개발을 가속화하는 무료 온라인 도구',
    images: ['/og-image.png'],
  },

  // 검색엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 추가 메타 태그
  alternates: {
    canonical: '/',
  },
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

          <footer className="border-t py-6 text-center text-xs text-muted-foreground">
            <div className="container mx-auto px-4 space-y-3">
              <div className="flex justify-center gap-4 flex-wrap">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  개인정보처리방침
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  문의하기
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Link href="/about" className="hover:text-primary transition-colors">
                  소개
                </Link>
              </div>
              <div>
                Dev Toolbox Blog · Made with Next.js &amp; TypeScript
              </div>
              <div className="text-gray-400">
                © 2025 Dev Toolbox. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
