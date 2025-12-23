/**
 * CLAUDE.md 작성 가이드 컴포넌트
 *
 * 효과적인 CLAUDE.md 작성을 위한 베스트 프랙티스를 제공합니다.
 */
export function BestPractices() {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <h3>왜 CLAUDE.md가 중요한가요?</h3>
      <p>
        CLAUDE.md는 Claude Code에게 프로젝트의 맥락을 제공하는 핵심 문서입니다.
        이 파일이 있으면:
      </p>
      <ul>
        <li><strong>토큰 절약</strong>: 반복적인 설명 없이 프로젝트 구조를 이해시킬 수 있습니다</li>
        <li><strong>정확한 답변</strong>: 프로젝트 컨벤션을 따르는 코드를 생성합니다</li>
        <li><strong>팀 협업</strong>: 일관된 코딩 스타일과 규칙을 자동으로 적용합니다</li>
      </ul>

      <h3>효과적인 CLAUDE.md 구조</h3>

      <h4>1. 프로젝트 개요 (Project Overview)</h4>
      <p>
        프로젝트가 무엇을 하는지 1-2문장으로 명확히 설명합니다.
        기술 스택과 주요 기능을 간단히 언급하세요.
      </p>

      <h4>2. 주요 명령어 (Key Commands)</h4>
      <p>
        개발, 빌드, 테스트 등 자주 사용하는 명령어를 코드 블록으로 정리합니다.
        Claude가 명령어를 제안할 때 프로젝트에 맞는 명령어를 사용하게 됩니다.
      </p>

      <h4>3. 아키텍처 (Architecture)</h4>
      <p>
        프로젝트의 폴더 구조와 주요 디렉토리의 역할을 설명합니다.
        ASCII 트리 형태로 시각화하면 이해하기 쉽습니다.
      </p>

      <h4>4. 코딩 컨벤션 (Coding Conventions)</h4>
      <p>
        팀에서 따르는 코딩 스타일과 규칙을 명시합니다. 예를 들어:
      </p>
      <ul>
        <li>TypeScript strict mode 사용</li>
        <li>함수형 컴포넌트 선호</li>
        <li>Named export vs Default export 정책</li>
        <li>파일명 규칙 (kebab-case, PascalCase 등)</li>
      </ul>

      <h4>5. 금지 사항 (Don&apos;ts)</h4>
      <p>
        하지 말아야 할 것들을 명확히 나열합니다. 예를 들어:
      </p>
      <ul>
        <li>main 브랜치에 직접 커밋 금지</li>
        <li>any 타입 사용 지양</li>
        <li>테스트 없이 커밋 금지</li>
      </ul>

      <h3>실전 팁</h3>
      <div className="not-prose p-4 bg-accent/50 rounded-lg space-y-2">
        <p className="text-sm"><strong>💡 팁 1:</strong> CLAUDE.md는 너무 길 필요 없습니다. 핵심 정보만 간결하게 담으세요.</p>
        <p className="text-sm"><strong>💡 팁 2:</strong> 프로젝트가 변경되면 CLAUDE.md도 함께 업데이트하세요.</p>
        <p className="text-sm"><strong>💡 팁 3:</strong> 실제 Vlog 프로젝트의 CLAUDE.md를 참고하면 도움이 됩니다.</p>
        <p className="text-sm"><strong>💡 팁 4:</strong> 마크다운 포맷을 활용하여 가독성을 높이세요.</p>
      </div>
    </div>
  );
}
