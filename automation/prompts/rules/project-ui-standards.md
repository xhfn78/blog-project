# 프로젝트 UI 표준 및 컴포넌트 가이드

## 🎯 원칙
- **Shadcn UI + Framer Motion** 기반의 고급스러운 디자인 유지
- **다크 모드** 필수 지원 (프로젝트 기본 테마)
- **일관된 레이아웃**: `ToolLayout` 컴포넌트를 최상위에서 사용

---

## 🎨 핵심 UI 컴포넌트 사용법

### 1. 배경 및 효과
- **`BackgroundBeams`**: 섹션 배경에 은은한 광원 효과 추가
- **`Spotlight`**: 히어로 섹션이나 강조하고 싶은 상단 요소에 사용
```tsx
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { Spotlight } from "@/shared/ui/spotlight";

// 예시: 컨테이너 최상단에 배치
<div className="relative w-full overflow-hidden">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
  <BackgroundBeams />
  {/* 콘텐츠 */}
</div>
```

### 2. 레이아웃
- **`ToolLayout`**: 모든 도구의 공통 레이아웃 (제목, 설명, 카테고리 포함)
```tsx
import { ToolLayout } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";

export default function Tool() {
  return (
    <ToolLayout config={config}>
      <YourComponent />
    </ToolLayout>
  );
}
```

### 3. 타이포그래피
- **`Typography`**: 일관된 텍스트 스타일 적용
```tsx
import { Typography } from "@/shared/ui/typography";

<Typography variant="h1">제목</Typography>
<Typography variant="p" className="text-muted-foreground">본문</Typography>
```

### 4. 인터랙션 요소
- **`Card`**: 콘텐츠 그룹화 및 호버 효과
- **`Button`**: 다양한 변주(default, outline, ghost 등) 지원
- **`CopyButton`**: 결과물 복사가 필요한 모든 곳에 필수 배치

### 5. 내부 링크 CTA 섹션 (Internal Link CTA)
- **목적**: 본문 하단에서 다른 도구로의 전환 유도
- **구조**: 그라데이션 배경 + 둥근 모서리(rounded-3xl 또는 4rem) + 큰 타이틀 + 버튼 그룹
```tsx
<section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-12 rounded-[3rem] border border-white/5 text-center">
  <Typography variant="h3">함께 보면 좋은 도구</Typography>
  <div className="flex gap-4 justify-center mt-8">
    <Button size="lg" variant="outline" className="rounded-full">...</Button>
  </div>
</section>
```

---

## 🛠️ 구현 시 주의사항
1. **모든 입력 필드**는 `shared/ui/input`, `textarea`, `select`를 사용합니다. (Native HTML 태그 사용 지양)
2. **코드 결과물**은 반드시 `shared/ui/code-block`을 사용하여 문법 하이라이팅을 제공합니다.
3. **접근성**: 모든 이미지에 `alt` 속성, 버튼에 `aria-label`을 부여합니다.
