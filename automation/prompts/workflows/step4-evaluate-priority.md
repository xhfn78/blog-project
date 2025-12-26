# Step 4: 우선순위 평가 및 5개 선정

## 🎯 이 단계의 목표
30개 아이디어를 **자동 채점**하여 우선순위를 매기고, 상위 **5개**를 최종 선정합니다.

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

## 📊 평가 기준 (자동 채점)

### 1. 수요 점수 (demandScore) - 가중치 40%
- Step 3에서 이미 평가된 1-10점
- 개발자가 실무에서 얼마나 자주 필요로 하는가?

### 2. 구현 난이도 (difficulty) - 가중치 20%
- `low`: 10점
- `medium`: 6점
- `high`: 3점
- **낮을수록** 우선순위 높음 (빠른 출시 가능)

### 3. SEO 가능성 (seoScore) - 가중치 30%
다음 기준으로 자동 계산:
- 롱테일 키워드 포함 (4-7단어): +3점
- 기술 스택 명시 (Next.js, React 등): +2점
- 검색 경쟁도 낮음 (예상): +2점
- 구체적 타겟 사용자 명시: +2점
- 독창성 (기존 도구와 차별화): +1점

**최대 10점**

### 4. 기존 도구와의 시너지 (synergyScore) - 가중치 10%
- 기존 도구와 함께 사용 가능: +5점
- 완전히 독립적: +3점
- 기존 도구와 경쟁: -2점

**최대 10점**

---

## 🧮 최종 우선순위 계산 공식

```javascript
priorityScore =
  (demandScore * 0.4) +
  ((10 - difficultyPenalty) * 0.2) +
  (seoScore * 0.3) +
  (synergyScore * 0.1)

// difficultyPenalty:
// - low: 0
// - medium: 4
// - high: 7

// 최대 점수: 10.0
```

---

## 📋 평가 프로세스

### Step 4-1: SEO 점수 자동 계산

각 아이디어의 `name` 필드를 분석하여 seoScore 계산:

```javascript
function calculateSEOScore(idea) {
  let score = 0;

  // 롱테일 키워드 (4-7단어)
  const wordCount = idea.name.split(' ').length;
  if (wordCount >= 4 && wordCount <= 7) score += 3;

  // 기술 스택 명시
  const techStack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind'];
  if (techStack.some(tech => idea.name.includes(tech))) score += 2;

  // 검색 경쟁도 (간단한 휴리스틱)
  if (idea.name.length > 50) score += 2; // 구체적일수록 경쟁 낮음

  // 타겟 사용자 명시
  const targets = ['개발자', 'React 개발자', '프론트엔드', '백엔드', '디자이너'];
  if (targets.some(target => idea.name.includes(target))) score += 2;

  // 독창성 (reason 필드에 "기존 도구 없음" 등 키워드)
  if (idea.reason.includes('없음') || idea.reason.includes('부족')) score += 1;

  return Math.min(score, 10);
}
```

### Step 4-2: 시너지 점수 자동 계산

기존 도구와의 관계 분석:

```javascript
function calculateSynergyScore(idea, existingTools) {
  // 같은 카테고리 내 보완 관계
  const sameCategory = existingTools.filter(t => t.category === idea.category);
  if (sameCategory.length > 0 && idea.reason.includes('함께')) return 5;

  // 다른 카테고리와 연계
  if (idea.reason.includes('연동') || idea.reason.includes('조합')) return 5;

  // 완전 독립적
  return 3;
}
```

### Step 4-3: 최종 점수 계산 및 정렬

```javascript
const evaluatedIdeas = allIdeas.map(idea => {
  const seoScore = calculateSEOScore(idea);
  const synergyScore = calculateSynergyScore(idea, existingTools);

  const difficultyPenalty =
    idea.difficulty === 'low' ? 0 :
    idea.difficulty === 'medium' ? 4 : 7;

  const priorityScore =
    (idea.demandScore * 0.4) +
    ((10 - difficultyPenalty) * 0.2) +
    (seoScore * 0.3) +
    (synergyScore * 0.1);

  return {
    ...idea,
    seoScore,
    synergyScore,
    priorityScore: parseFloat(priorityScore.toFixed(2))
  };
});

// 우선순위 순으로 정렬
const sortedIdeas = evaluatedIdeas.sort((a, b) => b.priorityScore - a.priorityScore);

// 상위 5개 선정
const top5 = sortedIdeas.slice(0, 5);
```

---

## ✅ 출력물

**파일:** `automation/cache/top5-suggestions.json`

```json
{
  "evaluatedAt": "2025-01-10T12:45:00Z",
  "totalEvaluated": 30,
  "top5": [
    {
      "rank": 1,
      "slug": "svg-to-jsx",
      "name": "SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구",
      "category": "converter",
      "reason": "디자인 시스템 구축 시 SVG를 JSX로 변환하는 작업이 빈번함",
      "difficulty": "medium",
      "demandScore": 8,
      "seoScore": 9,
      "synergyScore": 5,
      "priorityScore": 8.10,
      "breakdown": {
        "demand": "8 * 0.4 = 3.20",
        "difficulty": "(10 - 4) * 0.2 = 1.20",
        "seo": "9 * 0.3 = 2.70",
        "synergy": "5 * 0.1 = 0.50",
        "total": "8.10"
      }
    },
    {
      "rank": 2,
      "slug": "api-mock-generator",
      "name": "API Mock 데이터 생성기 - TypeScript 타입 기반 자동 생성",
      "category": "generator",
      "reason": "프론트엔드 개발 시 백엔드 API 대기 중 Mock 데이터 필요",
      "difficulty": "high",
      "demandScore": 9,
      "seoScore": 8,
      "synergyScore": 5,
      "priorityScore": 7.50
    },
    {
      "rank": 3,
      "slug": "sql-formatter",
      "name": "SQL 쿼리 포맷터 - 가독성 향상 및 문법 검증",
      "category": "formatter",
      "reason": "복잡한 SQL 쿼리를 읽기 쉽게 정리",
      "difficulty": "medium",
      "demandScore": 8,
      "seoScore": 7,
      "synergyScore": 3,
      "priorityScore": 7.20
    },
    {
      "rank": 4,
      "slug": "bundle-size-analyzer",
      "name": "번들 크기 분석기 - Next.js/React 최적화 가이드",
      "category": "utility",
      "reason": "프로젝트 빌드 시 번들 크기 확인 및 최적화 제안",
      "difficulty": "high",
      "demandScore": 8,
      "seoScore": 9,
      "synergyScore": 3,
      "priorityScore": 7.00
    },
    {
      "rank": 5,
      "slug": "postman-to-fetch",
      "name": "Postman to Fetch API 변환기 - API 테스트 코드 자동 생성",
      "category": "converter",
      "reason": "Postman Collection을 실제 코드로 변환할 때 필요",
      "difficulty": "high",
      "demandScore": 7,
      "seoScore": 8,
      "synergyScore": 5,
      "priorityScore": 6.80
    }
  ],
  "allEvaluated": [
    /* 30개 전체 (priorityScore 포함) */
  ]
}
```

---

## 📊 사용자에게 보여줄 형식

```
🎯 추천 도구 TOP 5 (30개 중 선별)

1. [8.10점] SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구
   카테고리: converter
   난이도: medium
   이유: 디자인 시스템 구축 시 SVG를 JSX로 변환하는 작업이 빈번함

2. [7.50점] API Mock 데이터 생성기 - TypeScript 타입 기반 자동 생성
   카테고리: generator
   난이도: high
   이유: 프론트엔드 개발 시 백엔드 API 대기 중 Mock 데이터 필요

3. [7.20점] SQL 쿼리 포맷터 - 가독성 향상 및 문법 검증
   카테고리: formatter
   난이도: medium
   이유: 복잡한 SQL 쿼리를 읽기 쉽게 정리

4. [7.00점] 번들 크기 분석기 - Next.js/React 최적화 가이드
   카테고리: utility
   난이도: high
   이유: 프로젝트 빌드 시 번들 크기 확인 및 최적화 제안

5. [6.80점] Postman to Fetch API 변환기 - API 테스트 코드 자동 생성
   카테고리: converter
   난이도: high
   이유: Postman Collection을 실제 코드로 변환할 때 필요

💡 어떤 도구를 만들까요? (1-5 선택 또는 다른 도구 보기)
```

---

## 🚫 이 단계에서 하지 않을 것

- ❌ 사용자 입력 대기 (Step 5에서 수행)
- ❌ 도구 생성 시작 (Step 6에서 수행)

**이 단계는 오직 "평가 및 정렬"만 수행합니다.**

---

## 🔄 다음 단계

→ **Step 5: 사용자 선택 대기**
