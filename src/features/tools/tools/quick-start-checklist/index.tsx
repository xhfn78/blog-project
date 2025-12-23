'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { useChecklistState } from './hooks/use-checklist-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { TroubleshootingSection } from './components/troubleshooting-section';

/**
 * Claude Code CLI 빠른 시작 체크리스트 도구
 *
 * Claude Code CLI 설치부터 첫 프로젝트 시작까지 단계별 가이드를 제공합니다.
 * localStorage를 사용하여 완료 상태를 자동으로 저장합니다.
 */
export default function QuickStartChecklistTool() {
  const { checklistItems, toggleItem, resetAll, progress } = useChecklistState();

  return (
    <ToolLayout config={config}>
      {/* 진행률 섹션 */}
      <ToolSection
        title="진행률"
        description="체크리스트를 완료하면 자동으로 저장됩니다"
      >
        <ProgressIndicator current={progress.completed} total={progress.total} />
      </ToolSection>

      {/* 체크리스트 섹션 */}
      <ToolSection
        title="설정 단계"
        description="각 단계를 따라하며 체크하세요. 명령어는 복사 버튼으로 쉽게 복사할 수 있습니다."
      >
        <div className="space-y-3">
          {checklistItems.map(item => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={resetAll}
            className="text-sm"
          >
            전체 초기화
          </Button>
        </div>
      </ToolSection>

      {/* 트러블슈팅 FAQ 섹션 */}
      <ToolSection
        title="트러블슈팅 & FAQ"
        description="자주 발생하는 문제와 해결 방법입니다"
      >
        <TroubleshootingSection />
      </ToolSection>

      {/* 시리즈 네비게이션 */}
      <ToolSection title="Claude Code 가이드 시리즈">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">2편: 설정 마스터 가이드</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    설치를 완료했다면 .clauderc와 CLAUDE.md를 최적화하세요.
                  </p>
                  <Link href="/claude/claude-config-master">
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
                <Zap className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">3편: 실전 워크플로우 & 최적화</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    설정을 마쳤다면 실전 워크플로우와 비용 최적화를 배워보세요.
                  </p>
                  <Link href="/claude/claude-workflows-optimization">
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

      {/* SEO 콘텐츠 - 도구 설명 */}
      <ToolSection title="사용 방법">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            이 도구는 Claude Code CLI를 처음 설치하고 설정하는 과정을 단계별로 안내합니다.
            각 단계마다 필요한 명령어와 설명이 제공되며, 복사 버튼을 클릭하여 쉽게 명령어를 복사할 수 있습니다.
          </p>
          <p>
            체크박스를 클릭하면 완료한 단계를 표시할 수 있으며, 완료 상태는 브라우저의 로컬 스토리지에 자동으로 저장됩니다.
            나중에 다시 방문해도 이전 진행 상황이 그대로 유지됩니다.
          </p>
          <p>
            &quot;선택&quot; 배지가 표시된 단계는 필수가 아닌 선택적 단계입니다. 기본적인 사용만 원한다면 건너뛰어도 됩니다.
          </p>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 완벽 가이드 */}
      <ToolSection title="Claude Code CLI 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>Claude Code CLI란?</h3>
          <p>
            Claude Code CLI는 Anthropic에서 제공하는 명령줄 인터페이스 도구로, 터미널에서 직접 Claude AI와 대화하고 코드 작성을 도울 수 있습니다.
            개발자들이 IDE를 벗어나지 않고도 AI의 도움을 받을 수 있으며, 프로젝트 컨텍스트를 유지하면서 효율적으로 작업할 수 있습니다.
          </p>

          <h3>주요 기능</h3>
          <ul>
            <li><strong>대화형 AI 지원</strong>: 터미널에서 직접 Claude와 대화하며 코드 작성, 디버깅, 설명을 요청할 수 있습니다.</li>
            <li><strong>프로젝트 컨텍스트 인식</strong>: 현재 작업 중인 프로젝트의 파일과 구조를 이해하고 관련된 도움을 제공합니다.</li>
            <li><strong>MCP 프로토콜 지원</strong>: Model Context Protocol을 통해 외부 도구 및 데이터베이스와 연동할 수 있습니다.</li>
            <li><strong>IDE 통합</strong>: VS Code 등 주요 IDE와 통합하여 더욱 편리한 워크플로우를 구성할 수 있습니다.</li>
            <li><strong>멀티모달 지원</strong>: 텍스트뿐만 아니라 이미지 분석 등 다양한 형태의 입력을 처리할 수 있습니다.</li>
          </ul>

          <h3>설치 전 준비사항</h3>
          <p>
            Claude Code CLI를 사용하기 전에 다음 사항을 확인하세요:
          </p>
          <ul>
            <li><strong>Node.js 18 이상</strong>: 최신 LTS 버전 권장 (Node.js 20 이상)</li>
            <li><strong>npm 또는 yarn</strong>: 패키지 관리자가 설치되어 있어야 합니다</li>
            <li><strong>Anthropic API 키</strong>: Anthropic 콘솔에서 발급받을 수 있습니다 (https://console.anthropic.com/)</li>
            <li><strong>터미널 접근 권한</strong>: macOS/Linux에서는 기본 터미널, Windows에서는 PowerShell 또는 WSL2 권장</li>
          </ul>

          <h3>상세 설치 가이드</h3>
          <h4>1단계: Node.js 확인</h4>
          <p>
            먼저 Node.js가 올바른 버전으로 설치되어 있는지 확인합니다.
            터미널에서 <code>node --version</code> 명령어를 실행하면 현재 설치된 Node.js 버전을 확인할 수 있습니다.
            v18.0.0 이상이어야 하며, v20.0.0 이상을 권장합니다.
          </p>
          <p>
            버전이 낮거나 Node.js가 설치되어 있지 않다면, Node.js 공식 웹사이트(https://nodejs.org/)에서 LTS 버전을 다운로드하여 설치하거나,
            nvm(Node Version Manager)을 사용하여 설치할 수 있습니다.
          </p>

          <h4>2단계: CLI 설치</h4>
          <p>
            npm을 통해 Claude Code CLI를 전역으로 설치합니다.
            <code>npm install -g @anthropic-ai/claude-code-cli</code> 명령어를 실행하면 시스템 전역에 설치되어 어디서든 <code>claude-code</code> 명령어를 사용할 수 있게 됩니다.
          </p>
          <p>
            설치가 완료되면 <code>claude-code --version</code> 명령어로 정상적으로 설치되었는지 확인할 수 있습니다.
          </p>

          <h4>3단계: API 키 설정</h4>
          <p>
            Anthropic API 키를 환경 변수로 설정해야 합니다.
            임시로 사용하려면 터미널에서 <code>export ANTHROPIC_API_KEY=your-api-key-here</code>를 실행하면 되지만,
            매번 설정해야 하므로 영구적으로 사용하려면 셸 설정 파일(.bashrc, .zshrc 등)에 추가하는 것을 권장합니다.
          </p>
          <p>
            또는 프로젝트 디렉터리에 .env 파일을 생성하고 <code>ANTHROPIC_API_KEY=your-api-key-here</code>를 추가할 수도 있습니다.
          </p>

          <h4>4-5단계: 프로젝트 초기화 및 테스트</h4>
          <p>
            새 프로젝트를 시작하려면 원하는 디렉터리를 만들고 <code>claude-code init</code> 명령어를 실행합니다.
            이렇게 하면 프로젝트별 설정 파일이 생성되며, Claude Code CLI가 해당 프로젝트의 컨텍스트를 이해할 수 있게 됩니다.
          </p>
          <p>
            설정이 완료되면 <code>claude-code ask &quot;Hello Claude&quot;</code>와 같은 간단한 명령어로 작동을 테스트해볼 수 있습니다.
          </p>

          <h3>고급 설정 옵션</h3>
          <h4>MCP 서버 설정 (선택사항)</h4>
          <p>
            Model Context Protocol (MCP)은 Claude가 외부 도구와 통신할 수 있게 해주는 프로토콜입니다.
            파일 시스템 접근, 데이터베이스 쿼리, API 호출 등 다양한 확장 기능을 사용할 수 있습니다.
            <code>claude-code mcp install</code> 명령어로 기본 MCP 서버를 설치할 수 있습니다.
          </p>

          <h4>IDE 통합 (선택사항)</h4>
          <p>
            VS Code를 사용한다면 마켓플레이스에서 &quot;Claude Code&quot; 확장 프로그램을 검색하여 설치할 수 있습니다.
            이를 통해 에디터 내에서 직접 Claude와 대화하고 코드 제안을 받을 수 있습니다.
            단축키 설정을 통해 더욱 빠른 워크플로우를 만들 수 있습니다.
          </p>

          <h3>자주 묻는 질문</h3>
          <h4>Q: API 사용료는 어떻게 되나요?</h4>
          <p>
            Claude API는 사용량에 따라 요금이 부과됩니다. 모델과 토큰 수에 따라 가격이 다르며,
            Anthropic 콘솔에서 사용량과 비용을 실시간으로 확인할 수 있습니다.
            개발 중에는 테스트 크레딧을 사용할 수 있습니다.
          </p>

          <h4>Q: 오프라인에서도 사용할 수 있나요?</h4>
          <p>
            아니요, Claude Code CLI는 Anthropic API를 호출하므로 인터넷 연결이 필요합니다.
            모든 요청은 Anthropic 서버로 전송되어 처리됩니다.
          </p>

          <h4>Q: 프로젝트 파일이 Anthropic으로 전송되나요?</h4>
          <p>
            기본적으로 Claude Code는 사용자가 명시적으로 제공한 컨텍스트만 전송합니다.
            전체 프로젝트 파일이 자동으로 전송되지는 않으며, 필요한 파일만 선택적으로 공유할 수 있습니다.
            민감한 정보가 포함된 파일은 .claudeignore 파일을 통해 제외할 수 있습니다.
          </p>

          <h4>Q: 여러 프로젝트에서 동시에 사용할 수 있나요?</h4>
          <p>
            네, 각 프로젝트 디렉터리에서 독립적으로 Claude Code를 초기화하고 사용할 수 있습니다.
            각 프로젝트는 고유한 설정과 컨텍스트를 가지며 서로 간섭하지 않습니다.
          </p>

          <h3>추가 리소스</h3>
          <ul>
            <li><strong>공식 문서</strong>: https://docs.anthropic.com/claude-code</li>
            <li><strong>GitHub 저장소</strong>: 예제 코드와 이슈 트래킹</li>
            <li><strong>커뮤니티 포럼</strong>: 다른 개발자들과 팁 공유</li>
            <li><strong>API 문서</strong>: Claude API 전체 레퍼런스</li>
          </ul>

          <p className="mt-6 p-4 bg-accent/50 rounded-lg text-sm">
            <strong>💡 팁:</strong> Claude Code CLI를 최대한 활용하려면 명확하고 구체적인 질문을 하세요.
            프로젝트의 컨텍스트를 충분히 제공하고, 원하는 결과를 명확히 설명하면 더 정확한 답변을 받을 수 있습니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
