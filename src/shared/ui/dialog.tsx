"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/shared/lib/cn"

export interface DialogProps {
  /**
   * Dialog 열림 상태
   */
  open?: boolean
  /**
   * Dialog 상태 변경 핸들러
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Dialog 내용
   */
  children: React.ReactNode
}

/**
 * Dialog 컴포넌트
 * 접근성을 고려한 모달 다이얼로그 컴포넌트
 */
function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div
      data-slot="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange?.(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Dialog Content */}
      <div
        className="relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 닫기 버튼 표시 여부
   */
  showClose?: boolean
  /**
   * 닫기 버튼 클릭 핸들러
   */
  onClose?: () => void
}

function DialogContent({
  className,
  children,
  showClose = true,
  onClose,
  ...props
}: DialogContentProps) {
  return (
    <div
      data-slot="dialog-content"
      className={cn(
        "relative w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        className
      )}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
      {showClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
