import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, '../src/features/tools/tools');
const REGISTRY_PATH = path.join(__dirname, '../src/shared/config/tools-registry.ts');
const COMPONENTS_PATH = path.join(__dirname, '../src/features/tools/tool-components.ts');

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

async function syncTools() {
  try {
    const entries = await fs.readdir(TOOLS_DIR, { withFileTypes: true });
    const tools = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
      .map((entry) => entry.name);

    console.log(`🔍 Found ${tools.length} tools: ${tools.join(', ')}`);

    // 1. Generate tools-registry.ts
    let registryContent = `// [AUTO-GENERATED] 이 파일은 scripts/sync-tools.mjs에 의해 자동으로 생성되었습니다.
// 수동으로 수정하지 마세요. 충돌의 원인이 됩니다.

import dynamic from "next/dynamic";
import { ToolRegistration } from "./tools-registry.types";
export type { ToolRegistration };
`;

    for (const slug of tools) {
      registryContent += `import { config as ${toCamelCase(slug)}Config } from "@/features/tools/tools/${slug}/tool.config";\n`;
    }

    registryContent += `\nexport const TOOLS_REGISTRY: ToolRegistration[] = [\n`;
    for (const slug of tools) {
      registryContent += `  {
    ...${toCamelCase(slug)}Config,
    component: dynamic(() => import("@/features/tools/tools/${slug}")),
  },
`;
    }
    registryContent += `];\n`;

    await fs.writeFile(REGISTRY_PATH, registryContent);

    // 2. Generate tool-components.ts
    let componentsContent = `// [AUTO-GENERATED] 이 파일은 scripts/sync-tools.mjs에 의해 자동으로 생성되었습니다.
// 수동으로 수정하지 마세요.

export const TOOL_IMPORTS: Record<string, () => Promise<any>> = {\n`;
    for (const slug of tools) {
      componentsContent += `  '${slug}': () => import('@/features/tools/tools/${slug}'),\n`;
    }
    componentsContent += `};
`;

    await fs.writeFile(COMPONENTS_PATH, componentsContent);

    console.log('✅ Tools synchronized successfully!');
  } catch (error) {
    console.error('❌ Error during sync:', error);
    process.exit(1);
  }
}

syncTools();
