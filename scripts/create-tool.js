
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const slug = process.argv[2];

if (!slug) {
  console.error('❌ Please provide a slug for the new tool.');
  console.log('Usage: npm run create-tool <your-tool-slug>');
  process.exit(1);
}

const templateDir = path.join(__dirname, '../src/features/tools/tools/_template');
const newToolDir = path.join(__dirname, `../src/features/tools/tools/${slug}`);
const registryPath = path.join(__dirname, '../src/shared/config/tools-registry.ts');

async function createTool() {
  try {
    console.log(`🚀 Creating new tool with slug: ${slug}`);

    // 1. Copy template directory
    await fs.copy(templateDir, newToolDir);
    console.log('✅ Template files copied.');

    // 2. Update tool.config.ts
    const configPath = path.join(newToolDir, 'tool.config.ts');
    let configContent = await fs.readFile(configPath, 'utf8');
    configContent = configContent.replace(/my-new-tool/g, slug);
    // Capitalize first letter of slug for name
    const toolName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
    configContent = configContent.replace('My New Tool', toolName);
    await fs.writeFile(configPath, configContent);
    console.log('✅ tool.config.ts updated.');

    // 3. Update tools-registry.ts
    let registryContent = await fs.readFile(registryPath, 'utf8');
    const importStatement = `import { config as ${toCamelCase(slug)}Config } from '@/features/tools/tools/${slug}/tool.config';\n`;
    const newEntry = `
  {
    ...${toCamelCase(slug)}Config,
    component: lazy(() => import('@/features/tools/tools/${slug}')),
  },
`;
    // Add import statement at the top
    registryContent = importStatement + registryContent;

    // Add new entry to the array
    const registryArrayRegex = /(export const TOOLS_REGISTRY: ToolRegistration\[\] = \[
)([^]*?)(\];)/;
    registryContent = registryContent.replace(registryArrayRegex, `$1$2${newEntry}$3`);

    await fs.writeFile(registryPath, registryContent);
    console.log('✅ tools-registry.ts updated.');
    
    // 4. Create a new git branch
    try {
        execSync(`git checkout -b feature/tool-${slug}`);
        console.log(`✅ Switched to a new branch: feature/tool-${slug}`);
    } catch (gitError) {
        console.warn(`⚠️ Could not create a new git branch. Maybe you are not in a git repository?`);
    }


    console.log('\n🎉 New tool created successfully!');
    console.log(`➡️  Start by editing ${path.relative(process.cwd(), configPath)}`);
    console.log(`➡️  Then implement your component in ${path.relative(process.cwd(), path.join(newToolDir, 'index.tsx'))}`);


  } catch (error) {
    console.error('❌ Error creating new tool:', error);
    // Clean up created directory on error
    if (fs.existsSync(newToolDir)) {
      await fs.remove(newToolDir);
    }
    process.exit(1);
  }
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

createTool();
