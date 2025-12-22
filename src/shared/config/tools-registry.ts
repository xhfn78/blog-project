import { config as markdownEditorConfig } from "@/features/tools/tools/markdown-editor/tool.config";
import dynamic from "next/dynamic";
import { config as jsonToTableConfig } from "@/features/tools/tools/json-to-table/tool.config";
import { config as tailwindClassVisualizerConfig } from "@/features/tools/tools/tailwind-class-visualizer/tool.config";
import { config as codeSnapshotConfig } from "@/features/tools/tools/code-snapshot/tool.config";
import { config as claudeConfigMasterConfig } from "@/features/tools/tools/claude-config-master/tool.config";
import { config as claudeWorkflowsOptimizationConfig } from "@/features/tools/tools/claude-workflows-optimization/tool.config";
import { config as vibeVisualProConfig } from "@/features/tools/tools/vibe-visual-pro/tool.config";
import { config as quickStartChecklistConfig } from "@/features/tools/tools/quick-start-checklist/tool.config";
import { config as vibeTokenSlimmerConfig } from "@/features/tools/tools/vibe-token-slimmer/tool.config";

export interface ToolRegistration {
  slug: string;
  name: string;
  description: string;
  category: "utility" | "converter" | "generator" | "formatter" | "claude";
  tags: string[];
  author: string;
  component?: React.ComponentType<any>;
  featured?: boolean;
}

/**
 * TOOLS_REGISTRY
 *
 * - 코드 기반 도구 레지스트리입니다.
 * - `scripts/create-tool.js` 스크립트가 새로운 도구를 추가할 때 이 배열에 엔트리를 자동으로 삽입합니다.
 * - 수동으로 도구를 추가할 때도 이 배열에 등록하면 됩니다.
 */
export const TOOLS_REGISTRY: ToolRegistration[] = [
  {
    ...codeSnapshotConfig,
    component: dynamic(() => import("@/features/tools/tools/code-snapshot")),
  },
  {
    ...jsonToTableConfig,
    component: dynamic(() => import("@/features/tools/tools/json-to-table")),
  },
  {
    ...tailwindClassVisualizerConfig,
    component: dynamic(
      () => import("@/features/tools/tools/tailwind-class-visualizer")
    ),
  },
  {
    ...markdownEditorConfig,
    component: dynamic(() => import("@/features/tools/tools/markdown-editor")),
  },
  {
    ...claudeConfigMasterConfig,
    component: dynamic(
      () => import("@/features/tools/tools/claude-config-master")
    ),
  },
  {
    ...claudeWorkflowsOptimizationConfig,
    component: dynamic(
      () => import("@/features/tools/tools/claude-workflows-optimization")
    ),
  },
  {
    ...vibeVisualProConfig,
    component: dynamic(() => import("@/features/tools/tools/vibe-visual-pro")),
  },
  {
    ...quickStartChecklistConfig,
    component: dynamic(
      () => import("@/features/tools/tools/quick-start-checklist")
    ),
  },
  {
    ...vibeTokenSlimmerConfig,
    component: dynamic(
      () => import("@/features/tools/tools/vibe-token-slimmer")
    ),
  },
];
