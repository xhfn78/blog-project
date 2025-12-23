# 비주얼 명령어 지도 (Visual Command Map)

풀스택 개발의 전체 여정을 GitHub 스타일 트리 구조로 시각화하고, 각 단계별 필요한 명령어를 한눈에 확인할 수 있는 도구입니다.

## 기능

### 핵심 기능
- **트리 구조 시각화**: GitHub 파일 탐색기 스타일의 펼침/접기 가능한 트리
- **6단계 개발 워크플로우**: 프로젝트 초기화 → DB 설계 → API 개발 → 프런트엔드 연결 → 테스트 → 배포
- **명령어 복사**: 클릭 한 번으로 명령어를 클립보드에 복사
- **진행 상태 추적**: 체크박스로 완료된 명령어 표시
- **진행 상태 저장**: localStorage에 자동 저장

### 커스터마이징
- **커스텀 명령어 추가**: 각 단계에 사용자 정의 명령어 추가 가능
- **커스텀 명령어 삭제**: 추가한 명령어는 언제든 삭제 가능

## 개발 단계

1. **프로젝트 초기화**
   - git init, create-next-app, 필수 패키지 설치

2. **DB 설계**
   - Prisma 설치, 초기화, 마이그레이션

3. **API 개발**
   - API 라우트 생성, 개발 서버 실행

4. **프런트엔드 연결**
   - react-hook-form, UI 라이브러리 설치

5. **테스트**
   - Vitest 설정, 테스트/린트 실행

6. **배포**
   - 빌드, Vercel 배포, Docker (선택)

## 파일 구조

```
visual-command-map/
├── tool.config.ts           # 도구 설정
├── index.tsx                # 메인 컴포넌트
├── lib/
│   ├── types.ts             # 타입 정의
│   ├── command-registry.ts  # 명령어 데이터
│   └── use-command-map.ts   # 상태 관리 훅
├── components/
│   ├── PhaseTree.tsx        # 트리 구조 컴포넌트
│   ├── CommandItem.tsx      # 명령어 아이템
│   └── AddCommandModal.tsx  # 명령어 추가 모달
└── README.md
```

## 사용된 기술

- React useState, useMemo, useCallback
- localStorage (persist)
- Lucide React (아이콘)
- ShadCN UI (Card, Button, Checkbox, Dialog, Badge)
- useCopyToClipboard 훅

## 접근 경로

`/utility/visual-command-map`
