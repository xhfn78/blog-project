import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Geist, Geist_Mono, Gloria_Hallelujah, Gaegu } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// BeatOnWord 손글씨 폰트
const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloria",
});

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://beatonword.com"
  ),
  title: {
    default: "비트온워드(BeatOnWord) - 비트에 맞춰 단어를 말해요!",
    template: "%s | 비트온워드(BeatOnWord)",
  },
  description:
    "비트온워드: 음악 비트에 맞춰 이미지를 보고 단어를 말하는 재미있는 리듬 게임! 친구들과 함께 챌린지를 만들고 공유하세요.",
  keywords: [
    "비트온워드",
    "BeatOnWord",
    "리듬 게임",
    "단어 게임",
    "음악 게임",
    "비트 게임",
    "Say the Word",
    "TikTok 게임",
  ],
  authors: [{ name: "비트온워드 팀", url: "https://beatonword.com" }],
  creator: "비트온워드",
  publisher: "비트온워드",

  // Open Graph (소셜 공유 최적화)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "비트온워드(BeatOnWord) - 비트에 맞춰 단어를 말해요!",
    description: "음악 비트에 맞춰 이미지를 보고 단어를 말하는 재미있는 리듬 게임",
    siteName: "비트온워드(BeatOnWord)",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "비트온워드 - 비트에 맞춰 단어를 말해요!",
      },
    ],
  },

  // Twitter Card 최적화
  twitter: {
    card: "summary_large_image",
    title: "비트온워드(BeatOnWord) - 비트에 맞춰 단어를 말해요!",
    description: "음악 비트에 맞춰 이미지를 보고 단어를 말하는 재미있는 리듬 게임",
    images: ["/og-image.png"],
    creator: "@beatonword",
  },

  // 검색엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // 추가 SEO 최적화
  category: "game",
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "비트온워드(BeatOnWord)",
    description: "음악 비트에 맞춰 이미지를 보고 단어를 말하는 재미있는 리듬 게임",
    url: "https://beatonword.com",
    publisher: {
      "@type": "Organization",
      name: "비트온워드",
      logo: {
        "@type": "ImageObject",
        url: "https://beatonword.com/logo.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://beatonword.com/play?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "비트온워드",
    url: "https://beatonword.com",
    logo: "https://beatonword.com/logo.png",
    sameAs: ["https://github.com/beatonword", "https://tiktok.com/@beatonword"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@beatonword.com",
      contactType: "고객 지원",
    },
  };

  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="naver-site-verification" content="d0f1fdd17ed78788d85e2e01e0b0c45eed93df4c" />
        <meta name="google-adsense-account" content="ca-pub-4234312634957489" />
      </head>
      <body className={cn(
        geistSans.variable,
        geistMono.variable,
        gloriaHallelujah.variable,
        gaegu.variable,
        "antialiased",
        "bg-[var(--bg-playful)]"
      )}>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234312634957489"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* JSON-LD 구조화 데이터 */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="min-h-screen flex flex-col">
          {/* Header - BeatOnWord 플레이풀 스타일 */}
          <header className="sticky top-0 z-50 w-full border-b-4 border-[var(--border-dark)] bg-[var(--playful-yellow)]">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div
                  className="w-10 h-10 rounded-xl bg-[var(--playful-pink)] border-3 border-[var(--border-dark)] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-[3px_3px_0px_var(--border-dark)]"
                >
                  <span className="text-xl">🎵</span>
                </div>
                <span
                  className="text-xl font-bold tracking-tight hidden sm:inline-block"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  비트온워드
                </span>
              </Link>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <Link
                  href="/play"
                  className="px-4 py-2 text-sm font-bold bg-[var(--playful-mint)] border-3 border-[var(--border-dark)] rounded-xl shadow-[3px_3px_0px_var(--border-dark)] hover:shadow-[1px_1px_0px_var(--border-dark)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  🎮 플레이
                </Link>
                <Link
                  href="/create"
                  className="px-4 py-2 text-sm font-bold bg-[var(--playful-blue)] border-3 border-[var(--border-dark)] rounded-xl shadow-[3px_3px_0px_var(--border-dark)] hover:shadow-[1px_1px_0px_var(--border-dark)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  ✨ 만들기
                </Link>
                <Link
                  href="/tools"
                  className="px-3 py-2 text-sm font-medium text-[var(--border-dark)] hover:bg-[var(--playful-orange)]/30 rounded-lg transition-colors hidden md:block"
                >
                  🛠️ 도구
                </Link>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer - BeatOnWord 플레이풀 스타일 */}
          <footer className="border-t-4 border-[var(--border-dark)] bg-[var(--playful-purple)]">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* About Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[var(--playful-pink)] border-3 border-[var(--border-dark)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-dark)]">
                      <span className="text-xl">🎵</span>
                    </div>
                    <h3
                      className="font-bold text-xl text-[var(--border-dark)]"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      비트온워드
                    </h3>
                  </div>
                  <p
                    className="text-sm text-[var(--border-dark)]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    음악 비트에 맞춰 단어를 말하는 재미있는 게임!
                    친구들과 함께 챌린지를 만들고 공유해보세요.
                  </p>
                </div>

                {/* Quick Links Column */}
                <div className="space-y-4">
                  <h3
                    className="font-bold text-sm text-[var(--border-dark)]"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    빠른 링크
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/play"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors"
                      >
                        🎮 게임하기
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/create"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors"
                      >
                        ✨ 챌린지 만들기
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors"
                      >
                        🛠️ 개발자 도구
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors"
                      >
                        📜 개인정보처리방침
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Social & Resources Column */}
                <div className="space-y-4">
                  <h3
                    className="font-bold text-sm text-[var(--border-dark)]"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    소셜
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://tiktok.com/@beatonword"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors inline-flex items-center gap-2"
                      >
                        📱 TikTok
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/beatonword"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors inline-flex items-center gap-2"
                      >
                        📸 Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:contact@beatonword.com"
                        className="text-sm text-[var(--border-dark)]/80 hover:text-[var(--border-dark)] transition-colors inline-flex items-center gap-2"
                      >
                        ✉️ 문의하기
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t-2 border-[var(--border-dark)]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--border-dark)]/70">
                <p style={{ fontFamily: "var(--font-gaegu), cursive" }}>
                  © 2025 비트온워드(BeatOnWord). All rights reserved.
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  Made with 🎵 and ❤️ using Next.js
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
