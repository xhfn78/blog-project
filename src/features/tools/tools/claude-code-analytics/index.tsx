'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap, Terminal, Activity, MessageSquare, Package } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { TRACKED_METRICS } from './lib/metrics-data';
import { MetricCard } from './components/metric-card';
import { TroubleshootingSection } from './components/troubleshooting-section';
import { CommandBlock } from './components/command-block';

/**
 * Claude Code Analytics 도구
 *
 * Claude Code의 실시간 분석 및 모니터링 메트릭을 설명합니다.
 */
export default function ClaudeCodeAnalyticsTool() {
  return (
    <ToolLayout config={config}>
      {/* 개요 섹션 */}
      <ToolSection
        title="도구 개요"
        description="Analytics를 통해 추적할 수 있는 성능 지표와 그 의미를 알아보세요"
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Claude Code Analytics는 개발 세션의 성능과 생산성을 측정하는 6가지 핵심 메트릭을 제공합니다.
            이 도구를 통해 워크플로우를 최적화하고 비용을 절감할 수 있습니다.
          </p>
        </div>
      </ToolSection>

      {/* Analytics 실행 방법 */}
      <ToolSection
        title="Analytics 실행 방법"
        description="명령어를 실행하여 실시간 분석 대시보드를 확인하세요"
      >
        <CommandBlock command="npx claude-code-templates@latest --analytics" />
        <p className="text-sm text-muted-foreground mt-3">
          이 명령어는 Claude Code 세션의 실시간 통계를 표시합니다. Node.js 18 이상이 필요합니다.
        </p>
      </ToolSection>

      {/* 추적 메트릭 */}
      <ToolSection
        title="추적되는 메트릭"
        description="각 메트릭의 의미와 해석 방법을 확인하세요"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRACKED_METRICS.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </ToolSection>

      {/* 트러블슈팅 FAQ */}
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">NEW</div>
                      <h4 className="font-semibold mb-1">헬스 체크</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        설치 상태 종합 진단
                      </p>
                      <Link href="/claude/claude-code-health-check">
                        <Button variant="outline" size="sm">
                          가이드 보기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="text-xs text-primary font-semibold mb-1">현재 페이지</div>
                      <h4 className="font-semibold mb-1">실시간 분석</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        생산성 메트릭 추적
                      </p>
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

      {/* SEO 콘텐츠 - 사용 방법 */}
      <ToolSection title="사용 방법">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            이 도구는 Claude Code CLI의 Analytics 기능을 소개하고, 추적되는 6가지 핵심 메트릭의 의미와 해석 방법을 설명합니다.
            각 메트릭 카드에는 좋은 상태, 주의 상태, 심각한 상태의 기준이 명시되어 있어 현재 워크플로우의 상태를 쉽게 파악할 수 있습니다.
          </p>
          <p>
            Analytics 명령어를 실행하면 실시간으로 세션 통계를 확인할 수 있으며, 이를 통해 응답 속도가 느린 원인, 토큰 사용량이 많은 이유,
            생산성이 떨어지는 패턴 등을 분석할 수 있습니다. 정기적으로 메트릭을 모니터링하여 지속적으로 워크플로우를 개선하세요.
          </p>
          <p>
            특히 토큰 소비량과 컨텍스트 크기 메트릭은 직접적으로 API 비용과 연관되므로, .claudeignore 파일을 적극 활용하여
            불필요한 파일을 제외하고 비용을 최적화하는 것이 중요합니다.
          </p>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 완벽 가이드 */}
      <ToolSection title="Claude Code Analytics 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>Claude Code Analytics란?</h3>
          <p>
            Claude Code Analytics는 AI 기반 코딩 세션의 성능, 효율성, 비용을 실시간으로 추적하고 분석하는 도구입니다.
            개발자가 Claude Code를 사용하는 패턴을 이해하고 최적화할 수 있도록 6가지 핵심 지표를 제공합니다.
          </p>

          <h3>왜 Analytics가 중요한가?</h3>
          <p>
            Claude Code를 효과적으로 사용하려면 단순히 설치하는 것만으로는 부족합니다. 응답 속도, 토큰 사용량, 도구 사용 패턴 등을
            지속적으로 모니터링하여 워크플로우를 개선해야 합니다. Analytics를 통해:
          </p>
          <ul>
            <li><strong>성능 병목 식별</strong>: 느린 응답의 원인 파악 및 해결</li>
            <li><strong>비용 최적화</strong>: 불필요한 토큰 사용 감소</li>
            <li><strong>생산성 향상</strong>: 효율적인 프롬프트 패턴 발견</li>
            <li><strong>문제 조기 발견</strong>: 높은 에러율 감지 및 대응</li>
          </ul>

          <h3>메트릭별 최적화 전략</h3>

          <h4>1. 응답 시간 개선</h4>
          <p>
            응답 시간이 15초를 초과한다면 컨텍스트 크기를 줄여야 합니다. .claudeignore에 node_modules, .git, dist 등
            대용량 디렉터리를 추가하고, CLAUDE.md로 핵심 정보만 제공하세요. 또한 프로젝트를 작은 단위로 나누어 작업하면
            컨텍스트 로딩 시간이 크게 감소합니다.
          </p>

          <h4>2. 도구 사용 패턴 최적화</h4>
          <p>
            효율적인 도구 사용 패턴은 Read → Edit → Write 순서입니다. 반면 Read를 반복하거나 Bash 도구를 과도하게 사용하는 것은
            비효율적입니다. 한 번에 필요한 모든 파일을 읽고, 명확한 지시사항을 제공하여 재작업을 최소화하세요.
          </p>

          <h4>3. 토큰 소비량 절감</h4>
          <p>
            토큰 사용량이 32K를 초과한다면 즉시 .claudeignore를 점검하세요. 로그 파일, 빌드 산출물, 외부 라이브러리 등
            불필요한 파일을 제외하면 토큰 사용량을 50% 이상 줄일 수 있습니다. 또한 .clauderc에서 max_tokens를 적절히 조정하여
            응답 길이를 제한할 수 있습니다.
          </p>

          <h4>4. 생산성 점수 향상</h4>
          <p>
            생산성 점수가 40% 미만이라면 프롬프트 작성 방식을 개선해야 합니다. "이 파일 수정해줘" 대신
            "src/components/Header.tsx의 로고 크기를 50px로 변경하고 색상을 #007bff로 바꿔줘"처럼 구체적으로 요청하세요.
            명확한 지시는 Claude가 즉시 작업을 완료할 수 있게 합니다.
          </p>

          <h4>5. 에러율 감소</h4>
          <p>
            에러율이 15%를 초과한다면 Health Check 도구로 설치 상태를 점검하세요. API 키, Node.js 버전, PATH 설정 등
            기본 환경이 올바른지 확인하고, 반복되는 오류 메시지를 로그에서 분석하여 근본 원인을 해결해야 합니다.
          </p>

          <h4>6. 컨텍스트 크기 관리</h4>
          <p>
            평균 컨텍스트 크기가 500KB를 초과한다면 프로젝트 구조를 재검토하세요. 모노레포 환경에서는 작업 중인 패키지만
            컨텍스트에 포함하고, 프론트엔드와 백엔드를 분리하여 관리하는 것이 효율적입니다.
          </p>

          <h3>Analytics 활용 워크플로우</h3>
          <ol>
            <li><strong>초기 베이스라인 측정</strong>: Claude Code를 처음 사용할 때 Analytics로 현재 상태 파악</li>
            <li><strong>주간 리뷰</strong>: 매주 메트릭을 확인하여 추세 파악</li>
            <li><strong>최적화 실행</strong>: 문제가 발견되면 즉시 개선 조치</li>
            <li><strong>효과 측정</strong>: 최적화 후 메트릭 변화 추적</li>
            <li><strong>지속적 개선</strong>: 팀 내 베스트 프랙티스 공유</li>
          </ol>

          <h3>팀 환경에서의 Analytics</h3>
          <p>
            여러 개발자가 Claude Code를 사용하는 팀 환경에서는 Analytics를 통해 팀 전체의 사용 패턴을 분석할 수 있습니다.
            각 팀원의 생산성 점수, 토큰 사용량, 에러율을 비교하여 효율적인 사용자의 패턴을 학습하고 공유하세요.
            또한 프로젝트별 메트릭을 추적하여 특정 프로젝트의 특성을 이해하고 최적화할 수 있습니다.
          </p>

          <h3>비용 최적화 실전 팁</h3>
          <ul>
            <li>
              <strong>.claudeignore 템플릿 사용</strong>: node_modules/, .git/, dist/, build/, *.log, coverage/ 등
              표준 제외 패턴을 미리 설정
            </li>
            <li>
              <strong>프로젝트별 max_tokens 조정</strong>: 소규모 프로젝트는 4096, 중규모는 8192, 대규모는 16384 토큰 설정
            </li>
            <li>
              <strong>CLAUDE.md 활용</strong>: 프로젝트 구조, 컨벤션, 자주 사용하는 명령어를 문서화하여 컨텍스트 효율화
            </li>
            <li>
              <strong>세션 관리</strong>: 긴 대화보다는 명확한 목적의 짧은 세션을 여러 번 사용
            </li>
          </ul>

          <h3>추가 리소스</h3>
          <ul>
            <li><strong>Analytics 명령어</strong>: npx claude-code-templates@latest --analytics</li>
            <li><strong>Anthropic Console</strong>: https://console.anthropic.com/ (API 사용량 확인)</li>
            <li><strong>공식 문서</strong>: https://docs.anthropic.com/claude-code</li>
            <li><strong>커뮤니티</strong>: 다른 개발자들과 최적화 팁 공유</li>
          </ul>

          <p className="mt-6 p-4 bg-accent/50 rounded-lg text-sm">
            <strong>💡 팁:</strong> Analytics는 일주일에 한 번 정도 확인하여 추세를 파악하는 것이 좋습니다.
            급격한 변화가 있다면 최근 워크플로우 변경 사항을 검토하고, 개선된 패턴은 팀원들과 공유하여 전체 팀의 생산성을
            향상시키세요. 특히 토큰 사용량은 직접적인 비용과 연결되므로 매일 간단히 확인하는 습관을 들이면 좋습니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}