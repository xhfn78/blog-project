import * as React from "react"

import { cn } from "@/shared/lib/cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // shadow-xs removed
        "focus-visible:ring-primary/50 focus-visible:ring-[3px]", // focus-visible:border-ring focus-visible:ring-ring/50 changed to focus-visible:ring-primary/50
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
