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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://codepis.com"
  ),
  title: {
    default: "코드피스(Codepis) - 개발자를 위한 하이엔드 온라인 도구 모음",
    template: "%s | 코드피스(Codepis)",
  },
  description:
    "코드피스: 개발 생산성을 높이는 전문가용 무료 온라인 도구 모음. 코드 스냅샷, JSON 변환 등 실무 필수 도구를 제공합니다.",
  keywords: [
    "코드피스",
    "Codepis",
    "개발 도구",
    "프론트엔드 도구",
    "온라인 변환기",
    "Tailwind CSS",
    "코드 스냅샷",
    "무료 개발 도구",
  ],
  authors: [{ name: "코드피스 팀", url: "https://codepis.com" }],
  creator: "코드피스",
  publisher: "코드피스",

  // Open Graph (소셜 공유 최적화)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "코드피스(Codepis) - 개발자를 위한 무료 온라인 도구",
    description: "개발 생산성을 높이는 전문가용 무료 온라인 도구 모음",
    siteName: "코드피스(Codepis)",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "코드피스 - 개발 생산성을 높이는 무료 도구",
      },
    ],
  },

  // Twitter Card 최적화
  twitter: {
    card: "summary_large_image",
    title: "코드피스(Codepis) - 개발자를 위한 무료 온라인 도구",
    description: "개발 생산성을 높이는 전문가용 무료 온라인 도구 모음",
    images: ["/og-image.png"],
    creator: "@codepis",
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
  category: "technology",
  verification: {
    google: "google-site-verification-code",
    naver: "d0f1fdd17ed78788d85e2e01e0b0c45eed93df4c",
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
    name: "코드피스(Codepis)",
    description: "개발 생산성을 높이는 전문가용 무료 온라인 도구 모음",
    url: "https://codepis.com",
    publisher: {
      "@type": "Organization",
      name: "코드피스",
      logo: {
        "@type": "ImageObject",
        url: "https://codepis.com/logo.png",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://codepis.com/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "코드피스",
    url: "https://codepis.com",
    logo: "https://codepis.com/logo.png",
    sameAs: ["https://github.com/codepis"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@codepis.com",
      contactType: "고객 지원",
    },
  };

  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-white font-bold text-sm">CP</span>
                </div>
                <span className="text-lg font-bold tracking-tight hidden sm:inline-block">
                  코드피스
                </span>
              </Link>

              {/* Navigation */}
              <div className="flex items-center gap-6">
                <Link
                  href="/tools"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  도구 모음
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  소개
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  문의
                </Link>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* About Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CP</span>
                    </div>
                    <h3 className="font-bold text-lg">코드피스(Codepis)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    개발자의 생산성을 극대화하는 무료 온라인 도구 모음. 복잡한
                    작업을 간단하게, 반복적인 작업을 자동화합니다.
                  </p>
                </div>

                {/* Quick Links Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">빠른 링크</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/tools"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        도구 모음
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        소개
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        문의하기
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        개인정보처리방침
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Social & Resources Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm">리소스</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="mailto:contact@codepis.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        이메일 문의
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/codepis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>© 2025 코드피스(Codepis). All rights reserved.</p>
                <p className="text-xs">
                  Made with <span className="text-red-500">♥</span> using
                  Next.js & TypeScript
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}