"use client";

import { ToolSection } from "@/shared/ui/tool-layout";
import { Textarea } from "@/shared/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css";
import { Button } from "@/shared/ui/button";
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { Typography } from "@/shared/ui/typography";

marked.setOptions({
  gfm: true,
  breaks: true,
});

const initialMarkdown = `
# Markdown Editor

안녕하세요! **Markdown Editor**에 오신 것을 환영합니다.

이 에디터는 Markdown을 실시간으로 HTML로 변환하여 보여줍니다.

## 주요 기능
*   **실시간 미리보기**: 작성하는 즉시 결과를 확인하세요.
*   **HTML 변환**: 최종 HTML 코드를 쉽게 내보낼 수 있습니다.
*   **GFM 지원**: GitHub Flavored Markdown (테이블, 체크박스 등)을 지원합니다.

\`\`\`javascript
// 예시 코드 블록 (JavaScript)
function helloWorld() {
  console.log("Hello, Markdown!");
}

const arr = [1, 2, 3];
arr.map(item => item * 2);
\`\`\`

> 인용 블록도 잘 작동합니다.

| 헤더 1 | 헤더 2 | 헤더 3 |
|---|---|---|
| 셀 1-1 | 셀 1-2 | 셀 1-3 |
| 셀 2-1 | 셀 2-2 | 셀 2-3 |

- [x] 체크박스 리스트 1
- [ ] 체크박스 리스트 2
`;

const LOCAL_STORAGE_KEY = "markdown-editor-content";

export function MarkdownEditorTool() {
  const [markdownInput, setMarkdownInput] = useState(() => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedContent !== null ? savedContent : initialMarkdown;
    }
    return initialMarkdown;
  });
  const [htmlOutput, setHtmlOutput] = useState("");

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [isScrollingEditor, setIsScrollingEditor] = useState(false);
  const [isScrollingPreview, setIsScrollingPreview] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { status: copyStatus, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    (async () => {
      let parsedHtml = await marked.parse(markdownInput);
      parsedHtml = parsedHtml.replace(
        /<input([^>]+type=\"checkbox\"[^>]*)\">/g,
        (match: string, attrs: string) => {
          if (attrs.includes("aria-label")) return match;
          return `<input${attrs} aria-label=\"체크박스 항목\" />`;
        }
      );
      const sanitizedHtml = DOMPurify.sanitize(parsedHtml as string);
      setHtmlOutput(sanitizedHtml);
    })();
  }, [markdownInput]);

  const handleEditorScroll = () => {
    if (isScrollingPreview) return;
    setIsScrollingEditor(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (editorRef.current && previewRef.current) {
        const editorScrollTop = editorRef.current.scrollTop;
        const editorScrollHeight =
          editorRef.current.scrollHeight - editorRef.current.clientHeight;
        const previewScrollHeight =
          previewRef.current.scrollHeight - previewRef.current.clientHeight;

        if (editorScrollHeight > 0) {
          const scrollRatio = editorScrollTop / editorScrollHeight;
          previewRef.current.scrollTop = scrollRatio * previewScrollHeight;
        }
      }
      setIsScrollingEditor(false);
    }, 50);
  };

  const handlePreviewScroll = () => {
    if (isScrollingEditor) return;
    setIsScrollingPreview(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (editorRef.current && previewRef.current) {
        const previewScrollTop = previewRef.current.scrollTop;
        const previewScrollHeight =
          previewRef.current.scrollHeight - previewRef.current.clientHeight;
        const editorScrollHeight =
          editorRef.current.scrollHeight - editorRef.current.clientHeight;

        if (previewScrollHeight > 0) {
          const scrollRatio = previewScrollTop / previewScrollHeight;
          editorRef.current.scrollTop = scrollRatio * editorScrollHeight;
        }
      }
      setIsScrollingPreview(false);
    }, 50);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isModifier = isMac ? event.metaKey : event.ctrlKey;

      if (editorRef.current) {
        const { selectionStart, selectionEnd, value } = editorRef.current;
        const selectedText = value.substring(selectionStart, selectionEnd);

        let newMarkdown = value;
        let newSelectionStart = selectionStart;
        let newSelectionEnd = selectionEnd;

        if (isModifier && event.key === "b") {
          event.preventDefault();
          const boldDelimiter = "**";
          newMarkdown =
            value.substring(0, selectionStart) +
            boldDelimiter +
            selectedText +
            boldDelimiter +
            value.substring(selectionEnd);
          newSelectionStart = selectionStart + boldDelimiter.length;
          newSelectionEnd =
            selectionEnd + boldDelimiter.length + selectedText.length;
        } else if (isModifier && event.key === "i") {
          event.preventDefault();
          const italicDelimiter = "_";
          newMarkdown =
            value.substring(0, selectionStart) +
            italicDelimiter +
            selectedText +
            italicDelimiter +
            value.substring(selectionEnd);
          newSelectionStart = selectionStart + italicDelimiter.length;
          newSelectionEnd =
            selectionEnd + italicDelimiter.length + selectedText.length;
        } else if (isModifier && event.key === "s") {
          event.preventDefault();
          localStorage.setItem(LOCAL_STORAGE_KEY, markdownInput);
          toast.success("문서가 저장되었습니다!");
        }

        if (newMarkdown !== value) {
          setMarkdownInput(newMarkdown);
          setTimeout(() => {
            editorRef.current?.setSelectionRange(
              newSelectionStart,
              newSelectionEnd
            );
          }, 0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [markdownInput]);

  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, markdownInput);
    }, 1000);
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [markdownInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownInput(content);
      localStorage.setItem(LOCAL_STORAGE_KEY, content);
      toast.success("파일이 성공적으로 로드되었습니다!");
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const downloadFile = (
    content: string,
    filename: string,
    mimeType: string
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    downloadFile(markdownInput, "document.md", "text/markdown");
    toast.success("Markdown 파일 다운로드를 시작합니다!");
  };

  const handleDownloadHtml = () => {
    downloadFile(htmlOutput, "document.html", "text/html");
    toast.success("HTML 파일 다운로드를 시작합니다!");
  };

  const handleCopyHtml = () => {
    copyToClipboard(htmlOutput);
    toast.success("HTML 코드가 복사되었습니다!");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex justify-end items-center gap-2 mb-4">
        <input
          type="file"
          id="markdown-file-upload"
          className="hidden"
          accept=".md"
          onChange={handleFileUpload}
        />
        <label htmlFor="markdown-file-upload">
          <Button variant="outline" asChild>
            <span>Load Markdown</span>
          </Button>
        </label>
        <Button variant="outline" onClick={handleDownloadMarkdown}>
          Download Markdown
        </Button>
        <Button variant="outline" onClick={handleDownloadHtml}>
          Download HTML
        </Button>
        <Button onClick={handleCopyHtml}>
          {copyStatus === "copied" ? "Copied!" : "Copy HTML"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
        <div className="flex-1 border rounded-md p-4 flex flex-col relative">
          <h2 className="text-lg font-semibold mb-2">Markdown Editor</h2>
          <div className="relative flex-1">
            <Textarea
              ref={editorRef}
              placeholder="여기에 Markdown 텍스트를 입력하세요..."
              className="absolute inset-0 flex-1 resize-none font-mono text-base bg-transparent text-transparent caret-white z-10 leading-relaxed"
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              onScroll={handleEditorScroll}
              style={{ lineHeight: "1.5", padding: "0.75rem" }}
            />
            <pre
              className="absolute inset-0 flex-1 overflow-auto p-3 font-mono text-base pointer-events-none prose dark:prose-invert leading-relaxed"
              style={{ lineHeight: "1.5" }}
            >
              {markdownInput}
            </pre>
          </div>
        </div>

        <div
          className="flex-1 border rounded-md p-4 overflow-auto"
          ref={previewRef}
          onScroll={handlePreviewScroll}
        >
          <h2 className="text-lg font-semibold mb-2">HTML Preview</h2>
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </div>
      
      <div className="my-8 h-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
        AD SPACE
      </div>

      <ToolSection title="Markdown 에디터 사용 방법">
        <Typography variant="p">
          이 Markdown 에디터는 당신의 텍스트를 실시간으로 아름다운 HTML 문서로
          변환해주는 강력한 도구입니다. 좌측 편집기에서 Markdown 문법을 사용하여
          텍스트를 작성하면, 우측 미리보기 패널에서 즉시 변환된 결과를 확인할 수
          있습니다.
        </Typography>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <Typography variant="h4" className="font-semibold inline">
              텍스트 입력 및 실시간 미리보기:
            </Typography>
            <Typography variant="p" className="inline ml-2">
              좌측 Markdown Editor 영역에 Markdown 문법에 맞춰 텍스트를
              입력합니다. 입력과 동시에 우측 HTML Preview 영역에서 변환된 HTML
              결과를 실시간으로 확인할 수 있습니다.
            </Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">
              파일 로드 및 저장:
            </Typography>
            <Typography variant="p" className="inline ml-2">
              'Load Markdown' 버튼을 클릭하여 기존 `.md` 파일을 에디터로 불러올
              수 있습니다.
            </Typography>
          </li>
        </ul>
      </ToolSection>
    </>
  );
}
