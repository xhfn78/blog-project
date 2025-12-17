import { colors } from '@/shared/lib/tokens/design-tokens';

export const TOOL_CATEGORIES = ['converter', 'generator', 'formatter', 'utility'] as const;

export type ToolCategory = typeof TOOL_CATEGORIES[number];

export const TOOL_CATEGORY_METADATA: Record<ToolCategory, { color: string; icon: string; name: string; }> = {
    converter: {
        name: '변환기',
        color: colors.tool.converter,
        icon: 'git-compare',
    },
    generator: {
        name: '생성기',
        color: colors.tool.generator,
        icon: 'cpu',
    },
    formatter: {
        name: '포맷터',
        color: colors.tool.formatter,
        icon: 'align-left',
    },
    utility: {
        name: '유틸리티',
        color: colors.tool.utility,
        icon: 'wrench',
    },
};