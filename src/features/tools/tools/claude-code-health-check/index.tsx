'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap, Terminal, Activity, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { useDiagnosticState } from './hooks/use-diagnostic-state';
import { DiagnosticItem } from './components/diagnostic-item';
import { ProgressIndicator } from './components/progress-indicator';
import { TroubleshootingSection } from './components/troubleshooting-section';

/**
 * Claude Code 헬스 체크 도구
 *
 * Claude Code CLI 설치 상태를 진단하고 최적화 기회를 찾아냅니다.
 * localStorage를 사용하여 완료 상태를 자동으로 저장합니다.
 */
export default function ClaudeCodeHealthCheckTool() {
  const { diagnosticItems, toggleItem, resetAll, progress } = useDiagnosticState();

  return (
    <ToolLayout config={config}>
      {/* 진행률 섹션 */}
      <ToolSection
        title="진행률"
        description="진단을 완료하면 자동으로 저장됩니다"
      >
        <ProgressIndicator current={progress.completed} total={progress.total} />
      </ToolSection>

      {/* 진단 체크리스트 섹션 */}
      <ToolSection
        title="진단 항목"
        description="각 항목을 확인하며 체크하세요. 명령어는 복사 버튼으로 쉽게 복사할 수 있습니다."
      >
        <div className="space-y-3">
          {diagnosticItems.map(item => (
            <DiagnosticItem
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
        <div className="space-y-4">
          {/* 기본 가이드 */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">기본 가이드</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Terminal className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">1편</div>
                      <h4 className="font-semibold mb-1">CLI 빠른 시작</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        5분 만에 Claude Code 설치하고 시작하기
                      </p>
                      <Link href="/claude/quick-start-checklist">
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
                      <div className="text-xs text-muted-foreground mb-1">2편</div>
                      <h4 className="font-semibold mb-1">설정 마스터 가이드</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        .clauderc와 CLAUDE.md 최적화하기
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
                      <div className="text-xs text-muted-foreground mb-1">3편</div>
                      <h4 className="font-semibold mb-1">워크플로우 최적화</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        실전 워크플로우와 비용 최적화
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
          </div>

          {/* 고급 도구 (NEW) */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-primary">고급 도구 (NEW)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-primary font-semibold mb-1">현재 페이지</div>
                      <h4 className="font-semibold mb-1">헬스 체크</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        설치 상태 종합 진단
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">실시간 분석</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        생산성 메트릭 추적
                      </p>
                      <Link href="/claude/claude-code-analytics">
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
                    <MessageSquare className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">대화 모니터링</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI 추론 과정 분석
                      </p>
                      <Link href="/claude/claude-conversation-monitor">
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
                    <Package className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">플러그인 대시보드</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        플러그인 시각적 관리
                      </p>
                      <Link href="/claude/claude-plugin-dashboard">
                        <Button variant="outline" size="sm">
                          가이드 보기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 도구 설명 */}
      <ToolSection title="사용 방법">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            이 도구는 Claude Code CLI의 설치 및 설정 상태를 종합적으로 진단합니다.
            각 진단 항목마다 실행해야 할 명령어, 성공 기준, 문제 해결 힌트가 제공되어
            초보자도 쉽게 따라할 수 있습니다.
          </p>
          <p>
            체크박스를 클릭하여 완료한 항목을 표시할 수 있으며, 진단 상태는 브라우저의
            로컬 스토리지에 자동으로 저장됩니다. 나중에 다시 방문해도 이전 진행 상황이
            그대로 유지되므로 여러 번에 걸쳐 진단을 완료할 수 있습니다.
          </p>
          <p>
            &quot;선택&quot; 배지가 표시된 항목은 필수가 아닌 선택적 진단 항목입니다.
            기본적인 사용만 원한다면 건너뛰어도 무방하지만, 고급 기능을 활용하려면
            완료하는 것을 권장합니다.
          </p>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 완벽 가이드 */}
      <ToolSection title="Claude Code 헬스 체크 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>Claude Code 헬스 체크란?</h3>
          <p>
            Claude Code 헬스 체크는 개발 환경에서 Claude Code CLI가 올바르게 설치되고
            최적화된 상태로 작동하는지 확인하는 진단 도구입니다. 7가지 핵심 진단 항목을
            통해 시스템 구성부터 성능 최적화까지 포괄적으로 검증합니다.
          </p>

          <h3>왜 헬스 체크가 필요한가?</h3>
          <p>
            Claude Code를 설치했다고 해서 모든 것이 완벽하게 작동하는 것은 아닙니다.
            Node.js 버전 불일치, PATH 설정 누락, API 키 미설정 등 다양한 문제가
            발생할 수 있으며, 이러한 문제들은 Claude Code의 성능과 안정성에 직접적인
            영향을 미칩니다.
          </p>
          <p>
            정기적인 헬스 체크를 통해:
          </p>
          <ul>
            <li><strong>설치 문제 조기 발견</strong>: 잠재적인 설정 오류를 미리 파악</li>
            <li><strong>성능 최적화</strong>: 응답 속도와 토큰 효율성 개선</li>
            <li><strong>안정성 향상</strong>: 예기치 않은 오류 방지</li>
            <li><strong>비용 절감</strong>: 불필요한 API 호출 감소</li>
          </ul>

          <h3>진단 항목 상세 설명</h3>

          <h4>1. Node.js 버전 확인</h4>
          <p>
            Claude Code CLI는 Node.js 런타임에서 실행되므로 적절한 버전의 Node.js가
            필수입니다. 최소 요구사항은 v18.0.0이지만, v20.0.0 이상을 권장합니다.
            최신 버전일수록 성능이 우수하고 보안 패치가 적용되어 있습니다.
          </p>
          <p>
            nvm(Node Version Manager)을 사용하면 여러 Node.js 버전을 쉽게 관리할 수
            있습니다. 프로젝트마다 다른 Node.js 버전이 필요한 경우 특히 유용합니다.
          </p>

          <h4>2. Claude Code CLI 설치 확인</h4>
          <p>
            CLI가 전역으로 설치되어 있고 시스템 PATH에 등록되어 있어야 터미널
            어디서든 claude-code 명령어를 사용할 수 있습니다. 설치 경로나 PATH
            설정에 문제가 있으면 &quot;command not found&quot; 오류가 발생합니다.
          </p>

          <h4>3. API 키 설정 확인</h4>
          <p>
            Anthropic API 키는 Claude Code가 Claude AI와 통신하기 위해 반드시 필요합니다.
            환경 변수(ANTHROPIC_API_KEY)로 설정하거나 .env 파일에 저장할 수 있습니다.
            API 키는 Anthropic 콘솔(console.anthropic.com)에서 발급받을 수 있으며,
            sk-로 시작하는 문자열입니다.
          </p>
          <p>
            보안을 위해 API 키를 코드에 직접 하드코딩하지 말고 환경 변수나 .env 파일을
            사용하세요. 또한 .gitignore에 .env 파일을 추가하여 버전 관리 시스템에
            포함되지 않도록 주의해야 합니다.
          </p>

          <h4>4. 프로젝트 초기화 상태 확인</h4>
          <p>
            claude-code init 명령으로 프로젝트를 초기화하면 .clauderc 설정 파일이
            생성됩니다. 이 파일은 프로젝트별 Claude Code 설정을 담고 있으며,
            max_tokens, temperature 등의 파라미터를 조정할 수 있습니다.
          </p>

          <h4>5. 기본 명령어 동작 확인</h4>
          <p>
            실제로 Claude Code가 작동하는지 테스트 명령어를 실행하여 검증합니다.
            --help 옵션으로 사용 가능한 명령어 목록을 확인하고, ask 명령으로
            간단한 질문을 던져 응답을 받아봅니다.
          </p>

          <h4>6. MCP 서버 설정 (선택)</h4>
          <p>
            Model Context Protocol(MCP)은 Claude가 파일 시스템, 데이터베이스,
            웹 API 등 외부 리소스와 상호작용할 수 있게 해주는 프로토콜입니다.
            기본 사용에는 필수가 아니지만, 고급 자동화 워크플로우를 구현하려면
            MCP 서버 설정이 필요합니다.
          </p>

          <h4>7. 성능 최적화 설정 (선택)</h4>
          <p>
            .clauderc 파일에서 max_tokens, temperature 등의 파라미터를 조정하여
            응답 속도와 품질을 최적화할 수 있습니다. 또한 .claudeignore 파일로
            불필요한 파일을 컨텍스트에서 제외하면 토큰 사용량을 크게 줄일 수 있습니다.
          </p>

          <h3>일반적인 문제와 해결 방법</h3>

          <h4>PATH 문제</h4>
          <p>
            claude-code 명령어를 찾을 수 없다는 오류가 가장 흔합니다.
            npm global bin 경로가 시스템 PATH에 포함되어 있는지 확인하고,
            필요하면 .bashrc나 .zshrc에 export PATH 명령을 추가하세요.
          </p>

          <h4>API 인증 오류</h4>
          <p>
            API 키가 올바르게 설정되었는지, 만료되지 않았는지 확인하세요.
            또한 Anthropic 콘솔에서 API 사용량 한도를 초과하지 않았는지도
            점검해야 합니다.
          </p>

          <h4>성능 저하</h4>
          <p>
            응답이 느리다면 .claudeignore로 대용량 파일이나 불필요한 디렉터리
            (node_modules, .git, dist 등)를 제외하세요. 컨텍스트 크기를 줄이면
            응답 속도가 크게 향상됩니다.
          </p>

          <h3>권장 워크플로우</h3>
          <ol>
            <li><strong>초기 진단</strong>: Claude Code를 처음 설치한 후 전체 진단 실행</li>
            <li><strong>정기 체크</strong>: 월 1회 정도 헬스 체크를 통해 상태 확인</li>
            <li><strong>문제 발생 시</strong>: 오류가 발생하면 즉시 관련 진단 항목 확인</li>
            <li><strong>업데이트 후</strong>: CLI를 업데이트한 후 호환성 확인</li>
          </ol>

          <h3>추가 리소스</h3>
          <ul>
            <li><strong>공식 문서</strong>: https://docs.anthropic.com/claude-code</li>
            <li><strong>MCP 프로토콜</strong>: https://docs.anthropic.com/mcp</li>
            <li><strong>서비스 상태</strong>: https://status.anthropic.com/</li>
            <li><strong>API 콘솔</strong>: https://console.anthropic.com/</li>
          </ul>

          <p className="mt-6 p-4 bg-accent/50 rounded-lg text-sm">
            <strong>💡 팁:</strong> 헬스 체크는 일회성이 아니라 지속적인 프로세스입니다.
            정기적으로 진단을 실행하여 Claude Code가 항상 최적의 상태를 유지하도록
            관리하세요. 특히 프로젝트 규모가 커지거나 새로운 팀원이 합류할 때
            헬스 체크를 통해 모든 개발 환경이 일관되게 설정되어 있는지 확인하는 것이 좋습니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}