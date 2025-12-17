"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/shared/lib/cn"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * 체크 상태
   */
  checked?: boolean
  /**
   * 체크 상태 변경 핸들러
   */
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Checkbox 컴포넌트
 * 접근성을 고려한 체크박스 컴포넌트
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          data-slot="checkbox"
          checked={checked}
          onChange={handleChange}
          className={cn(
            "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-input bg-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "checked:bg-primary checked:border-primary",
            "transition-colors",
            className
          )}
          {...props}
        />
        <Check
          className={cn(
            "pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-primary-foreground opacity-0 transition-opacity",
            "peer-checked:opacity-100"
          )}
        />
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
