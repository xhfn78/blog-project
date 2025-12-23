// 명령어 정보
export interface Command {
  id: string;
  command: string;
  description: string;
  detailedDescription?: string; // 초보자를 위한 상세 설명
  example?: string;
  expectedOutput?: string; // 예상 출력 결과
  notes?: string[];
  tips?: string[]; // 초보자 팁
  warning?: string; // 주의사항
  alternatives?: string[]; // 대안 명령어
  docsUrl?: string; // 공식 문서 링크
  isRequired?: boolean;
  isCustom?: boolean;
}

// 개발 단계 정보
export interface Phase {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide 아이콘명
  commands: Command[];
}

// 사용자 커스텀 명령어
export interface CustomCommand {
  id: string;
  phaseId: string;
  command: string;
  description: string;
  createdAt: string;
}

// 상태 관리 타입
export interface CommandMapState {
  expandedPhases: string[];
  completedCommands: string[];
  currentPhase: string;
  customCommands: CustomCommand[];
}
