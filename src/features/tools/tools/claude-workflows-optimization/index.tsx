'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { useWorkflowState } from './hooks/use-workflow-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { WorkflowCard } from './components/workflow-card';
import { CostCalculator } from './components/cost-calculator';
import { OptimizationTips } from './components/optimization-tips';
import { WORKFLOW_DETAILS } from './lib/workflow-data';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { RotateCcw, Settings, Zap, Terminal } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';

export default function ClaudeWorkflowsOptimizationTool() {
  const { checklistItems, toggleItem, resetAll, progress } = useWorkflowState();

  return (
    <ToolLayout config={config}>
      {/* 진행률 */}
      <ToolSection title="학습 진행률">
        <div className="space-y-4">
          <ProgressIndicator current={progress.completed} total={progress.total} />
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw className="h-4 w-4 mr-2" />
              진행률 초기화
            </Button>
          </div>
        </div>
      </ToolSection>

      {/* 워크플로우 체크리스트 */}
      <ToolSection
        title="워크플로우 학습 체크리스트"
        description="6가지 필수 워크플로우를 단계별로 학습하세요. 각 항목을 완료하면 자동으로 저장됩니다."
      >
        <div className="space-y-3">
          {checklistItems.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </ToolSection>

      {/* 시리즈 네비게이션 */}
      <ToolSection title="Claude Code 가이드 시리즈">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">1편: CLI 빠른 시작 가이드</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    아직 CLI 설치를 안 하셨나요? 5분 만에 시작하세요.
                  </p>
                  <Link href="/utility/quick-start-checklist">
                    <Button variant="outline" size="sm">
                      가이드 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">2편: 설정 마스터 가이드</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    설정이 최적화되지 않았다면 먼저 확인하세요.
                  </p>
                  <Link href="/utility/claude-config-master">
                    <Button variant="outline" size="sm">
                      가이드 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolSection>

      {/* 워크플로우 상세 가이드 */}
      <ToolSection
        title="워크플로우 상세 가이드"
        description="각 워크플로우의 단계별 실행 방법, 명령어, 실전 팁을 확인하세요."
      >
        <div className="space-y-4">
          {WORKFLOW_DETAILS.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </ToolSection>

      {/* 비용 계산기 */}
      <ToolSection
        title="Claude API 비용 계산기"
        description="토큰 사용량을 입력하여 예상 비용을 미리 계산하고 예산을 관리하세요."
      >
        <CostCalculator />
      </ToolSection>

      {/* 비용 최적화 전략 */}
      <ToolSection
        title="비용 최적화 전략"
        description="토큰 사용량을 줄이고 효율적으로 Claude Code를 활용하는 방법을 배우세요."
      >
        <OptimizationTips />
      </ToolSection>

      {/* 고급 팁 */}
      <ToolSection title="고급 활용 팁">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Skills 활용하기</h4>
              <p className="text-sm text-muted-foreground mb-2">
                반복적인 작업은 Skills로 만들어 단축어로 실행하세요.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>/commit - 자동 커밋 메시지 생성</li>
                <li>/review-pr - 코드 리뷰 자동화</li>
                <li>/test - 테스트 케이스 생성</li>
                <li>/doc - 문서 자동 생성</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">멀티파일 작업</h4>
              <p className="text-sm text-muted-foreground mb-2">
                여러 파일을 한 번에 수정해야 할 때는 명확한 컨텍스트를 제공하세요.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>파일 구조를 먼저 설명하세요</li>
                <li>변경이 필요한 파일 목록을 명시하세요</li>
                <li>파일 간 의존성을 설명하세요</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">트러블슈팅</h4>
              <p className="text-sm text-muted-foreground mb-2">
                문제가 발생하면 다음 순서로 확인하세요.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>에러 메시지 전체를 Claude에게 공유</li>
                <li>재현 가능한 최소 예제(MRE) 작성</li>
                <li>환경 정보(OS, Node 버전 등) 포함</li>
                <li>.clauderc와 CLAUDE.md 설정 재확인</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">도구 개발 (Vlog 프로젝트)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Vlog 플랫폼에서 새로운 도구를 개발하는 특화된 워크플로우입니다.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>npm run create-tool 명령어로 scaffold 생성</li>
                <li>tool.config.ts에서 메타데이터 설정</li>
                <li>Claude에게 요구사항 설명하여 컴포넌트 구현</li>
                <li>기존 도구(quick-start-checklist, claude-config-master)를 참고</li>
                <li>localStorage로 사용자 상태 저장</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </ToolSection>

      {/* 사용 방법 (SEO) */}
      <ToolSection title="이 가이드를 최대한 활용하는 방법">
        <div className="prose prose-sm max-w-none">
          <h3>1. 순서대로 학습하기</h3>
          <p>
            6가지 워크플로우를 순서대로 학습하면서 체크리스트를 완료하세요. 각 워크플로우는
            독립적으로 사용할 수 있지만, 순서대로 학습하면 Claude Code의 전체적인 활용법을
            체계적으로 이해할 수 있습니다.
          </p>

          <h3>2. 실전 프로젝트에 바로 적용하기</h3>
          <p>
            학습한 워크플로우를 실제 프로젝트에 바로 적용해보세요. 버그 수정, 리팩토링,
            코드 리뷰 등 일상적인 개발 작업에서 Claude Code를 활용하면서 익숙해질 수 있습니다.
          </p>

          <h3>3. 비용 계산기로 예산 관리하기</h3>
          <p>
            프로젝트 규모와 예상 토큰 사용량을 입력하여 월간 비용을 미리 계산하세요.
            Haiku, Sonnet, Opus 중 어떤 모델을 선택할지 결정하는 데 도움이 됩니다.
            작은 작업은 Haiku로, 복잡한 작업은 Sonnet이나 Opus로 처리하는 하이브리드 전략을
            추천합니다.
          </p>

          <h3>4. 최적화 전략 적용하기</h3>
          <p>
            비용 최적화 섹션의 팁을 하나씩 적용해보세요. .claudeignore로 불필요한 파일을 제외하고,
            CLAUDE.md로 반복 설명을 줄이고, 명확한 질문으로 불필요한 토큰 사용을 줄이면
            30-50% 이상의 토큰을 절약할 수 있습니다.
          </p>

          <h3>5. Skills와 워크플로우 자동화</h3>
          <p>
            자주 반복하는 작업은 Skills로 만들어 단축어로 실행하세요. /commit, /review-pr 등의
            기본 Skills 외에도 프로젝트에 맞는 커스텀 Skills를 만들면 생산성이 크게 향상됩니다.
          </p>

          <h3>6. 도구 개발로 워크플로우 확장하기 (Vlog)</h3>
          <p>
            Vlog 플랫폼에서는 npm run create-tool 명령어로 새로운 개발자 도구를 쉽게 만들 수 있습니다.
            학습한 워크플로우를 활용하여 팀에 필요한 맞춤형 도구를 개발하고 공유하세요.
            이 가이드 자체도 같은 워크플로우로 만들어졌습니다.
          </p>

          <h3>7. 지속적인 모니터링과 개선</h3>
          <p>
            Claude Code 사용 패턴을 주기적으로 모니터링하고 개선하세요. 어떤 워크플로우에서
            토큰을 많이 사용하는지, 어떤 질문이 효율적인지 분석하여 점진적으로 최적화할 수 있습니다.
          </p>
        </div>
      </ToolSection>

      {/* FAQ (SEO) */}
      <ToolSection title="자주 묻는 질문">
        <div className="prose prose-sm max-w-none">
          <h3>Q1. 어떤 모델을 선택해야 하나요?</h3>
          <p>
            <strong>Haiku</strong>는 간단한 코드 리뷰, 문법 수정, 포매팅에 적합합니다.
            <strong>Sonnet</strong>은 일반적인 개발 작업, 버그 수정, 리팩토링에 가장 균형잡힌 선택입니다.
            <strong>Opus</strong>는 복잡한 아키텍처 설계, 대규모 코드베이스 분석이 필요할 때 사용하세요.
            대부분의 경우 Sonnet으로 시작하는 것을 추천합니다.
          </p>

          <h3>Q2. 토큰을 어떻게 절약할 수 있나요?</h3>
          <p>
            가장 효과적인 방법은 .claudeignore로 불필요한 파일을 제외하는 것입니다.
            node_modules, dist, build 디렉토리는 반드시 제외하세요. CLAUDE.md를 작성하여
            프로젝트 구조를 한 번만 설명하고, 명확하고 구체적인 질문으로 불필요한 반복을 줄이세요.
            이 방법들을 조합하면 30-50% 이상의 토큰을 절약할 수 있습니다.
          </p>

          <h3>Q3. 워크플로우를 어떤 순서로 학습해야 하나요?</h3>
          <p>
            체크리스트 순서대로 학습하는 것을 추천합니다. 버그 수정 워크플로우부터 시작하면
            기본적인 Claude Code 사용법을 익힐 수 있고, 리팩토링과 코드 리뷰 워크플로우로
            진행하면서 더 복잡한 작업을 다루는 방법을 배울 수 있습니다. 도구 개발 워크플로우는
            Vlog 프로젝트 전용이므로 필요한 경우에만 학습하세요.
          </p>

          <h3>Q4. 비용 계산기의 가격은 정확한가요?</h3>
          <p>
            2025년 1월 기준 공식 Anthropic API 가격을 사용합니다. 실제 비용은 프로모션, 볼륨 할인,
            환율 변동 등에 따라 달라질 수 있습니다. 정확한 가격은 Anthropic 공식 웹사이트에서
            확인하세요.
          </p>

          <h3>Q5. Skills를 직접 만들 수 있나요?</h3>
          <p>
            네, Claude Code는 커스텀 Skills 생성을 지원합니다. .claude/skills 디렉토리에
            YAML 형식으로 Skills를 정의하면 단축어로 실행할 수 있습니다. 자주 반복하는
            작업(테스트 실행, 배포, 문서 생성 등)을 Skills로 만들면 생산성이 크게 향상됩니다.
          </p>

          <h3>Q6. 대규모 코드베이스에서는 어떻게 사용하나요?</h3>
          <p>
            대규모 프로젝트에서는 .clauderc의 includePatterns를 활용하여 필요한 디렉토리만
            컨텍스트에 포함하세요. 전체 코드베이스를 한 번에 분석하기보다는, 특정 모듈이나
            기능 단위로 나누어서 작업하는 것이 효율적입니다. CLAUDE.md에 프로젝트 구조와
            주요 디렉토리 설명을 추가하면 Claude가 더 정확하게 이해할 수 있습니다.
          </p>

          <h3>Q7. Vlog 도구 개발 워크플로우는 무엇인가요?</h3>
          <p>
            Vlog 플랫폼에서 제공하는 특별한 워크플로우입니다. npm run create-tool 명령어로
            도구 scaffold를 생성하고, Claude Code에게 요구사항을 설명하여 React 컴포넌트를
            구현하면 자동으로 도구가 등록되고 라우팅됩니다. 이 가이드 시리즈(1편, 2편, 3편)도
            모두 같은 워크플로우로 만들어졌습니다.
          </p>

          <h3>Q8. 에러가 발생하면 어떻게 해야 하나요?</h3>
          <p>
            에러 메시지 전체를 Claude에게 공유하세요. 스택 트레이스, 환경 정보(OS, Node 버전),
            재현 가능한 최소 예제(MRE)를 함께 제공하면 더 정확한 해결책을 받을 수 있습니다.
            .clauderc와 CLAUDE.md 설정도 확인하세요. 대부분의 에러는 설정 문제에서 발생합니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}