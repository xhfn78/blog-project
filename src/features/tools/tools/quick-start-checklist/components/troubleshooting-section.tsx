'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/shared/ui/card';
import { TROUBLESHOOTING_ITEMS } from '../lib/checklist-data';

/**
 * 트러블슈팅 FAQ 섹션 컴포넌트
 *
 * 아코디언 형태로 FAQ를 표시합니다.
 */
export function TroubleshootingSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {TROUBLESHOOTING_ITEMS.map(item => {
        const isOpen = openItems.has(item.id);

        return (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer hover:bg-accent/50 transition-colors p-4"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="font-semibold text-sm flex-1">
                  {item.question}
                </h4>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </div>
            </CardHeader>
            {isOpen && (
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {item.answer}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
