'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { CommandBlock } from './command-block';
import { CONFIG_EXAMPLES } from '../lib/templates';

/**
 * 설정 예제 컴포넌트
 *
 * 5가지 설정 예제를 탭 형식으로 표시합니다.
 */
export function ConfigExamples() {
  const [activeTab, setActiveTab] = useState(CONFIG_EXAMPLES[0].id);

  const activeExample = CONFIG_EXAMPLES.find(ex => ex.id === activeTab) || CONFIG_EXAMPLES[0];

  return (
    <div className="space-y-4">
      {/* 탭 버튼들 */}
      <div className="flex gap-2 flex-wrap">
        {CONFIG_EXAMPLES.map(example => (
          <Button
            key={example.id}
            variant={activeTab === example.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(example.id)}
            size="sm"
          >
            {example.title}
          </Button>
        ))}
      </div>

      {/* 선택된 예제 표시 */}
      <Card>
        <CardHeader>
          <CardTitle>{activeExample.title}</CardTitle>
          <CardDescription>{activeExample.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CommandBlock command={activeExample.code} language="json" />
        </CardContent>
      </Card>
    </div>
  );
}
