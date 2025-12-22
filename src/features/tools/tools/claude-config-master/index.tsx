'use client';

import Link from 'next/link';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { FileCode, FileText, FileX, Package } from 'lucide-react';
import { config } from './tool.config';
import { useConfigState } from './hooks/use-config-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { TemplateCard } from './components/template-card';
import { ConfigExamples } from './components/config-examples';
import { BestPractices } from './components/best-practices';
import { TEMPLATES } from './lib/templates';

/**
 * Claude Code 설정 마스터 가이드 도구
 *
 * .clauderc, CLAUDE.md, .claudeignore 설정 방법을 안내하고
 * 다운로드 가능한 템플릿을 제공합니다.
 */
export default function ClaudeConfigMasterTool() {
  const { checklistItems, toggleItem, resetAll, progress } = useConfigState();

  const handleDownloadAll = () => {
    // 모든 템플릿을 순차적으로 다운로드
    Object.values(TEMPLATES).forEach((template, index) => {
      setTimeout(() => {
        const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = template.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 300); // 300ms 간격으로 다운로드
    });
  };

  return (
    <ToolLayout config={config}>
      {/* 진행률 섹션 */}
      <ToolSection
        title="진행률"
        description="설정 단계를 완료하면 자동으로 저장됩니다"
      >
        <ProgressIndicator current={progress.completed} total={progress.total} />
      </ToolSection>

      {/* 체크리스트 섹션 */}
      <ToolSection
        title="설정 단계"
        description="각 단계를 따라하며 체크하세요. 아래 템플릿을 다운로드하여 사용할 수 있습니다."
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

      {/* 템플릿 다운로드 섹션 */}
      <ToolSection
        title="템플릿 다운로드"
        description="바로 사용할 수 있는 설정 파일 템플릿을 다운로드하세요"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TemplateCard
            template={TEMPLATES.clauderc}
            icon={<FileCode className="h-5 w-5" />}
          />
          <TemplateCard
            template={TEMPLATES.claudeMd}
            icon={<FileText className="h-5 w-5" />}
          />
          <TemplateCard
            template={TEMPLATES.claudeignore}
            icon={<FileX className="h-5 w-5" />}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleDownloadAll} className="w-full" size="lg">
            <Package className="mr-2 h-4 w-4" />
            전체 템플릿 다운로드 (3개 파일)
          </Button>
        </div>
      </ToolSection>

      {/* 설정 예제 섹션 */}
      <ToolSection
        title="설정 예제"
        description="프로젝트 유형별 최적화된 .clauderc 설정 예제입니다"
      >
        <ConfigExamples />
      </ToolSection>

      {/* CLAUDE.md 작성 가이드 */}
      <ToolSection
        title="CLAUDE.md 작성 가이드"
        description="효과적인 CLAUDE.md를 작성하는 방법을 알아보세요"
      >
        <BestPractices />
      </ToolSection>

      {/* 컨텍스트 관리 팁 */}
      <ToolSection
        title="컨텍스트 관리 & .claudeignore"
        description="토큰 사용량을 최적화하는 방법"
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>.claudeignore로 불필요한 파일 제외하기</h3>
          <p>
            .claudeignore 파일은 .gitignore와 유사한 문법을 사용하여 Claude Code가 인식하지 않아야 할 파일을 지정합니다.
            이를 통해 토큰 사용량을 크게 줄일 수 있습니다.
          </p>

          <h4>반드시 제외해야 할 패턴</h4>
          <ul>
            <li><code>node_modules/</code> - 의존성 패키지 (수천 개의 파일)</li>
            <li><code>dist/</code>, <code>build/</code>, <code>.next/</code> - 빌드 결과물</li>
            <li><code>*.log</code> - 로그 파일</li>
            <li><code>.env*</code> - 환경 변수 파일 (보안 중요)</li>
          </ul>

          <h4>선택적으로 제외할 패턴</h4>
          <ul>
            <li><code>**/*.test.*</code>, <code>**/*.spec.*</code> - 테스트 파일</li>
            <li><code>public/**</code>, <code>assets/**</code> - 정적 파일</li>
            <li><code>*.config.*</code> - 설정 파일 (필요에 따라)</li>
          </ul>

          <h3>토큰 최적화 전략</h3>
          <div className="not-prose p-4 bg-accent/50 rounded-lg space-y-2">
            <p className="text-sm"><strong>💡 전략 1:</strong> includePatterns를 좁게, excludePatterns를 넓게 설정하세요.</p>
            <p className="text-sm"><strong>💡 전략 2:</strong> 작업 중인 기능에 필요한 파일만 포함하도록 임시로 조정하세요.</p>
            <p className="text-sm"><strong>💡 전략 3:</strong> 큰 라이브러리나 외부 코드는 제외하고, 핵심 비즈니스 로직에만 집중하세요.</p>
          </div>
        </div>
      </ToolSection>

      {/* 시리즈 네비게이션 */}
      <ToolSection
        title="Claude Code 가이드 시리즈"
        description="3부작으로 구성된 완벽 가이드"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/claude/quick-start-checklist" className="block">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-xs text-muted-foreground mb-1">1편</div>
              <h4 className="font-semibold mb-2">빠른 시작 가이드</h4>
              <p className="text-sm text-muted-foreground">
                Claude Code CLI 설치부터 첫 프로젝트 시작까지
              </p>
            </div>
          </Link>

          <div className="border-2 border-primary rounded-lg p-4 bg-accent/30">
            <div className="text-xs text-primary font-semibold mb-1">2편 (현재)</div>
            <h4 className="font-semibold mb-2">설정 마스터</h4>
            <p className="text-sm text-muted-foreground">
              .clauderc, CLAUDE.md, 컨텍스트 관리 완벽 가이드
            </p>
          </div>

          <Link href="/claude/claude-workflows-optimization" className="block">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-xs text-muted-foreground mb-1">3편</div>
              <h4 className="font-semibold mb-2">실전 워크플로우</h4>
              <p className="text-sm text-muted-foreground">
                6가지 워크플로우와 비용 최적화 전략
              </p>
            </div>
          </Link>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 사용 방법 */}
      <ToolSection title="사용 방법">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            이 도구는 Claude Code CLI를 최대한 활용하기 위한 설정 방법을 단계별로 안내합니다.
            각 설정 파일의 역할과 최적화 방법을 배우고, 프로젝트에 맞는 템플릿을 다운로드하여 즉시 사용할 수 있습니다.
          </p>
          <p>
            체크리스트를 따라 설정을 완료하면, Claude Code가 프로젝트의 컨텍스트를 올바르게 이해하고
            더 정확한 답변을 제공할 수 있습니다. 또한 불필요한 파일을 제외하여 토큰 사용량을 최적화하고 비용을 절감할 수 있습니다.
          </p>
        </div>
      </ToolSection>

      {/* SEO 콘텐츠 - 완벽 가이드 */}
      <ToolSection title="Claude Code 설정 완벽 가이드">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3>설정 파일의 역할</h3>

          <h4>.clauderc - 프로젝트 설정</h4>
          <p>
            .clauderc 파일은 Claude Code의 동작을 제어하는 핵심 설정 파일입니다.
            모델 선택, 토큰 제한, 포함/제외 패턴 등을 지정하여 프로젝트에 맞게 최적화할 수 있습니다.
          </p>
          <ul>
            <li><strong>model</strong>: 사용할 Claude 모델 (claude-sonnet-4.5, claude-opus-4.5, claude-haiku-4.5)</li>
            <li><strong>temperature</strong>: 응답의 창의성 수준 (0.0-1.0, 기본 0.7)</li>
            <li><strong>maxTokens</strong>: 응답의 최대 길이 제한</li>
            <li><strong>includePatterns</strong>: Claude가 읽을 파일 패턴 (glob 형식)</li>
            <li><strong>excludePatterns</strong>: 제외할 파일 패턴</li>
          </ul>

          <h4>CLAUDE.md - 프로젝트 가이드</h4>
          <p>
            CLAUDE.md는 프로젝트의 맥락을 Claude에게 전달하는 문서입니다.
            프로젝트 개요, 아키텍처, 코딩 컨벤션 등을 명시하여 Claude가 프로젝트를 더 잘 이해하도록 돕습니다.
          </p>
          <p>
            이 파일이 있으면 매번 프로젝트 구조를 설명할 필요가 없어 토큰을 절약할 수 있고,
            팀의 코딩 스타일을 따르는 코드를 생성할 수 있습니다.
          </p>

          <h4>.claudeignore - 제외 패턴</h4>
          <p>
            .claudeignore는 Claude Code가 무시해야 할 파일과 디렉토리를 지정합니다.
            node_modules, 빌드 결과물, 로그 파일 등 불필요한 파일을 제외하여 토큰 사용량을 크게 줄일 수 있습니다.
          </p>

          <h3>프로젝트 유형별 최적 설정</h3>

          <h4>프론트엔드 프로젝트 (React, Next.js, Vue)</h4>
          <p>
            UI 컴포넌트와 스타일 파일에 집중하고, 테스트 파일과 정적 에셋은 제외합니다.
            Sonnet 모델을 사용하여 적절한 성능과 비용 균형을 유지하세요.
          </p>

          <h4>백엔드 API 프로젝트 (Node.js, Express)</h4>
          <p>
            라우팅, 컨트롤러, 비즈니스 로직에 집중하고 불필요한 설정 파일은 제외합니다.
            API 문서와 스키마 파일은 포함하여 Claude가 API 구조를 이해하도록 하세요.
          </p>

          <h4>비용 최적화가 중요한 프로젝트</h4>
          <p>
            Haiku 모델을 사용하고, maxTokens를 낮게 설정하며, includePatterns를 최소화합니다.
            테스트, 문서, 설정 파일을 모두 제외하여 핵심 코드만 포함하세요.
          </p>

          <h3>자주 묻는 질문</h3>

          <h4>Q: .clauderc가 없어도 Claude Code를 사용할 수 있나요?</h4>
          <p>
            네, 가능합니다. 하지만 .clauderc가 있으면 프로젝트에 맞게 최적화된 설정을 사용할 수 있어
            더 정확한 답변과 효율적인 토큰 사용이 가능합니다.
          </p>

          <h4>Q: CLAUDE.md는 얼마나 자세히 작성해야 하나요?</h4>
          <p>
            너무 길 필요는 없습니다. 핵심 정보만 간결하게 담으세요.
            프로젝트 개요, 주요 명령어, 폴더 구조, 코딩 컨벤션 정도면 충분합니다.
            일반적으로 200-500줄 정도가 적당합니다.
          </p>

          <h4>Q: includePatterns와 excludePatterns를 동시에 사용하면 어떻게 되나요?</h4>
          <p>
            excludePatterns가 우선 적용됩니다. 즉, includePatterns에 포함되어 있어도
            excludePatterns에 매칭되면 제외됩니다. 이를 활용하여 세밀한 제어가 가능합니다.
          </p>

          <h4>Q: 프로젝트마다 다른 설정을 사용할 수 있나요?</h4>
          <p>
            네, 각 프로젝트 디렉토리마다 별도의 .clauderc와 CLAUDE.md를 둘 수 있습니다.
            Claude Code는 현재 디렉토리부터 상위 디렉토리를 탐색하여 설정 파일을 찾습니다.
          </p>

          <h4>Q: 설정을 변경하면 즉시 적용되나요?</h4>
          <p>
            네, 설정 파일을 수정하면 다음 Claude Code 명령어 실행 시 바로 적용됩니다.
            별도의 재시작이나 빌드 과정이 필요하지 않습니다.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
