// src/shared/config/ai-formats.ts

export const AI_FORMATS = {
  default: {
    name: 'Default',
    template: (code: string) => code,
  },
  chatGPT: {
    name: 'ChatGPT',
    template: (code: string) => `Please review the following code snippet:\n\n\`\`\`\n${code}\n\`\`\``,
  },
  cursor: {
    name: 'Cursor',
    template: (code: string) => `Here is some code I'm working on:\n\n${code}`,
  },
  claude: {
    name: 'Claude',
    template: (code: string) => `I have a code snippet for you to look at:\n\n\`\`\`\n${code}\n\`\`\``,
  },
};
