// [AUTO-GENERATED] 이 파일은 scripts/sync-tools.mjs에 의해 자동으로 생성되었습니다.
// 수동으로 수정하지 마세요. 충돌의 원인이 됩니다.

import dynamic from "next/dynamic";
import { ToolRegistration } from "./tools-registry.types";
export type { ToolRegistration };
import { config as claudeCodeAnalyticsConfig } from "@/features/tools/tools/claude-code-analytics/tool.config";
import { config as claudeCodeHealthCheckConfig } from "@/features/tools/tools/claude-code-health-check/tool.config";
import { config as claudeConfigMasterConfig } from "@/features/tools/tools/claude-config-master/tool.config";
import { config as claudeConversationMonitorConfig } from "@/features/tools/tools/claude-conversation-monitor/tool.config";
import { config as claudePluginDashboardConfig } from "@/features/tools/tools/claude-plugin-dashboard/tool.config";
import { config as claudeWorkflowsOptimizationConfig } from "@/features/tools/tools/claude-workflows-optimization/tool.config";
import { config as codeLensConfig } from "@/features/tools/tools/code-lens/tool.config";
import { config as codeSnapshotConfig } from "@/features/tools/tools/code-snapshot/tool.config";
import { config as colorPaletteGeneratorConfig } from "@/features/tools/tools/color-palette-generator/tool.config";
import { config as cssToTailwindConfig } from "@/features/tools/tools/css-to-tailwind/tool.config";
import { config as figmaSvgToReactConfig } from "@/features/tools/tools/figma-svg-to-react/tool.config";
import { config as framerMotionCodeBuilderConfig } from "@/features/tools/tools/framer-motion-code-builder/tool.config";
import { config as githubProfileCardGeneratorConfig } from "@/features/tools/tools/github-profile-card-generator/tool.config";
import { config as jsonFormatterConfig } from "@/features/tools/tools/json-formatter/tool.config";
import { config as jsonToTableConfig } from "@/features/tools/tools/json-to-table/tool.config";
import { config as jsonToTsConfig } from "@/features/tools/tools/json-to-ts/tool.config";
import { config as koreanAddressMockGeneratorConfig } from "@/features/tools/tools/korean-address-mock-generator/tool.config";
import { config as markdownEditorConfig } from "@/features/tools/tools/markdown-editor/tool.config";
import { config as ogMetaTagPreviewConfig } from "@/features/tools/tools/og-meta-tag-preview/tool.config";
import { config as quickStartChecklistConfig } from "@/features/tools/tools/quick-start-checklist/tool.config";
import { config as tailwindClassVisualizerConfig } from "@/features/tools/tools/tailwind-class-visualizer/tool.config";
import { config as vibeTokenSlimmerConfig } from "@/features/tools/tools/vibe-token-slimmer/tool.config";
import { config as vibeVisualProConfig } from "@/features/tools/tools/vibe-visual-pro/tool.config";
import { config as visualCommandMapConfig } from "@/features/tools/tools/visual-command-map/tool.config";

export const TOOLS_REGISTRY: ToolRegistration[] = [
  {
    ...claudeCodeAnalyticsConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-code-analytics")),
  },
  {
    ...claudeCodeHealthCheckConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-code-health-check")),
  },
  {
    ...claudeConfigMasterConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-config-master")),
  },
  {
    ...claudeConversationMonitorConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-conversation-monitor")),
  },
  {
    ...claudePluginDashboardConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-plugin-dashboard")),
  },
  {
    ...claudeWorkflowsOptimizationConfig,
    component: dynamic(() => import("@/features/tools/tools/claude-workflows-optimization")),
  },
  {
    ...codeLensConfig,
    component: dynamic(() => import("@/features/tools/tools/code-lens")),
  },
  {
    ...codeSnapshotConfig,
    component: dynamic(() => import("@/features/tools/tools/code-snapshot")),
  },
  {
    ...colorPaletteGeneratorConfig,
    component: dynamic(() => import("@/features/tools/tools/color-palette-generator")),
  },
  {
    ...cssToTailwindConfig,
    component: dynamic(() => import("@/features/tools/tools/css-to-tailwind")),
  },
  {
    ...figmaSvgToReactConfig,
    component: dynamic(() => import("@/features/tools/tools/figma-svg-to-react")),
  },
  {
    ...framerMotionCodeBuilderConfig,
    component: dynamic(() => import("@/features/tools/tools/framer-motion-code-builder")),
  },
  {
    ...githubProfileCardGeneratorConfig,
    component: dynamic(() => import("@/features/tools/tools/github-profile-card-generator")),
  },
  {
    ...jsonFormatterConfig,
    component: dynamic(() => import("@/features/tools/tools/json-formatter")),
  },
  {
    ...jsonToTableConfig,
    component: dynamic(() => import("@/features/tools/tools/json-to-table")),
  },
  {
    ...jsonToTsConfig,
    component: dynamic(() => import("@/features/tools/tools/json-to-ts")),
  },
  {
    ...koreanAddressMockGeneratorConfig,
    component: dynamic(() => import("@/features/tools/tools/korean-address-mock-generator")),
  },
  {
    ...markdownEditorConfig,
    component: dynamic(() => import("@/features/tools/tools/markdown-editor")),
  },
  {
    ...ogMetaTagPreviewConfig,
    component: dynamic(() => import("@/features/tools/tools/og-meta-tag-preview")),
  },
  {
    ...quickStartChecklistConfig,
    component: dynamic(() => import("@/features/tools/tools/quick-start-checklist")),
  },
  {
    ...tailwindClassVisualizerConfig,
    component: dynamic(() => import("@/features/tools/tools/tailwind-class-visualizer")),
  },
  {
    ...vibeTokenSlimmerConfig,
    component: dynamic(() => import("@/features/tools/tools/vibe-token-slimmer")),
  },
  {
    ...vibeVisualProConfig,
    component: dynamic(() => import("@/features/tools/tools/vibe-visual-pro")),
  },
  {
    ...visualCommandMapConfig,
    component: dynamic(() => import("@/features/tools/tools/visual-command-map")),
  },
];
