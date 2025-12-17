import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/cn"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "blockquote" | "code"
}

/**
 * Typography 컴포넌트
 * 일관된 텍스트 스타일을 제공하는 컴포넌트
 */
function Typography({
  className,
  variant = "p",
  as,
  ...props
}: TypographyProps) {
  // variant에 따라 기본 태그 결정
  const defaultTag = (() => {
    if (variant?.startsWith('h')) return variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    if (variant === 'blockquote') return 'blockquote'
    if (variant === 'code') return 'code'
    return 'p'
  })()

  const Comp = as || defaultTag

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
