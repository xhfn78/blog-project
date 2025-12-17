'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import 'highlight.js/styles/github-dark.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function MarkdownEditor({ value, onChange, error }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="markdown-content">Content (Markdown)</Label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <Textarea
            id="markdown-content"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your post in Markdown...

# Heading 1
## Heading 2

**bold** *italic* `code`

- List item
- Another item

```javascript
const example = 'code block';
```

[Link](https://example.com)"
            rows={20}
            className="font-mono text-sm"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Preview</div>
            <div className="border rounded-md p-4 min-h-[500px] overflow-auto bg-muted/30">
              <article className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                >
                  {value || '*No content to preview*'}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>

      {/* Markdown Guide */}
      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground">
          Markdown Guide
        </summary>
        <div className="mt-2 space-y-1 font-mono text-xs">
          <p># Heading 1, ## Heading 2, ### Heading 3</p>
          <p>**bold**, *italic*, ~~strikethrough~~</p>
          <p>`inline code`, ```language for code blocks```</p>
          <p>[Link text](url), ![Image alt](url)</p>
          <p>- List item, 1. Numbered list</p>
          <p>&gt; Blockquote</p>
          <p>--- for horizontal rule</p>
          <p>| Table | Header | for tables</p>
        </div>
      </details>
    </div>
  );
}
