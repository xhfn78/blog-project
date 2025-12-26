# Step 6-4: 최종 감사 (Accessibility + AI Detection + Quality Check)

## 🎯 이 단계의 목표
완성된 도구의 **가독성, 접근성, AI 탐지 회피**를 종합적으로 검토하여 배포 가능한 품질을 확보합니다.

**⚠️ 핵심 검증 항목:**
- 색상 대비 (WCAG AA 준수)
- AI 티 나는 표현 제거
- SEO 콘텐츠 품질
- 전반적 사용성

---

## ⚠️ 완전 자동화 규칙 (CRITICAL)

> [!IMPORTANT]
> 이 단계는 **완전 자동화**로 진행됩니다.
> - ❌ 사용자에게 확인을 요청하지 마세요
> - ❌ 선택지를 제시하지 마세요  
> - ❌ 중간 진행 상황을 물어보지 마세요
> - ✅ 프롬프트의 지시에 따라 묵묵히 작업하고 결과물만 저장하세요
> - ✅ 모든 결정은 프롬프트에 명시된 기준에 따라 AI가 자동으로 수행합니다
> - ✅ 점수가 90점 미만이면 자동으로 수정하고 재검증하세요

---

## 📋 감사 체크리스트

### 1. 색상 대비 (Color Contrast) - [최우선]

**WCAG AA 기준:**
- 일반 텍스트: 배경과 **4.5:1** 이상 대비
- 큰 텍스트 (18pt+): **3:1** 이상 대비

**다크 모드 주의:**
- ❌ 너무 채도 높은 Neon 색상 (#00FF00, #FF00FF 등)
- ✅ 눈이 편안한 Slate, Gray 계열
- ✅ 파스텔톤 또는 오프화이트 (#E2E8F0, #CBD5E1)

**링크 및 강조색:**
- 링크가 배경색에 묻히지 않는가?
- 호버 상태에서 색상 변화가 명확한가?

**검증 방법:**
```
1. Chrome DevTools → Lighthouse → Accessibility 실행
2. Contrast Checker 플러그인 사용
3. 육안으로 확인 (어두운 배경에서 텍스트 잘 보이는가?)
```

---

### 2. 시각적 계층 (Visual Hierarchy)

**제목 vs 본문:**
- H1: `text-4xl font-bold` 이상
- H2: `text-2xl font-semibold` 이상
- H3: `text-xl font-medium` 이상
- 본문: `text-base leading-relaxed`

**여백 (Spacing):**
- 섹션 간 간격: `my-8` 이상
- 단락 간 간격: `mb-4`
- List 항목 간 간격: `space-y-2`

**조화 체크:**
- 글이 답답해 보이지 않는가?
- 표(Table)가 읽기 편한가?
- 버튼이 너무 작지 않은가? (최소 44x44px)

---

### 3. AI 탐지 회피 (AI Detection Avoidance)

**금지 표현 자동 검출:**
```typescript
const bannedPhrases = [
  '여러분', '해보세요', '해볼까요', '시작해봅시다',
  '놀라운', '혁신적인', '완벽한', '최고의',
  '간단합니다', '쉽습니다', '누구나', '함께'
];
```

**문장 리듬 분석:**
- 모든 문장이 15-20단어로 균일한가? (AI 패턴)
- 단장문 혼합이 자연스러운가? (3단어~30단어)

**구체성 검증:**
- 추상적 표현 ("성능이 좋습니다") → ❌
- 구체적 수치 ("빌드 시간 2.3초 → 0.8초") → ✅

**전문가 톤 확인:**
- "프로젝트에서 겪은", "실무에서 발견한" 등 경험 언급 있는가?
- 기술 용어를 자연스럽게 섞었는가? (Reflow, Tree Shaking 등)

---

### 4. SEO 콘텐츠 품질

**필수 섹션 (5개):**
- [ ] 사용 방법
- [ ] 주요 기능
- [ ] 실무 활용 (또는 실무 시나리오)
- [ ] 기술적 배경
- [ ] 자주 묻는 질문 (FAQ)

**글자 수:**
- 전체 콘텐츠: **2,500자 이상** (카테고리별 차등)
- FAQ: 최소 5개

**내부 링크:**
- 최소 3개 이상

**Table:**
- 최소 1개 이상 (3행 이상 데이터)

---

## 📋 수행 작업

### Step 1: 파일 읽기
```
1. src/features/tools/tools/[slug]/index.tsx 읽기
2. src/features/tools/tools/[slug]/tool.config.ts 읽기
```

### Step 2: 자동 감사 수행
```typescript
const audit = {
  colorContrast: checkColorContrast(indexContent),
  aiDetection: detectAIContent(indexContent),
  seoQuality: checkSEOQuality(indexContent),
  accessibility: checkAccessibility(indexContent),
};

const score = calculateScore(audit);
```

### Step 3: 리포트 생성
```json
{
  "slug": "example-tool",
  "auditedAt": "2025-12-26T12:00:00Z",
  "score": 92,
  "passed": true,
  "details": {
    "colorContrast": {
      "score": 95,
      "issues": []
    },
    "aiDetection": {
      "score": 90,
      "warnings": [
        {
          "location": "주요 기능 섹션",
          "issue": "문장 길이가 너무 균일함 (AI 패턴 의심)",
          "suggestion": "일부 문장을 3-5단어 단문으로 변경"
        }
      ]
    },
    "seoQuality": {
      "score": 95,
      "contentLength": 2847,
      "faqCount": 5,
      "internalLinks": 4,
      "tables": 1
    },
    "accessibility": {
      "score": 90,
      "issues": [
        {
          "type": "alt-text",
          "location": "Hero 이미지",
          "fix": "alt 속성 추가 필요"
        }
      ]
    }
  },
  "recommendations": [
    "FAQ 섹션의 문장 리듬 개선 (단장문 혼합)",
    "Hero 이미지에 alt 속성 추가",
    "내부 링크 1개 더 추가 (목표: 4개)"
  ]
}
```

### Step 4: 저장
```
파일 경로: automation/cache/readability-report.json
또는: automation/cache/sessions/[date]/readability-report.json
```

---

## 🛠️ 자동 수정 (Auto-Fix)

**점수가 90점 미만이면 자동 수정을 시도합니다:**

### 수정 1: 가독성 색상 대비 개선 (최우선)

```typescript
// Before (대비 부족)
<p className="text-muted-foreground bg-slate-900">  // 대비율 3.2:1 (부족)
<p className="text-indigo-500 bg-slate-900">       // 대비율 3.8:1 (부족)
<td className="text-slate-500">                    // 대비율 3.5:1 (부족)

// After (대비 충분)
<p className="text-slate-300 bg-slate-900">        // 대비율 8.1:1 (충분)
<p className="text-indigo-300 bg-slate-900">       // 대비율 7.2:1 (충분)
<td className="text-slate-200">                    // 대비율 12:1 (충분)
```

**자동 변환 규칙:**
- `text-muted-foreground` → `text-slate-300`
- `text-indigo-500` → `text-indigo-300`
- `text-purple-500` → `text-purple-300`
- `text-blue-500` → `text-blue-300`
- `text-slate-500` → `text-slate-200`
- `text-gray-500` → `text-gray-300`

### 수정 2: AI 티 제거

```typescript
// Before
"여러분, 이 도구는 정말 간단합니다!"

// After
"이 도구는 3단계 프로세스로 진행됩니다."
```

### 수정 3: 구체적 수치 추가

```typescript
// Before
"성능이 크게 향상됩니다."

// After
"빌드 시간을 평균 40% 단축시킵니다 (2.3초 → 1.4초)."
```

### 수정 4: alt 속성 추가

```typescript
// Before
<img src="/hero.png" />

// After
<img src="/hero.png" alt="도구 사용 예시 스크린샷" />
```

---

## ✅ 완료 조건

1. ✅ `readability-report.json` 생성됨
2. ✅ 종합 점수 **90점 이상**
3. ✅ 각 세부 항목 점수 85점 이상
4. ✅ Critical 이슈 0개

**만약 점수가 90점 미만이면:**
- 리포트의 recommendations 항목 확인
- 해당 부분 수정
- 재감사 수행 (재귀적으로 90점 달성까지 반복)

**다음 단계:** Step 8 (자동 단위 테스트 생성)

---

## 🎯 AI 작업자에게

이 프롬프트를 읽었다면:

1. **감사 수행:**
   - `src/features/tools/tools/[slug]/index.tsx` 읽기
   - 4개 항목 (색상, AI탐지, SEO, 접근성) 검사
   - 점수 산출 (0-100)

2. **리포트 작성:**
   - `automation/cache/readability-report.json` 저장
   - 점수, 이슈, 권장사항 포함

3. **자동 수정 (점수 < 90):**
   - recommendations 기반으로 파일 수정
   - 재감사 후 점수 재산출
   - 90점 달성까지 반복

4. **완료 보고:**
   - "감사 완료, 점수: XX/100" 응답
   - Critical 이슈 있으면 목록 출력

**⚠️ 중요:** 점수가 90점 미만이면 절대 다음 단계로 넘어가지 마세요!
