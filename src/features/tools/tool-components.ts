// [AUTO-GENERATED] 이 파일은 scripts/sync-tools.mjs에 의해 자동으로 생성되었습니다.
// 수동으로 수정하지 마세요.

export const TOOL_IMPORTS: Record<string, () => Promise<any>> = {
  'claude-code-analytics': () => import('@/features/tools/tools/claude-code-analytics'),
  'claude-code-health-check': () => import('@/features/tools/tools/claude-code-health-check'),
  'claude-config-master': () => import('@/features/tools/tools/claude-config-master'),
  'claude-conversation-monitor': () => import('@/features/tools/tools/claude-conversation-monitor'),
  'claude-plugin-dashboard': () => import('@/features/tools/tools/claude-plugin-dashboard'),
  'claude-workflows-optimization': () => import('@/features/tools/tools/claude-workflows-optimization'),
  'code-snapshot': () => import('@/features/tools/tools/code-snapshot'),
  'json-to-table': () => import('@/features/tools/tools/json-to-table'),
  'json-to-ts': () => import('@/features/tools/tools/json-to-ts'),
  'markdown-editor': () => import('@/features/tools/tools/markdown-editor'),
  'quick-start-checklist': () => import('@/features/tools/tools/quick-start-checklist'),
  'tailwind-class-visualizer': () => import('@/features/tools/tools/tailwind-class-visualizer'),
  'vibe-token-slimmer': () => import('@/features/tools/tools/vibe-token-slimmer'),
  'vibe-visual-pro': () => import('@/features/tools/tools/vibe-visual-pro'),
};
