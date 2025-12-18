"use client";

import { Suspense, useEffect, useState } from "react";
import React from 'react';
import dynamic from 'next/dynamic';
import { TOOL_IMPORTS } from '@/features/tools/tool-components';
import { Card, CardContent } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';

interface ClientToolRendererProps {
  toolSlug: string;
}

export default function ClientToolRenderer({ toolSlug }: ClientToolRendererProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ComponentLoader = TOOL_IMPORTS[toolSlug];
  if (!ComponentLoader) {
    return (
      <Card className="min-h-[200px] flex items-center justify-center">
        <CardContent className="text-center">
          <Typography variant="h3" className="text-destructive mb-2">
            도구 로드 오류
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            슬러그 "{toolSlug}"에 해당하는 도구 컴포넌트를 찾을 수 없습니다.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  const DynamicToolComponent = dynamic(ComponentLoader, { ssr: false });

  return (
    <Suspense
      fallback={
        <Card className="min-h-[200px] flex items-center justify-center animate-pulse">
          <CardContent className="text-center">
            <Typography variant="h3" className="text-primary mb-2">
              도구 로딩 중...
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              잠시만 기다려 주세요.
            </Typography>
          </CardContent>
        </Card>
      }
    >
      {isMounted ? <DynamicToolComponent /> : null}
    </Suspense>
  );
}
