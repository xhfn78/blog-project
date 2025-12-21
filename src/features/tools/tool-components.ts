export const TOOL_IMPORTS: Record<string, () => Promise<any>> = {
  'code-snapshot': () => import('@/features/tools/tools/code-snapshot'),
  'json-to-table': () => import('@/features/tools/tools/json-to-table'),
  'tailwind-class-visualizer': () => import('@/features/tools/tools/tailwind-class-visualizer'),
  'markdown-editor': () => import('@/features/tools/tools/markdown-editor'),
  'vibe-token-slimmer': () => import('@/features/tools/tools/vibe-token-slimmer'),
  'vibe-visual-pro': () => import('@/features/tools/tools/vibe-visual-pro'),
  'quick-start-checklist': () => import('@/features/tools/tools/quick-start-checklist'),
  'claude-config-master': () => import('@/features/tools/tools/claude-config-master'),
  'claude-workflows-optimization': () => import('@/features/tools/tools/claude-workflows-optimization'),
};
