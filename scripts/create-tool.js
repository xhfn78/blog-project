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

async function createTool() {
  try {
    if (fs.existsSync(newToolDir)) {
      console.error(`❌ Tool with slug "${slug}" already exists!`);
      process.exit(1);
    }

    console.log(`🚀 Creating new tool folder for: ${slug}`);

    // 1. Copy template directory
    await fs.copy(templateDir, newToolDir);
    console.log('✅ Template files copied.');

    // 2. Update tool.config.ts in the new folder
    const configPath = path.join(newToolDir, 'tool.config.ts');
    let configContent = await fs.readFile(configPath, 'utf8');
    configContent = configContent.replace(/my-new-tool/g, slug);
    const toolName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
    configContent = configContent.replace('My New Tool', toolName);
    await fs.writeFile(configPath, configContent);
    console.log('✅ tool.config.ts initialized.');

    console.log('\n🎉 Tool folder created!');
    console.log('⚠️  Registry will be auto-updated when you run: npm run dev');
    console.log(`➡️  Start editing: ${path.relative(process.cwd(), configPath)}`);

  } catch (error) {
    console.error('❌ Error creating tool folder:', error);
    process.exit(1);
  }
}

createTool();