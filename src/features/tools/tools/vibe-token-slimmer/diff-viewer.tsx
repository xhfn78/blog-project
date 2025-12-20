'use client';

import React, { useEffect, useRef } from 'react';
import * as Diff from 'diff-match-patch';
import { cn } from '@/shared/lib/cn';

interface DiffViewerProps {
  original: string;
  modified: string;
  className?: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified, className }) => {
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diffRef.current) {
      const dmp = new Diff.diff_match_patch();
      const diff = dmp.diff_main(original, modified);
      dmp.diff_cleanupSemantic(diff);

      const fragment = document.createDocumentFragment();
      diff.forEach(([type, text]) => {
        const span = document.createElement('span');
        if (type === Diff.DIFF_INSERT) {
          span.style.backgroundColor = 'rgba(144, 238, 144, 0.5)'; // Light green
          span.title = '추가됨';
        } else if (type === Diff.DIFF_DELETE) {
          span.style.backgroundColor = 'rgba(255, 99, 71, 0.5)'; // Tomato
          span.title = '삭제됨';
        }
        span.textContent = text;
        fragment.appendChild(span);
      });

      diffRef.current.innerHTML = '';
      diffRef.current.appendChild(fragment);
    }
  }, [original, modified]);

  return (
    <div className={cn('whitespace-pre-wrap font-mono text-sm p-4 border rounded-md bg-gray-50 dark:bg-gray-800 overflow-auto', className)}>
      <div ref={diffRef}></div>
    </div>
  );
};

export default DiffViewer;