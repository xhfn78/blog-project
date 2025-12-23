'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap, Terminal, Activity, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { CONVERSATION_EXAMPLES } from './lib/conversation-examples';
import { ConversationExampleCard } from './components/conversation-example';
import { TroubleshootingSection } from './components/troubleshooting-section';
import { CommandBlock } from './components/command-block';

export default function ClaudeConversationMonitorTool() {
  return (
    <ToolLayout config={config}>
      <ToolSection title="도구 개요" description="Claude의 대화 패턴과 추론 과정을 이해하고 분석하세요">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Claude Conversation Monitor는 AI가 문제를 해결하는 과정을 시각화하여, 더 효과적인 프롬프트 작성 방법을 학습할 수 있게 합니다.
          </p>
        </div>
      </ToolSection>

      <ToolSection title="모니터링 실행 방법" description="실시간 대화 모니터링 명령어">
        <CommandBlock command="npx claude-code-templates@latest --chats" />
        <p className="text-sm text-muted-foreground mt-3">
          Claude의 실시간 응답과 도구 사용 패턴을 모니터링할 수 있습니다.
        </p>
      </ToolSection>

      <ToolSection title="대화 예제 분석" description="실제 대화를 통해 Claude의 사고 과정을 학습하세요">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONVERSATION_EXAMPLES.map(example => (
            <ConversationExampleCard key={example.id} example={example} />
          ))}
        </div>
      </ToolSection>

      <ToolSection title="트러블슈팅 & FAQ" description="자주 발생하는 문제와 해결 방법입니다">
        <TroubleshootingSection />
      </ToolSection>

      <ToolSection title="Claude Code 가이드 시리즈">
        <div className="space-y-4">
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
                      <p className="text-sm text-muted-foreground mb-3">5분 만에 Claude Code 설치하고 시작하기</p>
                      <Link href="/claude/quick-start-checklist"><Button variant="outline" size="sm">가이드 보기</Button></Link>
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
                      <p className="text-sm text-muted-foreground mb-3">.clauderc와 CLAUDE.md 최적화하기</p>
                      <Link href="/claude/claude-config-master"><Button variant="outline" size="sm">가이드 보기</Button></Link>
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
                      <p className="text-sm text-muted-foreground mb-3">실전 워크플로우와 비용 최적화</p>
                      <Link href="/claude/claude-workflows-optimization"><Button variant="outline" size="sm">가이드 보기</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-primary">고급 도구 (NEW)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">헬스 체크</h4>
                      <p className="text-sm text-muted-foreground mb-3">설치 상태 종합 진단</p>
                      <Link href="/claude/claude-code-health-check"><Button variant="outline" size="sm">가이드 보기</Button></Link>
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
                      <p className="text-sm text-muted-foreground mb-3">생산성 메트릭 추적</p>
                      <Link href="/claude/claude-code-analytics"><Button variant="outline" size="sm">가이드 보기</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-primary font-semibold mb-1">현재 페이지</div>
                      <h4 className="font-semibold mb-1">대화 모니터링</h4>
                      <p className="text-sm text-muted-foreground mb-3">AI 추론 과정 분석</p>
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
                      <p className="text-sm text-muted-foreground mb-3">플러그인 시각적 관리</p>
                      <Link href="/claude/claude-plugin-dashboard"><Button variant="outline" size="sm">가이드 보기</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ToolSection>

      <ToolSection title="사용 방법">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            이 도구는 Claude Code의 대화 패턴을 분석하여, AI가 어떻게 문제를 해결하는지 이해할 수 있게 합니다.
            4가지 실제 대화 예제를 통해 버그 수정, 기능 구현, 코드 리뷰, 리팩토링 시나리오에서 Claude의 추론 단계와 도구 사용 패턴을 학습하세요.
          </p>
          <p>
            각 예제는 사용자 프롬프트, Claude의 응답, 추론 단계, 사용된 도구, 핵심 인사이트로 구성되어 있어 효과적인 프롬프트 작성 방법을 익힐 수 있습니다.
          </p>
        </div>
      </ToolSection>

      <ToolSection title="Claude Conversation Monitor 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>대화 모니터링이란?</h3>
          <p>
            Claude Conversation Monitor는 AI와의 대화를 실시간으로 추적하고 분석하여, Claude가 문제를 해결하는 방식을 이해할 수 있게 합니다.
            이를 통해 더 명확하고 효과적인 프롬프트를 작성하여 생산성을 높일 수 있습니다.
          </p>

          <h3>효과적인 프롬프트 작성 원칙</h3>
          <h4>1. 구체성이 핵심</h4>
          <p>
            &quot;이 파일 수정해줘&quot; 대신 &quot;src/components/Header.tsx에서 로고 크기를 50px로 변경하고 색상을 #007bff로 바꿔줘&quot;처럼 구체적으로 요청하세요.
            Claude는 명확한 지시를 받으면 즉시 작업을 완료할 수 있습니다.
          </p>

          <h4>2. 컨텍스트 제공</h4>
          <p>
            프로젝트 구조, 사용 중인 기술 스택, 코드 컨벤션 등을 CLAUDE.md에 문서화하면 Claude가 일관된 코드를 생성합니다.
          </p>

          <h4>3. 예상 결과 명시</h4>
          <p>
            &quot;로그인 실패 시 에러 토스트 표시, 입력 필드 초기화, 포커스를 이메일 필드로 이동&quot;처럼 기대하는 동작을 상세히 설명하세요.
          </p>

          <h3>추가 리소스</h3>
          <ul>
            <li><strong>모니터링 명령어</strong>: npx claude-code-templates@latest --chats</li>
            <li><strong>로그 위치</strong>: ~/.claude-code/logs/</li>
            <li><strong>Debug 모드</strong>: claude-code --log-level=debug</li>
          </ul>

          <p className="mt-6 p-4 bg-accent/50 rounded-lg text-sm">
            <strong>💡 팁:</strong> 대화 예제를 통해 Claude의 사고 과정을 학습하고, 본인의 프롬프트와 비교하여 개선점을 찾으세요.
            명확하고 구체적인 프롬프트는 빠르고 정확한 결과를 가져옵니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}