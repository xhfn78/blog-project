import { defineConfig } from 'vitepress'
import { readdirSync } from 'fs'

// 워크스루 파일 자동 수집
function getWorkthroughFiles() {
  const files = readdirSync(__dirname + '/..')
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort()
    .reverse() // 최신 파일 먼저

  return files.map(file => ({
    text: file.replace('.md', '').replace(/_/g, ' '),
    link: '/' + file.replace('.md', '')
  }))
}

export default defineConfig({
  title: 'Vlog Development',
  description: 'Development workthrough documentation',
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Workthrough', link: '/workthrough' }
    ],

    sidebar: [
      {
        text: 'Development Log',
        items: getWorkthroughFiles()
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Development Workthrough Documentation',
      copyright: 'Copyright © 2025'
    }
  },

  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  }
})
