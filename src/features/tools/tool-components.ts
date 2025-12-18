export const TOOL_IMPORTS: Record<string, () => Promise<any>> = {
  'code-snapshot': () => import('@/features/tools/tools/code-snapshot'),
  'json-to-table': () => import('@/features/tools/tools/json-to-table'),
  'tailwind-class-visualizer': () => import('@/features/tools/tools/tailwind-class-visualizer'),
};
