import React, { Suspense, useMemo } from 'react';
import { LucideProps } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

const fallback = <div style={{ width: 24, height: 24 }}/>;

// Temporary icon component for build compatibility
// TODO: Replace with actual icon loading logic
const TempIconComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className: divClassName }) => (
  <div className={divClassName} aria-label="icon placeholder" />
);

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const Icon = ({ className }: IconProps) => {
  // Memoize the component to prevent recreation on every render
  const IconComponent = useMemo(() => TempIconComponent, []);

  return (
    <Suspense fallback={fallback}>
      <IconComponent className={cn("shrink-0", className)} />
    </Suspense>
  );
};

export { Icon };