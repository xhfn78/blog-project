"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/shared/lib/cn"
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard"
import { Button } from "./button"

export interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  /**
   * 복사할 텍스트
   */
  text: string
  /**
   * 복사 성공 시 콜백
   */
  onCopySuccess?: (text: string) => void
  /**
   * 복사 실패 시 콜백
   */
  onCopyError?: () => void
}

/**
 * CopyButton 컴포넌트
 * 클립보드 복사 기능을 제공하는 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <CopyButton text="복사할 내용" />
 * ```
 */
function CopyButton({
  text,
  onCopySuccess,
  onCopyError,
  className,
  children,
  ...props
}: CopyButtonProps) {
  const { status, copyToClipboard } = useCopyToClipboard({ resetDelay: 2000 })

  const handleCopy = async () => {
    const success = await copyToClipboard(text)
    if (success) {
      onCopySuccess?.(text)
    } else {
      onCopyError?.()
    }
  }

  const isCopied = status === 'copied'

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      className={cn("relative", className)}
      aria-label={isCopied ? "복사됨" : "복사"}
      data-slot="copy-button"
      data-status={status}
      {...props}
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {children}
    </Button>
  )
}

export { CopyButton }
