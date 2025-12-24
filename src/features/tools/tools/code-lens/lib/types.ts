// src/features/tools/tools/code-lens/lib/types.ts
export type Language = 'html' | 'css' | 'javascript' | 'typescript' | 'json' | 'sql' | 'markdown' | 'yaml' | 'graphql' | 'unknown';

export interface CodePattern {
  id: string;
  regex: RegExp;
  description: string;
  template?: string;
  humanRole?: string;
  analogy?: string;
  category:
    // 기본 카테고리 (12개)
    | 'Structure'     // 구조, 아키텍처, 레이아웃
    | 'Logic'         // 조건문, 제어 흐름, 로직
    | 'Style'         // 스타일링, 디자인, CSS
    | 'Type'          // 타입 정의, 타입 시스템
    | 'Data'          // 데이터 처리, 조회, 변환
    | 'Async'         // 비동기 처리, Promise
    | 'UI'            // 사용자 인터페이스 요소
    | 'Event'         // 이벤트 처리
    | 'State'         // 상태 관리
    | 'Scenario'      // 복잡한 실무 시나리오
    | 'Flow'          // 실행 흐름
    | 'Unknown'       // 미분류
    // 확장 카테고리 (19개)
    | 'Meta'          // 메타데이터, 설정 정보
    | 'Advanced'      // 고급 기능, 최적화
    | 'Media'         // 미디어 요소 (이미지, 비디오, 오디오)
    | 'Interactive'   // 상호작용 요소
    | 'Security'      // 보안 관련
    | 'Performance'   // 성능 최적화
    | 'OOP'           // 객체 지향 프로그래밍
    | 'FP'            // 함수형 프로그래밍
    | 'Module'        // 모듈 시스템
    | 'NextJS'        // Next.js 전용 패턴
    | 'Error'         // 에러 처리
    | 'Regex'         // 정규식
    | 'Pattern'       // 디자인 패턴
    | 'DOM'           // DOM 조작
    | 'Test'          // 테스팅
    | 'Layout'        // 레이아웃 (CSS Grid, Flexbox 등)
    | 'Positioning'   // 위치 지정
    | 'Animation'     // 애니메이션
    | 'Form'          // 폼 요소
    | 'BoxModel'      // 박스 모델
    | 'Position'      // 위치 (CSS Position)
    | 'Typography'    // 타이포그래피
    | 'Visual'        // 시각 효과
    | 'Responsive'    // 반응형 디자인
    | 'Text'          // 텍스트/콘텐츠 (HTML)
    | 'List'          // 목록 (HTML)
    | 'Table'         // 표 (HTML)
    | 'Core'          // 핵심 문법 (JS/TS)
    | 'React'         // React 관련
    | 'Optimization'  // 최적화
    | 'Debug';        // 디버깅
  importance: 'high' | 'medium' | 'low';
  tips?: string[];
  warnings?: string[];
  impact?: number;
}

export interface ScenarioPattern {
  id: string;
  requiredKeywords: string[];
  title: string;
  description: string;
  category: string;
}

export interface AnalysisResult {
  language: Language;
  title: string;
  sections: {
    title: string;
    content: string[];
  }[];
  keywords: string[];
  score?: number;
}
