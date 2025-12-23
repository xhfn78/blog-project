'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap, Terminal, Activity, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { PLUGIN_EXAMPLES } from './lib/plugin-data';
import { PluginCard } from './components/plugin-card';
import { TroubleshootingSection } from './components/troubleshooting-section';
import { CommandBlock } from './components/command-block';

export default function ClaudePluginDashboardTool() {
  return (
    <ToolLayout config={config}>
      <ToolSection title="도구 개요" description="플러그인 관리 및 확장 기능을 알아보세요">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Claude Plugin Dashboard는 다양한 플러그인과 확장 기능을 통해 Claude Code의 기능을 확장하는 방법을 소개합니다.
            MCP 서버, IDE 확장, 마켓플레이스 플러그인, 커스텀 도구까지 모든 플러그인을 한눈에 확인할 수 있습니다.
          </p>
        </div>
      </ToolSection>

      <ToolSection title="대시보드 실행 방법" description="플러그인 관리 대시보드 명령어">
        <CommandBlock command="npx claude-code-templates@latest --plugins" />
        <p className="text-sm text-muted-foreground mt-3">
          설치된 플러그인 목록, 활성화 상태, 버전 정보를 시각적으로 확인할 수 있습니다.
        </p>
      </ToolSection>

      <ToolSection title="플러그인 카테고리" description="사용 가능한 다양한 플러그인을 확인하세요">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLUGIN_EXAMPLES.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">대화 모니터링</h4>
                      <p className="text-sm text-muted-foreground mb-3">AI 추론 과정 분석</p>
                      <Link href="/claude/claude-conversation-monitor"><Button variant="outline" size="sm">가이드 보기</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-primary font-semibold mb-1">현재 페이지</div>
                      <h4 className="font-semibold mb-1">플러그인 대시보드</h4>
                      <p className="text-sm text-muted-foreground mb-3">플러그인 시각적 관리</p>
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
            이 도구는 Claude Code에서 사용할 수 있는 다양한 플러그인과 확장 기능을 소개합니다.
            MCP 서버를 통해 파일 시스템, 데이터베이스, 웹 API 등 외부 리소스에 접근할 수 있으며,
            IDE 확장을 통해 에디터 내에서 직접 Claude를 사용할 수 있습니다.
          </p>
          <p>
            각 플러그인 카드에는 설명, 설치 명령어, 문서 링크가 포함되어 있어 필요한 플러그인을 쉽게 찾아 설치할 수 있습니다.
          </p>
        </div>
      </ToolSection>

      <ToolSection title="Claude Plugin Dashboard 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>플러그인 시스템이란?</h3>
          <p>
            Claude Plugin Dashboard는 Claude Code의 기능을 확장하는 다양한 플러그인을 관리하는 인터페이스입니다.
            MCP(Model Context Protocol) 서버, IDE 확장, 마켓플레이스 플러그인, 커스텀 도구까지 모든 확장 기능을 통합 관리할 수 있습니다.
          </p>

          <h3>플러그인 카테고리</h3>
          <h4>1. MCP 서버</h4>
          <p>
            Model Context Protocol을 사용하는 서버 플러그인입니다. Claude가 파일 시스템, 데이터베이스, 웹 API 등
            외부 리소스와 상호작용할 수 있게 합니다. 예: Filesystem MCP, Database MCP, Web API MCP
          </p>

          <h4>2. IDE 확장</h4>
          <p>
            VS Code, JetBrains 등 IDE에서 Claude Code를 사용할 수 있게 하는 확장 프로그램입니다.
            에디터 내에서 직접 코드를 선택하고 Claude에게 수정을 요청할 수 있습니다.
          </p>

          <h4>3. 마켓플레이스 플러그인</h4>
          <p>
            커뮤니티에서 제작한 다양한 플러그인입니다. Git 작업 자동화, Docker 관리, 배포 자동화 등
            특정 작업을 자동화하는 도구들이 포함됩니다.
          </p>

          <h4>4. 커스텀 도구</h4>
          <p>
            프로젝트별로 직접 제작한 커스텀 도구입니다. Claude Agent SDK를 사용하여 프로젝트 특화 기능을 개발할 수 있습니다.
          </p>

          <h3>추가 리소스</h3>
          <ul>
            <li><strong>대시보드 명령어</strong>: npx claude-code-templates@latest --plugins</li>
            <li><strong>MCP 문서</strong>: https://docs.anthropic.com/mcp</li>
            <li><strong>Agent SDK</strong>: https://docs.anthropic.com/claude-agent-sdk</li>
            <li><strong>설정 파일</strong>: ~/.claude-code/.clauderc</li>
          </ul>

          <p className="mt-6 p-4 bg-accent/50 rounded-lg text-sm">
            <strong>💡 팁:</strong> 플러그인은 필요한 것만 활성화하세요. 너무 많은 플러그인은 응답 속도를 느리게 만들 수 있습니다.
            프로젝트별로 필요한 플러그인을 선별하여 사용하는 것이 효율적입니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}