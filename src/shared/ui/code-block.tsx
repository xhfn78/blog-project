"use client"

import * as React from "react"
import hljs from "highlight.js"

import { cn } from "@/shared/lib/cn"
import { CopyButton } from "./copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 표시할 코드
   */
  code: string
  /**
   * 프로그래밍 언어
   */
  language?: string
  /**
   * 복사 버튼 표시 여부
   */
  showCopy?: boolean
  /**
   * 파일명 표시
   */
  filename?: string
}

/**
 * CodeBlock 컴포넌트
 * Syntax Highlighting을 지원하는 코드 블록 컴포넌트
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const hello = 'world'"
 *   language="javascript"
 *   filename="example.js"
 * />
 * ```
 */
function CodeBlock({
  code,
  language = "plaintext",
  showCopy = true,
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const codeRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (codeRef.current) {
      // highlight.js 적용
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <div
      data-slot="code-block"
      data-language={language}
      className={cn("relative group", className)}
      {...props}
    >
      {/* Header: 파일명과 복사 버튼 */}
      {(filename || showCopy) && (
        <div className="flex items-center justify-between rounded-t-lg bg-muted px-4 py-2 border-b">
          {filename && (
            <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          )}
          {showCopy && (
            <CopyButton
              text={code}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
            />
          )}
        </div>
      )}

      {/* Code Content */}
      <div className={cn(
        "relative overflow-x-auto rounded-lg",
        (filename || showCopy) && "rounded-t-none"
      )}>
        <pre className="bg-muted p-4 m-0">
          <code
            ref={codeRef}
            className={cn(`language-${language}`, "text-sm")}
          >
            {code}
          </code>
        </pre>

        {/* 복사 버튼 (헤더가 없을 때) */}
        {!filename && showCopy && (
          <div className="absolute top-2 right-2">
            <CopyButton
              text={code}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export { CodeBlock }
