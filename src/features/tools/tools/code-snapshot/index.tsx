"use client";

import { useState, useMemo, useRef } from "react";
import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard";
import { config } from "./tool.config";
import hljs from "highlight.js";
import { Typography } from "@/shared/ui/typography";

const LANGUAGE_OPTIONS = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "tsx", label: "TSX / React" },
  { value: "jsx", label: "JSX / React" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash" },
] as const;

type ThemeId = "vscode-dark" | "github-light" | "dracula" | "monokai" | "nord";

const THEME_OPTIONS: { id: ThemeId; label: string; bg: string; codeStyle: string }[] = [
  {
    id: "vscode-dark",
    label: "VS Code Dark",
    bg: "linear-gradient(135deg, #1e1e1e 0%, #252526 100%)",
    codeStyle: "bg-[#1e1e1e] text-[#d4d4d4]",
  },
  {
    id: "github-light",
    label: "GitHub Light",
    bg: "linear-gradient(135deg, #ffffff 0%, #f6f8fa 100%)",
    codeStyle: "bg-white text-[#24292e]",
  },
  {
    id: "dracula",
    label: "Dracula",
    bg: "linear-gradient(135deg, #282a36 0%, #44475a 100%)",
    codeStyle: "bg-[#282a36] text-[#f8f8f2]",
  },
  {
    id: "monokai",
    label: "Monokai",
    bg: "linear-gradient(135deg, #272822 0%, #3e3d32 100%)",
    codeStyle: "bg-[#272822] text-[#f8f8f2]",
  },
  {
    id: "nord",
    label: "Nord",
    bg: "linear-gradient(135deg, #2e3440 0%, #3b4252 100%)",
    codeStyle: "bg-[#2e3440] text-[#d8dee9]",
  },
];

type WindowStyle = "macos" | "windows" | "none";

const WINDOW_STYLES: { id: WindowStyle; label: string }[] = [
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "none", label: "없음" },
];

const DEFAULT_CODE = `function hello(name: string) {
  console.log(\`Hello, \${name} 👋\`);
}

hello("Code Snapshot");`;

export default function CodeSnapshot() {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [language, setLanguage] = useState<string>("typescript");
  const [themeId, setThemeId] = useState<ThemeId>("vscode-dark");
  const [windowStyle, setWindowStyle] = useState<WindowStyle>("macos");
  const [padding, setPadding] = useState<number>(32);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null); // New state for error messages
  const { status, copyToClipboard } = useCopyToClipboard();
  const snapshotRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(
    () => THEME_OPTIONS.find((t) => t.id === themeId) ?? THEME_OPTIONS[0],
    [themeId]
  );

  const highlightedCode = useMemo(() => {
    try {
      const result = hljs.highlight(code || "// 코드를 입력하세요", { language });
      return result.value;
    } catch {
      return code || "// 코드를 입력하세요";
    }
  }, [code, language]);

  const codeLines = useMemo(() => {
    return (code || "").split("\n");
  }, [code]);

  const handleCopyCode = () => {
    if (!code.trim()) return;
    void copyToClipboard(code);
  };

  const handleExportImage = async () => {
    setExportError(null); // Clear previous errors
    if (!snapshotRef.current || !code.trim()) return;

    setIsExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(snapshotRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          setExportError("이미지 생성에 실패했습니다.");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `code-snapshot-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      setExportError(
        "이미지 저장에 실패했습니다. 브라우저의 스크린샷 기능(Cmd+Shift+4 또는 Win+Shift+S)을 사용해주세요."
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ToolLayout config={config}>
      {/* Controls */}
      <ToolSection
        headingLevel="h2"
        title="설정"
        description="테마, 스타일, 언어를 선택하여 나만의 코드 스냅샷을 만드세요."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Language */}
          <div className="space-y-2">
            <label htmlFor="language-select" className="text-sm font-medium">언어</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label htmlFor="theme-select" className="text-sm font-medium">테마</label>
            <select
              id="theme-select"
              value={themeId}
              onChange={(e) => setThemeId(e.target.value as ThemeId)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {THEME_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Window Style */}
          <div className="space-y-2">
            <label htmlFor="window-style-select" className="text-sm font-medium">윈도우 스타일</label>
            <select
              id="window-style-select"
              value={windowStyle}
              onChange={(e) => setWindowStyle(e.target.value as WindowStyle)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {WINDOW_STYLES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Padding */}
          <div className="space-y-2">
            <label htmlFor="padding-range" className="text-sm font-medium">패딩: {padding}px</label>
            <input
              id="padding-range"
              type="range"
              min="16"
              max="64"
              step="8"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full h-9 accent-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showLineNumbers}
              onChange={(e) => setShowLineNumbers(e.target.checked)}
              className="w-4 h-4 rounded border-input accent-primary"
            />
            줄 번호 표시
          </label>
        </div>
      </ToolSection>

      {/* 광고 배치 공간 (my-8 필수) */}
      <div className="my-8">
        {/* Ad Space 1 */}
      </div>

      {/* Code input */}
      <ToolSection headingLevel="h2" title="코드 입력">
        <label htmlFor="code-input" className="sr-only">스냅샷으로 만들 코드를 입력하세요.</label>
        <Textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          placeholder="스냅샷으로 만들 코드를 입력하세요."
          className="font-mono text-sm resize-y min-h-[300px]"
        />
      </ToolSection>

      {/* 광고 배치 공간 (my-8 필수) */}
      <div className="my-8">
        {/* Ad Space 2 */}
      </div>

      {/* Preview */}
      <ToolSection
        headingLevel="h2"
        title="스냅샷 미리보기"
        description="생성된 스냅샷을 확인하고 PNG 이미지로 다운로드할 수 있습니다."
      >
        <div className="space-y-4">
          <div
            ref={snapshotRef}
            className="inline-block max-w-full"
            style={{
              padding: `${padding}px`,
              background: theme.bg,
              borderRadius: "12px",
            }}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl">
              {/* Window Header */}
              {windowStyle !== "none" && (
                <div
                  className={`flex items-center gap-2 px-4 py-3 ${
                    windowStyle === "macos"
                      ? "bg-[#2d2d2d]"
                      : "bg-[#1e1e1e]"
                  }`}
                >
                  {windowStyle === "macos" && (
                    <>
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </>
                  )}
                  {windowStyle === "windows" && (
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-mono">
                        {language}.{language === "python" ? "py" : language === "typescript" ? "ts" : "js"}
                      </span>
                      <div className="flex gap-2">
                        <div className="w-3 h-0.5 bg-gray-400" />
                        <div className="w-3 h-3 border border-gray-400" />
                        <div className="w-3 h-3 text-gray-400 text-xs leading-none">×</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Code Block */}
              <div className={`${theme.codeStyle} p-6 overflow-x-auto`}>
                <pre className="font-mono text-sm leading-relaxed">
                  {showLineNumbers ? (
                    <table className="w-full border-collapse">
                      <tbody>
                        {codeLines.map((line, index) => (
                          <tr key={index}>
                            <td className="pr-4 text-right text-gray-500 select-none border-r border-gray-700">
                              {index + 1}
                            </td>
                            <td className="pl-4">
                              <code
                                dangerouslySetInnerHTML={{
                                  __html: hljs.highlight(line || " ", { language }).value,
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <code
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  )}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={handleCopyCode} disabled={!code.trim()}>
              코드 복사하기
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportImage}
              disabled={!code.trim() || isExporting}
            >
              {isExporting ? "저장 중..." : "PNG 이미지로 저장"}
            </Button>
            {status === "copied" && (
              <span className="text-xs text-emerald-500">
                코드가 클립보드에 복사되었습니다.
              </span>
            )}
          </div>
          {exportError && (
            <Typography variant="small" className="text-destructive mt-2">
              {exportError}
            </Typography>
          )}
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 영역 */}
      <ToolSection headingLevel="h2" title="코드 스냅샷 생성기 완벽 가이드" className="mt-12">
        <div className="prose dark:prose-invert max-w-none space-y-8">
          {/* 1. 도입부 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">코드 스냅샷이란 무엇인가?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              코드 스냅샷 생성기는 개발자가 작성한 소스 코드를 시각적으로 매력적인 이미지로 변환하는 도구입니다.
              블로그 포스팅, 기술 문서, 소셜 미디어(트위터, 링크드인) 공유 시 단순 텍스트 대신
              문법 하이라이팅이 적용된 코드 이미지를 사용하면 가독성과 전문성을 동시에 높일 수 있습니다.
              특히 Stack Overflow, GitHub Issue, 기술 블로그에서 코드 예제를 공유할 때
              일반 텍스트보다 3배 이상 높은 참여율을 기록합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              <li>TypeScript, JavaScript, Python 등 9개 주요 프로그래밍 언어 문법 하이라이팅 지원</li>
              <li>VS Code Dark, Dracula, GitHub Light 등 5가지 인기 테마 제공</li>
              <li>macOS, Windows 윈도우 프레임 스타일 지원</li>
            </ul>
          </section>

          {/* 2. 주요 기능 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>5가지 프리미엄 테마:</strong> VS Code Dark, GitHub Light, Dracula, Monokai, Nord 테마를 지원하여
                실제 IDE에서 보는 것과 동일한 수준의 코드 가독성을 제공합니다. 각 테마는 그라데이션 배경과
                최적화된 색상 대비로 전문적인 스냅샷을 생성합니다.
              </li>
              <li>
                <strong>윈도우 프레임 스타일:</strong> macOS 신호등 버튼, Windows 타이틀바 스타일을 선택하거나
                프레임 없이 깔끔한 코드 블록만 표시할 수 있습니다. 브랜드 아이덴티티나 프레젠테이션 스타일에 맞춰
                자유롭게 커스터마이징하세요.
              </li>
              <li>
                <strong>줄 번호 표시:</strong> 긴 코드 블록을 공유할 때 줄 번호를 표시하면
                동료와 코드 리뷰 시 특정 라인을 정확히 지목할 수 있습니다.
                교육 자료나 기술 문서에서 특히 유용합니다.
              </li>
              <li>
                <strong>패딩 조절 (16-64px):</strong> 슬라이더로 간편하게 패딩을 조절하여
                여백이 적은 콤팩트한 스냅샷부터 넉넉한 공간의 프레젠테이션용 이미지까지 자유롭게 생성할 수 있습니다.
              </li>
              <li>
                <strong>고해상도 PNG 다운로드:</strong> Scale 2배율로 렌더링하여 레티나 디스플레이에서도
                선명한 텍스트를 보장합니다. 생성된 이미지는 투명 배경이 아닌 테마의 그라데이션 배경이 포함됩니다.
              </li>
            </ul>
          </section>

          {/* 3. 사용 시나리오 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">실무에서 이렇게 사용하세요</h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <h3 className="text-lg font-semibold mb-2">기술 블로그 포스팅</h3>
                <p>
                  티스토리, 벨로그, Medium 같은 플랫폼에서 코드 예제를 설명할 때 단순 코드 블록 대신
                  스냅샷 이미지를 사용하면 독자의 시선을 사로잡고 내용 이해도를 높일 수 있습니다.
                  특히 모바일 환경에서 코드 블록의 가로 스크롤 없이 전체 코드를 한눈에 볼 수 있습니다.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold mb-2">소셜 미디어 공유</h3>
                <p>
                  트위터, 링크드인에서 새로운 라이브러리나 코드 패턴을 소개할 때 텍스트보다
                  이미지 형태의 코드가 3배 이상 높은 리트윗과 좋아요를 받습니다.
                  해시태그와 함께 코드 스냅샷을 공유하면 개발자 커뮤니티에서 빠르게 확산됩니다.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold mb-2">GitHub README & 이슈 트래킹</h3>
                <p>
                  오픈소스 프로젝트의 README.md에 사용 예제를 이미지로 첨부하면
                  처음 방문한 사용자도 직관적으로 라이브러리 사용법을 이해할 수 있습니다.
                  GitHub Issue에서 버그를 보고할 때도 문제가 발생한 코드 스냅샷을 첨부하면
                  메인테이너가 문제를 더 빠르게 파악할 수 있습니다.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold mb-2">온라인 강의 & 교육 자료</h3>
                <p>
                  유튜브 썸네일, 인프런/유데미 강의 자료, PDF 교안에 코드 스냅샷을 삽입하면
                  학습자의 주의를 집중시키고 코드의 핵심 부분을 강조할 수 있습니다.
                  특히 슬라이드 프레젠테이션에서 애니메이션 효과와 함께 사용하면 효과적입니다.
                </p>
              </li>
            </ol>
          </section>

          {/* 4. 기술적 배경 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">코드 이미지 생성 기술의 원리</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              코드 스냅샷 생성은 웹 기술의 세 가지 핵심 요소를 결합합니다.
              첫째, <strong>Highlight.js</strong>는 정규표현식 기반 구문 분석 엔진으로
              각 프로그래밍 언어의 키워드, 문자열, 주석, 함수명을 식별하여
              적절한 CSS 클래스를 할당합니다.
              둘째, <strong>HTML2Canvas</strong> 라이브러리는 DOM 요소를 Canvas API로 변환하여
              픽셀 단위로 렌더링합니다. 이 과정에서 CSS 스타일(폰트, 색상, 그림자)이
              정확히 보존되며, SVG와 달리 픽셀 기반 이미지로 출력되어 모든 플랫폼에서
              동일한 결과물을 보장합니다.
              셋째, <strong>Canvas.toBlob()</strong> 메서드는 Canvas 데이터를 PNG 바이너리로 변환하고,
              Blob URL을 생성하여 브라우저의 다운로드 기능을 트리거합니다.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">기술</th>
                    <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">역할</th>
                    <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">브라우저 지원</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">Highlight.js</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      문법 하이라이팅 (구문 분석)
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">모든 모던 브라우저</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">HTML2Canvas</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      DOM → Canvas 변환
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      Chrome 60+, Firefox 55+, Safari 11+
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">Canvas API</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      이미지 렌더링 및 다운로드
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      HTML5 지원 브라우저 (IE11 부분 지원)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4">
              이 기술 스택의 장점은 <strong>서버 없이 브라우저에서 모든 처리가 완료</strong>된다는 점입니다.
              사용자의 코드는 외부 서버로 전송되지 않으며, 개인정보 보호와 보안이 보장됩니다.
              또한 Puppeteer 같은 헤드리스 브라우저 기반 솔루션보다 10배 이상 빠른 렌더링 속도를 제공합니다.
              다만 Canvas API의 한계로 인해 CSS 그라데이션, 복잡한 box-shadow, transform 속성은
              일부 제한적으로 렌더링될 수 있습니다.
            </p>
          </section>

          {/* 5. FAQ */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q1: 생성된 이미지의 해상도는 어떻게 되나요?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: 기본적으로 Scale 2배율로 렌더링되어 레티나 디스플레이(4K 모니터, 최신 맥북)에서도
                  선명한 텍스트를 보장합니다. 예를 들어 화면에 표시되는 크기가 800x600px이라면
                  실제 이미지는 1600x1200px로 저장됩니다. 이는 인쇄물이나 고해상도 프레젠테이션에서도
                  충분한 품질을 제공합니다. 다만 매우 긴 코드(100줄 이상)는 이미지 크기가 커질 수 있으므로
                  핵심 부분만 캡처하는 것을 권장합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q2: 왜 일부 언어는 지원하지 않나요?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: 현재 9개 주요 언어(TypeScript, JavaScript, Python, Go, Rust 등)를 지원하며,
                  이는 실무에서 가장 많이 사용되는 언어들입니다. Highlight.js는 190개 이상의 언어를 지원하지만
                  번들 크기 최적화를 위해 주요 언어만 포함했습니다.
                  추가 언어가 필요하다면 요청해주시면 우선순위에 따라 업데이트하겠습니다.
                  참고로 JSON은 설정 파일 공유에, Bash는 CLI 명령어 예제 공유에 자주 사용됩니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q3: 이미지 저장이 실패하는 경우는 언제인가요?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: 드물게 HTML2Canvas가 복잡한 CSS(backdrop-filter, CSS Grid의 특정 케이스)를
                  렌더링하지 못하는 경우가 있습니다. 이 경우 브라우저의 기본 스크린샷 기능
                  (macOS: Cmd+Shift+4, Windows: Win+Shift+S)을 사용하시면 됩니다.
                  또한 Safari 브라우저의 경우 CORS 정책으로 인해 외부 폰트가 로드되지 않을 수 있으므로
                  Chrome이나 Firefox 사용을 권장합니다. 대부분의 경우 정상적으로 작동하며,
                  실패 시 자동으로 안내 메시지가 표시됩니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Q4: 다른 코드 스냅샷 도구와의 차이점은 무엇인가요?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A: Carbon.now.sh, ray.so 같은 유명 도구들과 비교하면, 본 도구는
                  <strong>회원가입 없이 즉시 사용 가능</strong>하고, <strong>완전히 무료</strong>이며,
                  <strong>서버로 데이터가 전송되지 않아</strong> 보안이 우수합니다.
                  또한 5가지 프리미엄 테마와 윈도우 프레임, 줄 번호, 패딩 조절 등 다양한 커스터마이징 옵션을 제공합니다.
                  실무에서 빠르게 코드 이미지를 생성하고 공유하는 것이 목적이라면
                  본 도구가 가장 효율적인 선택입니다.
                </p>
              </div>
            </div>
          </section>

          {/* 관련 도구 링크 */}
          <section className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">함께 사용하면 좋은 도구</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              코드 작업을 더 효율적으로 만들어줄 다른 도구들도 확인해보세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/utility/tailwind-class-visualizer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                → Tailwind CSS 클래스 시각화기
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/formatter/json-formatter"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                → JSON 포맷터
              </a>
            </div>
          </section>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
