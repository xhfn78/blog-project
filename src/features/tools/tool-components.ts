export const TOOL_IMPORTS: Record<string, () => Promise<any>> = {
  'code-snapshot': () => import('@/features/tools/tools/code-snapshot'),
  'tailwind-class-visualizer': () => import('@/features/tools/tools/tailwind-class-visualizer'),
};
