"use client";

import { useState, useMemo } from "react";
import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { CodeBlock } from "@/shared/ui/code-block";
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard";
import { config } from "./tool.config";

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

type ThemeId = "dark" | "light";

const THEME_OPTIONS: { id: ThemeId; label: string; bg: string }[] = [
  { id: "dark", label: "다크", bg: "#020617" }, // slate-950
  { id: "light", label: "라이트", bg: "#f1f5f9" }, // slate-100
];

const DEFAULT_CODE = `function hello(name: string) {
  console.log(\`Hello, \${name} 👋\`);
}

hello("Code Snapshot");`;

export default function CodeSnapshot() {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [language, setLanguage] = useState<string>("typescript");
  const [themeId, setThemeId] = useState<ThemeId>("dark");
  const [background, setBackground] = useState<string>(THEME_OPTIONS[0].bg);
  const { status, copyToClipboard } = useCopyToClipboard();

  const theme = useMemo(
    () => THEME_OPTIONS.find((t) => t.id === themeId) ?? THEME_OPTIONS[0],
    [themeId]
  );

  const handleCopyCode = () => {
    if (!code.trim()) return;
    void copyToClipboard(code);
  };

  return (
    <ToolLayout config={config}>
      {/* Controls */}
      <ToolSection
        title="설정"
        description="언어와 테마, 배경 색상을 선택한 뒤 아래에서 코드를 입력해 스냅샷을 만들어 보세요."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {/* Language */}
          <div className="space-y-2">
            <label className="text-sm font-medium">언어</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
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
            <label className="text-sm font-medium">테마</label>
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value as ThemeId)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
            >
              {THEME_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Background color */}
          <div className="space-y-2">
            <label className="text-sm font-medium">배경 색상</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded-md border border-input bg-background p-0"
                aria-label="배경 색상 선택"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 font-mono"
                placeholder="#020617"
              />
            </div>
          </div>
        </div>
      </ToolSection>

      {/* Code input */}
      <ToolSection title="코드 입력">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          placeholder="스냅샷으로 만들 코드를 입력하세요."
          className="font-mono text-sm resize-y min-h-[200px]"
        />
      </ToolSection>

      {/* Preview */}
      <ToolSection
        title="스냅샷 미리보기"
        description="아직은 이미지로 내보내기까지는 지원하지 않고, 코드 블록 형태의 미리보기와 복사 기능만 제공합니다."
      >
        <div className="space-y-4">
          <div
            className="rounded-xl p-6 shadow-lg border overflow-hidden max-w-full"
            style={{ backgroundColor: background || theme.bg }}
          >
            <CodeBlock
              code={code || "// 여기에 코드를 입력하면 스냅샷이 표시됩니다."}
              language={language}
              showCopy={false}
              className="bg-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={handleCopyCode} disabled={!code.trim()}>
              코드 복사하기
            </Button>
            <Button size="sm" variant="outline" disabled>
              이미지로 저장 (준비 중)
            </Button>
            {status === "copied" && (
              <span className="text-xs text-emerald-500">
                코드가 클립보드에 복사되었습니다.
              </span>
            )}
          </div>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
