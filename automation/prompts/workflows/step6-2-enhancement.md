# Step 6-2: 고도화 (분석 + 파워업 구현 통합)

## 🎯 이 단계의 목표
Step 6-1에서 완성한 MVP 도구를 분석하여 사용자가 감탄할만한 **고급 기능**을 추가하고, 실제로 구현하여 경쟁 도구를 압도하는 완성도를 확보합니다.

**⚠️ 핵심 전략:**
- 단순한 기능 추가가 아니라 **"감탄하는 UX"** 구현
- 전문가를 위한 **Advanced Options** 제공
- 다양한 **입력 방식**과 **출력 포맷** 지원

---

## ⚠️ 완전 자동화 규칙 (CRITICAL)

> [!IMPORTANT]
> 이 단계는 **완전 자동화**로 진행됩니다.
> - ❌ 사용자에게 확인을 요청하지 마세요
> - ❌ 선택지를 제시하지 마세요  
> - ❌ 중간 진행 상황을 물어보지 마세요
> - ✅ 프롬프트의 지시에 따라 묵묵히 작업하고 결과물만 저장하세요
> - ✅ 모든 결정은 프롬프트에 명시된 기준에 따라 AI가 자동으로 수행합니다

---

## 📋 PART 1: 고도화 분석 (Enhancement Analysis)

### 분석 체크리스트 (Power-up List)

#### 1. 옵션의 다양성 (Variety)
- [ ] 단순 입력 외에 전문가를 위한 **세부 설정(Advanced Options)** 있는가?
- [ ] 한 번의 클릭으로 설정을 완료하는 **프리셋(Presets)** 기능 있는가?
- [ ] 사용자가 자주 쓰는 설정을 **즐겨찾기** 할 수 있는가?

#### 2. 사용성 강화 (Usability)
- [ ] 입력값 오류 시 **친절한 에러 가이드** 제공하는가?
- [ ] **드래그 앤 드롭**, **파일 업로드** 등 편리한 입력 방식 지원하는가?
- [ ] 처리 결과에 대한 **시각적 피드백**(애니메이션, 그래프, 프로그레스 바) 풍부한가?
- [ ] **실시간 미리보기** 제공하는가?

#### 3. 출력의 확장성 (Output)
- [ ] 결과물을 **JSON, 코드, 이미지, 파일 다운로드** 등 다양한 형태로 제공하는가?
- [ ] **클립보드 복사** 버튼 제공하는가?
- [ ] **코드 하이라이팅** 적용되어 있는가?
- [ ] **히스토리 기능** (이전 작업 불러오기) 있는가?

---

### 분석 수행 단계

1. **현재 도구 재검토**
   - `src/features/tools/tools/[slug]/index.tsx` 읽기
   - 현재 제공하는 기능 목록 작성

2. **경쟁 도구 조사**
   - 같은 카테고리의 기존 온라인 도구 3개 조사
   - 우리 도구에 없는 기능 발견

3. **고도화 기능 도출**
   - 위 체크리스트 기준으로 **최소 3가지 기능** 선정
   - 구현 난이도 vs 사용자 가치 평가

4. **계획 문서 작성**
   - `automation/cache/enhancement-plan.json` 저장

---

### enhancement-plan.json 형식

```json
{
  "slug": "example-tool",
  "analyzedAt": "2025-12-26T12:00:00Z",
  "currentFeatures": [
    "기본 변환 기능",
    "간단한 UI"
  ],
  "competitorAnalysis": [
    {
      "competitor": "tool-a.com",
      "uniqueFeatures": ["배치 처리", "API 지원"]
    },
    {
      "competitor": "tool-b.com",
      "uniqueFeatures": ["템플릿 저장", "히스토리"]
    }
  ],
  "features": [
    {
      "name": "프리셋 시스템",
      "description": "일반, 전문가, 디자이너 모드 등 3가지 사전 설정 제공",
      "difficulty": "medium",
      "value": "high",
      "implementation": "lib/presets.ts 파일 생성, ui/PresetSelector.tsx 추가"
    },
    {
      "name": "배치 변환",
      "description": "여러 개의 입력을 한 번에 처리",
      "difficulty": "high",
      "value": "high",
      "implementation": "lib/batch-processor.ts 추가, UI 테이블 방식으로 확장"
    },
    {
      "name": "히스토리 및 즐겨찾기",
      "description": "최근 10개 작업 저장, localStorage 활용",
      "difficulty": "low",
      "value": "medium",
      "implementation": "lib/use-history.ts 훅 추가"
    }
  ]
}
```

---

## 📋 PART 2: 파워업 구현 (Advanced Features Implementation)

### 구현 순서

#### ✅ 1단계: 로직 업그레이드 (lib/, model/)

새로운 기능에 필요한 상태와 복잡한 계산 로직을 추가합니다.

**예시 1: 프리셋 시스템**
```typescript
// lib/presets.ts
export const PRESETS = {
  beginner: {
    name: '초보자 모드',
    baseFontSize: 16,
    unit: 'rem',
    precision: 2,
  },
  designer: {
    name: '디자이너 모드',
    baseFontSize: 16,
    unit: 'rem',
    precision: 4,
  },
  developer: {
    name: '개발자 모드',
    baseFontSize: 14,
    unit: 'em',
    precision: 3,
  },
} as const;

export type PresetKey = keyof typeof PRESETS;
```

**예시 2: 배치 처리 로직**
```typescript
// lib/batch-processor.ts
export interface BatchItem {
  id: string;
  input: string;
  output?: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  error?: string;
}

export function processBatch(items: BatchItem[], converter: (input: string) => string): BatchItem[] {
  return items.map(item => {
    try {
      return {
        ...item,
        output: converter(item.input),
        status: 'success',
      };
    } catch (error) {
      return {
        ...item,
        status: 'error',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  });
}
```

**예시 3: 히스토리 관리 훅**
```typescript
// lib/use-history.ts
'use client';

import { useState, useEffect } from 'react';

interface HistoryItem<T> {
  id: string;
  timestamp: number;
  data: T;
}

export function useHistory<T>(key: string, maxItems = 10) {
  const [history, setHistory] = useState<HistoryItem<T>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, [key]);

  const addToHistory = (data: T) => {
    const newItem: HistoryItem<T> = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data,
    };

    const newHistory = [newItem, ...history].slice(0, maxItems);
    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(key);
  };

  return { history, addToHistory, clearHistory };
}
```

---

#### ✅ 2단계: UI 컴포넌트 강화 (ui/)

**예시 1: 프리셋 선택기**
```typescript
// ui/PresetSelector.tsx
'use client';

import { Button } from '@/shared/ui/button';
import { PRESETS, type PresetKey } from '../lib/presets';

interface PresetSelectorProps {
  onSelect: (preset: PresetKey) => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="flex gap-2">
      {Object.entries(PRESETS).map(([key, preset]) => (
        <Button
          key={key}
          variant="outline"
          onClick={() => onSelect(key as PresetKey)}
        >
          {preset.name}
        </Button>
      ))}
    </div>
  );
}
```

**예시 2: 배치 처리 테이블**
```typescript
// ui/BatchTable.tsx
'use client';

import { Table } from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import type { BatchItem } from '../lib/batch-processor';

interface BatchTableProps {
  items: BatchItem[];
  onRemove: (id: string) => void;
}

export function BatchTable({ items, onRemove }: BatchTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>입력</th>
          <th>출력</th>
          <th>상태</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.input}</td>
            <td>{item.output || '-'}</td>
            <td>
              <span className={getStatusColor(item.status)}>
                {getStatusText(item.status)}
              </span>
            </td>
            <td>
              <Button size="sm" variant="ghost" onClick={() => onRemove(item.id)}>
                삭제
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function getStatusColor(status: BatchItem['status']) {
  switch (status) {
    case 'success': return 'text-green-600';
    case 'error': return 'text-red-600';
    case 'processing': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
}

function getStatusText(status: BatchItem['status']) {
  switch (status) {
    case 'success': return '완료';
    case 'error': return '오류';
    case 'processing': return '처리 중';
    default: return '대기';
  }
}
```

**예시 3: 히스토리 패널**
```typescript
// ui/HistoryPanel.tsx
'use client';

import { Button } from '@/shared/ui/button';
import type { HistoryItem } from '../lib/use-history';

interface HistoryPanelProps<T> {
  history: HistoryItem<T>[];
  onSelect: (data: T) => void;
  onClear: () => void;
  renderItem: (data: T) => React.ReactNode;
}

export function HistoryPanel<T>({ history, onSelect, onClear, renderItem }: HistoryPanelProps<T>) {
  if (history.length === 0) {
    return <p className="text-gray-500 text-sm">저장된 히스토리가 없습니다</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">최근 작업</h3>
        <Button size="sm" variant="ghost" onClick={onClear}>
          전체 삭제
        </Button>
      </div>

      <ul className="space-y-2">
        {history.map(item => (
          <li
            key={item.id}
            className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(item.data)}
          >
            {renderItem(item.data)}
            <span className="text-xs text-gray-500 block mt-1">
              {new Date(item.timestamp).toLocaleString('ko-KR')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

#### ✅ 3단계: 메인 페이지 재조립 (index.tsx)

```typescript
// index.tsx (일부)
'use client';

import { useState } from 'react';
import { config } from './tool.config';
import { useConverter } from './lib/use-converter';
import { useHistory } from './lib/use-history';
import { PRESETS, type PresetKey } from './lib/presets';
import { ControlPanel } from './ui/ControlPanel';
import { PresetSelector } from './ui/PresetSelector';
import { HistoryPanel } from './ui/HistoryPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export default function ToolPage() {
  const converter = useConverter();
  const { history, addToHistory, clearHistory } = useHistory('tool-history');

  const handlePresetSelect = (presetKey: PresetKey) => {
    const preset = PRESETS[presetKey];
    converter.setBaseFontSize(preset.baseFontSize);
    // 추가 설정 적용...
  };

  const handleConvert = () => {
    addToHistory({
      pxValue: converter.pxValue,
      remValue: converter.remValue,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{config.name}</h1>
        <p className="text-lg text-gray-600">{config.description}</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <Tabs defaultValue="simple">
          <TabsList>
            <TabsTrigger value="simple">간단 모드</TabsTrigger>
            <TabsTrigger value="advanced">고급 모드</TabsTrigger>
            <TabsTrigger value="batch">배치 처리</TabsTrigger>
          </TabsList>

          <TabsContent value="simple">
            <PresetSelector onSelect={handlePresetSelect} />
            <ControlPanel {...converter} onConvert={handleConvert} />
          </TabsContent>

          <TabsContent value="advanced">
            {/* Advanced options */}
          </TabsContent>

          <TabsContent value="batch">
            {/* Batch processing UI */}
          </TabsContent>
        </Tabs>

        <aside className="mt-8">
          <HistoryPanel
            history={history}
            onSelect={(data) => {
              converter.setPxValue(data.pxValue);
            }}
            onClear={clearHistory}
            renderItem={(data) => `${data.pxValue}px → ${data.remValue}rem`}
          />
        </aside>
      </main>
    </div>
  );
}
```

---

## 🛠️ 품질 원칙

### "감탄하는 UX" 체크리스트
- [ ] 프리셋으로 **1초 만에 설정 완료** 가능한가?
- [ ] 입력 시 **실시간 프리뷰** 제공하는가?
- [ ] **드래그 앤 드롭** 또는 **파일 업로드** 지원하는가?
- [ ] 결과물 **클립보드 복사** 원클릭으로 가능한가?
- [ ] **에러 메시지**가 구체적이고 해결 방법 제시하는가?
- [ ] **히스토리**로 이전 작업 즉시 불러올 수 있는가?

### 견고함 체크리스트
- [ ] 엣지 케이스 처리 (빈 입력, 특수문자, 큰 숫자 등)
- [ ] 에러 바운더리 설정
- [ ] 로딩 상태 표시
- [ ] 타입 안전성 (TypeScript strict 모드)

---

## 📂 최종 폴더 구조 (고도화 후)

```
src/features/tools/tools/[slug]/
├── tool.config.ts
├── index.tsx (확장됨)
├── model/
│   └── types.ts (새 타입 추가)
├── lib/
│   ├── converter.ts
│   ├── use-converter.ts
│   ├── presets.ts               # 신규
│   ├── batch-processor.ts       # 신규
│   └── use-history.ts           # 신규
└── ui/
    ├── ControlPanel.tsx
    ├── ResultDisplay.tsx
    ├── PresetSelector.tsx        # 신규
    ├── BatchTable.tsx            # 신규
    └── HistoryPanel.tsx          # 신규
```

---

## ✅ 완료 조건

1. ✅ `enhancement-plan.json` 생성됨 (최소 3개 기능 정의)
2. ✅ `lib/` 폴더에 고도화 로직 파일 3개 이상 추가
3. ✅ `ui/` 폴더에 새 컴포넌트 2개 이상 추가
4. ✅ `index.tsx`가 Tabs 또는 섹션으로 확장됨
5. ✅ 브라우저에서 모든 고급 기능이 동작함

**다음 단계:** Step 6-3 (SEO 콘텐츠 작성)

---

## 🎯 AI 작업자에게

이 프롬프트를 읽었다면:

1. **PART 1 (분석):**
   - `src/features/tools/tools/[slug]/index.tsx` 읽고 현재 기능 파악
   - 경쟁 도구 3개 조사 (Google 검색 또는 가상 분석)
   - 최소 3가지 고도화 기능 도출
   - `automation/cache/enhancement-plan.json` 저장

2. **PART 2 (구현):**
   - `enhancement-plan.json`에 정의된 기능 모두 구현
   - 새 파일 생성 및 기존 파일 수정
   - 브라우저에서 동작 확인

3. **완료 보고:**
   - "완료" 응답
   - 생성/수정한 파일 경로 목록 출력
   - 추가된 주요 기능 3가지 요약

**⚠️ 주의:** 기능을 너무 많이 추가하지 마세요. 3-5개가 적당하며, 각 기능은 반드시 동작해야 합니다!
