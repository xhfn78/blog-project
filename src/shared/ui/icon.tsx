import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react'; // dynamicIconImports 제거
import { cn } from '@/shared/lib/cn';

const fallback = <div style={{ width: 24, height: 24 }}/>;

// dynamicIconImports가 없으므로 name 타입을 string으로 변경
export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string; // keyof typeof dynamicIconImports; -> string
}

const Icon = ({ name, className, ...props }: IconProps) => {
  // 임시로 빌드 통과를 위해 빈 div 반환 (나중에 실제 아이콘 로직으로 교체 필요)
  // const LucideIcon = lazy(dynamicIconImports[name]); // 이 부분 주석 처리 또는 제거
  const TempIconComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className: divClassName }) => (
    <div className={divClassName} />
  );

  const LucideIcon = lazy(() => Promise.resolve({ default: TempIconComponent }));


  return (
    <Suspense fallback={fallback}>
      {/* className은 이미 TempIconComponent에서 받으므로, 여기서 다시 전달하지 않습니다. */}
      {/* 또한, props는 LucideIcon 컴포넌트의 props이므로, 임시 div에는 전달하지 않습니다. */}
      <LucideIcon className={cn("shrink-0", className)} />
    </Suspense>
  );
};

export { Icon };