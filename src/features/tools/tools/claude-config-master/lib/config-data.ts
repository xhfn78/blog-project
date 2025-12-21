/**
 * 설정 마스터 체크리스트 아이템 데이터
 */

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  isOptional: boolean;
  isCompleted: boolean;
}

/**
 * Claude Code 설정 마스터 체크리스트 (5단계)
 */
export const DEFAULT_CONFIG_CHECKLIST: ChecklistItem[] = [
  {
    id: 'config-step-1-clauderc-create',
    title: '1. .clauderc 파일 생성 및 기본 설정',
    description: '프로젝트 루트에 .clauderc 파일을 생성하고 기본 모델과 토큰 설정을 추가합니다. 이 파일은 Claude Code가 프로젝트를 이해하는 핵심 설정 파일입니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'config-step-2-clauderc-patterns',
    title: '2. .clauderc 파일 패턴 설정',
    description: 'includePatterns와 excludePatterns를 설정하여 Claude가 인식할 파일을 제어합니다. 이를 통해 토큰 사용량을 최적화하고 필요한 파일만 컨텍스트에 포함시킬 수 있습니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'config-step-3-claudemd-create',
    title: '3. CLAUDE.md 작성',
    description: '프로젝트 개요, 기술 스택, 폴더 구조, 코딩 컨벤션을 담은 CLAUDE.md를 작성합니다. 이 파일은 Claude에게 프로젝트의 맥락을 제공하여 더 정확한 답변을 받을 수 있게 합니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'config-step-4-claudeignore',
    title: '4. .claudeignore 설정',
    description: 'node_modules, dist, .next 등 불필요한 파일을 제외하여 토큰 사용량을 최적화합니다. gitignore와 유사한 패턴을 사용하여 제외할 파일을 지정할 수 있습니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'config-step-5-verify',
    title: '5. 설정 테스트 및 검증',
    description: 'Claude Code CLI로 설정이 올바르게 적용되었는지 테스트합니다. 간단한 질문을 통해 Claude가 프로젝트 컨텍스트를 올바르게 이해하고 있는지 확인하세요.',
    isOptional: false,
    isCompleted: false,
  },
];
