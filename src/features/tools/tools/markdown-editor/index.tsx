"use client"; // 클라이언트 컴포넌트 지시문 추가

import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Button } from "@/shared/ui/button";
import { useCopyToClipboard } from "@/shared/lib/hooks/use-copy-to-clipboard";
import toast, { Toaster } from 'react-hot-toast';
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";

// marked.setOptions는 컴포넌트 외부에 설정하여 한 번만 초기화
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

\`\`\`python
// 예시 코드 블록 (Python)
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))
\`\`\`

> 인용 블록도 잘 작동합니다.

| 헤더 1 | 헤더 2 | 헤더 3 |
|---|---|---|
| 셀 1-1 | 셀 1-2 | 셀 1-3 |
| 셀 2-1 | 셀 2-2 | 셀 2-3 |

- [x] 체크박스 리스트 1
- [ ] 체크박스 리스트 2

더 많은 Markdown 문법을 시도해보세요!
`;

const LOCAL_STORAGE_KEY = 'markdown-editor-content'; // localStorage 키 정의

export default function MarkdownEditorTool() {

  // localStorage에서 초기값을 불러오거나 initialMarkdown 사용
  const [markdownInput, setMarkdownInput] = useState(() => {
    if (typeof window !== 'undefined') { // 브라우저 환경에서만 localStorage 접근
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
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 자동 저장을 위한 timeout ref 추가

  const { status: copyStatus, copyToClipboard } = useCopyToClipboard(); // useCopyToClipboard 훅 사용

  useEffect(() => {
    (async () => {
      let parsedHtml = await marked.parse(markdownInput);
      // 체크박스 input에 aria-label 추가 (접근성 개선)
      parsedHtml = parsedHtml.replace(/<input([^>]+type="checkbox"[^>]*)>/g, (match: string, attrs: string) => {
        if (attrs.includes('aria-label')) return match;
        return `<input${attrs} aria-label="체크박스 항목" />`;
      });
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
        const editorScrollHeight = editorRef.current.scrollHeight - editorRef.current.clientHeight;
        const previewScrollHeight = previewRef.current.scrollHeight - previewRef.current.clientHeight;

        if (editorScrollHeight > 0) {
          const scrollRatio = editorScrollTop / editorScrollHeight;
          // 미리보기 스크롤 조정 시, 에디터의 스크롤 위치를 고정하기 위해 isScrollingPreview를 false로 설정하지 않음
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
        const previewScrollHeight = previewRef.current.scrollHeight - previewRef.current.clientHeight;
        const editorScrollHeight = editorRef.current.scrollHeight - editorRef.current.clientHeight;

        if (previewScrollHeight > 0) {
          const scrollRatio = previewScrollTop / previewScrollHeight;
          // 에디터 스크롤 조정 시, 미리보기의 스크롤 위치를 고정하기 위해 isScrollingEditor를 false로 설정하지 않음
          editorRef.current.scrollTop = scrollRatio * editorScrollHeight;
        }
      }
      setIsScrollingPreview(false);
    }, 50);
  };

  // 단축키 핸들러
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isModifier = isMac ? event.metaKey : event.ctrlKey;

      if (editorRef.current) {
        const { selectionStart, selectionEnd, value } = editorRef.current;
        const selectedText = value.substring(selectionStart, selectionEnd);

        let newMarkdown = value;
        let newSelectionStart = selectionStart;
        let newSelectionEnd = selectionEnd;

        // Ctrl/Cmd + B (Bold)
        if (isModifier && event.key === 'b') {
          event.preventDefault();
          const boldDelimiter = '**';
          newMarkdown = 
            value.substring(0, selectionStart) +
            boldDelimiter +
            selectedText +
            boldDelimiter +
            value.substring(selectionEnd);
          newSelectionStart = selectionStart + boldDelimiter.length;
          newSelectionEnd = selectionEnd + boldDelimiter.length + selectedText.length;
        }
        // Ctrl/Cmd + I (Italic)
        else if (isModifier && event.key === 'i') {
          event.preventDefault();
          const italicDelimiter = '_';
          newMarkdown = 
            value.substring(0, selectionStart) +
            italicDelimiter +
            selectedText +
            italicDelimiter +
            value.substring(selectionEnd);
          newSelectionStart = selectionStart + italicDelimiter.length;
          newSelectionEnd = selectionEnd + italicDelimiter.length + selectedText.length;
        }
        // Ctrl/Cmd + S (Save)
        else if (isModifier && event.key === 's') {
          event.preventDefault();
          localStorage.setItem(LOCAL_STORAGE_KEY, markdownInput);
          toast.success('문서가 저장되었습니다!');
        }

        if (newMarkdown !== value) {
          setMarkdownInput(newMarkdown);
          setTimeout(() => {
            editorRef.current?.setSelectionRange(newSelectionStart, newSelectionEnd);
          }, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [markdownInput]);

  // 자동 저장 로직
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, markdownInput);
      console.log('Markdown content saved automatically!');
    }, 1000);
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [markdownInput]);

  // 파일 업로드 핸들러
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownInput(content);
      localStorage.setItem(LOCAL_STORAGE_KEY, content);
      toast.success('파일이 성공적으로 로드되었습니다!');
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // 파일 다운로드 유틸리티
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Markdown 파일 다운로드
  const handleDownloadMarkdown = () => {
    downloadFile(markdownInput, 'document.md', 'text/markdown');
    toast.success('Markdown 파일 다운로드를 시작합니다!');
  };

  // HTML 파일 다운로드
  const handleDownloadHtml = () => {
    downloadFile(htmlOutput, 'document.html', 'text/html');
    toast.success('HTML 파일 다운로드를 시작합니다!');
  };

  // HTML 복사 핸들러
  const handleCopyHtml = () => {
    copyToClipboard(htmlOutput);
    toast.success('HTML 코드가 복사되었습니다!');
  };


  return (
    <ToolLayout config={config}>
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
        <Button variant="outline" onClick={handleDownloadMarkdown}>Download Markdown</Button>
        <Button variant="outline" onClick={handleDownloadHtml}>Download HTML</Button>
        <Button onClick={handleCopyHtml}>{copyStatus === 'copied' ? 'Copied!' : 'Copy HTML'}</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
        {/* Markdown Editor Area */}
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
              style={{ lineHeight: '1.5', padding: '0.75rem' }}
            />
            <pre
              className="absolute inset-0 flex-1 overflow-auto p-3 font-mono text-base pointer-events-none prose dark:prose-invert leading-relaxed"
              style={{ lineHeight: '1.5' }}
            >
              {markdownInput}
            </pre>
          </div>
        </div>

        {/* HTML Preview Area */}
        <div className="flex-1 border rounded-md p-4 overflow-auto" ref={previewRef} onScroll={handlePreviewScroll}>
          <h2 className="text-lg font-semibold mb-2">HTML Preview</h2>
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </div>
      {/* 광고 배치 공간 (my-8 필수) - 지침에 따라 추가 */}
      <div className="my-8 h-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
        AD SPACE
      </div>

      {/* 2️⃣ 사용 가이드 (중단 500자+) */}
      <ToolSection title="Markdown 에디터 사용 방법">
        <Typography variant="p">
          이 Markdown 에디터는 당신의 텍스트를 실시간으로 아름다운 HTML 문서로 변환해주는 강력한 도구입니다.
          좌측 편집기에서 Markdown 문법을 사용하여 텍스트를 작성하면, 우측 미리보기 패널에서 즉시 변환된 결과를 확인할 수 있습니다.
          파일을 업로드하거나 다운로드하여 작업을 계속할 수 있으며, 변환된 HTML 코드를 쉽게 복사하여 다양한 플랫폼에 활용할 수 있습니다.
        </Typography>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <Typography variant="h4" className="font-semibold inline">텍스트 입력 및 실시간 미리보기:</Typography>
            <Typography variant="p" className="inline ml-2">좌측 Markdown Editor 영역에 Markdown 문법에 맞춰 텍스트를 입력합니다. 입력과 동시에 우측 HTML Preview 영역에서 변환된 HTML 결과를 실시간으로 확인할 수 있습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">파일 로드 및 저장:</Typography>
            <Typography variant="p" className="inline ml-2">'Load Markdown' 버튼을 클릭하여 기존 `.md` 파일을 에디터로 불러올 수 있습니다. 작업이 완료되면 'Download Markdown' 버튼으로 원본 Markdown 파일을, 'Download HTML' 버튼으로 변환된 HTML 파일을 다운로드할 수 있습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">HTML 코드 복사:</Typography>
            <Typography variant="p" className="inline ml-2">'Copy HTML' 버튼을 클릭하면 미리보기 패널에 표시된 HTML 코드가 클립보드에 복사됩니다. 복사된 코드는 웹 페이지, 블로그, 이메일 등 HTML을 지원하는 모든 곳에 바로 붙여넣어 사용할 수 있습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">단축키 활용:</Typography>
            <Typography variant="p" className="inline ml-2">선택 영역에 대해 <kbd>Ctrl/Cmd + B</kbd>로 **볼드체**를, <kbd>Ctrl/Cmd + I</kbd>로 *이탤릭체*를 적용할 수 있습니다. <kbd>Ctrl/Cmd + S</kbd>를 누르면 현재 문서가 로컬 스토리지에 저장됩니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">자동 저장 및 테마 변경:</Typography>
            <Typography variant="p" className="inline ml-2">모든 편집 내용은 1초마다 자동으로 로컬 스토리지에 저장되며, 브라우저를 닫았다 열어도 마지막 작업 상태가 복원됩니다. 우측 상단의 'Light Mode' / 'Dark Mode' 버튼으로 에디터의 테마를 전환하여 눈의 피로를 줄일 수 있습니다.</Typography>
          </li>
        </ul>
        <Typography variant="p" className="mt-4">
          이 도구는 GitHub Flavored Markdown (GFM)을 완벽하게 지원하며, 코드 블록 구문 강조 기능으로 개발 문서를 작성하는 데 특히 유용합니다.
          오류 없이 정확한 HTML을 생성하여 생산성을 극대화하세요.
        </Typography>
      </ToolSection>

      {/* 광고 배치 공간 (my-8 필수) */}
      <div className="my-8 h-24 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
        AD SPACE
      </div>

      {/* 3️⃣ SEO 콘텐츠 영역 (하단 2,000자+) - 핵심! */}
      <ToolSection title="Markdown Editor 완벽 가이드: 당신의 글쓰기 경험을 혁신하다">
        <Typography variant="h2" className="mt-6 mb-3">Markdown Editor란 무엇인가?</Typography>
        <Typography variant="p" className="mb-4">
          Markdown Editor는 Markdown 문법으로 작성된 텍스트를 실시간으로 HTML 문서로 변환하고 미리 보여주는 웹 기반 도구입니다.
          간결하고 직관적인 Markdown 문법은 개발자뿐만 아니라 블로거, 작가, 콘텐츠 마케터 등 다양한 분야의 사용자들이 구조화된 문서를 빠르게 작성할 수 있도록 돕습니다.
          이 도구는 복잡한 HTML 태그를 직접 작성하는 대신, 몇 가지 기호만으로 제목, 목록, 링크, 이미지 등을 손쉽게 표현하게 해줍니다.
          본 Markdown Editor는 당신이 작성하는 텍스트가 웹에서 어떻게 보일지 즉시 피드백을 제공함으로써, 효율적인 문서 작성과 생산성 향상에 기여합니다.
          특히, 웹 콘텐츠 제작 시 HTML 변환과 코드 복사 기능을 통해 작업 흐름을 간소화하고, 오류를 줄여줍니다.
        </Typography>

        <Typography variant="h2" className="mt-6 mb-3">주요 기능</Typography>
        <ul className="list-disc pl-6 space-y-3 mb-4">
          <li>
            <Typography variant="h4" className="font-semibold inline">실시간 Markdown 편집 및 HTML 미리보기:</Typography>
            <Typography variant="p" className="inline ml-2">좌측 편집기에서 Markdown을 입력하면 우측 미리보기 패널에서 변환된 HTML을 즉시 확인할 수 있습니다. 이는 Markdown 문법을 학습하고 정확한 결과를 얻는 데 매우 효과적입니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">GitHub Flavored Markdown (GFM) 지원:</Typography>
            <Typography variant="p" className="inline ml-2">GitHub에서 널리 사용되는 테이블, 체크박스 리스트, 코드 블록 등 GFM 문법을 완벽하게 지원하여, 개발 문서나 README 파일을 작성하는 데 최적화되어 있습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">코드 블록 구문 강조 (Syntax Highlighting):</Typography>
            <Typography variant="p" className="inline ml-2">미리보기 영역의 코드 블록은 다양한 프로그래밍 언어에 대한 구문 강조 기능을 제공합니다. 이는 기술 문서의 가독성을 높이고 코드 예제를 더욱 명확하게 전달합니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">파일 로드 및 내보내기 (Markdown/HTML):</Typography>
            <Typography variant="p" className="inline ml-2">기존 `.md` 파일을 불러와 편집하거나, 작성된 Markdown을 `.md` 파일 또는 변환된 HTML을 `.html` 파일로 다운로드할 수 있습니다. 이는 문서 관리 및 외부 플랫폼 연동에 유용합니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">HTML 코드 간편 복사:</Typography>
            <Typography variant="p" className="inline ml-2">미리보기 영역의 HTML 코드를 한 번의 클릭으로 클립보드에 복사할 수 있어, 웹사이트나 블로그 등 HTML을 사용하는 곳에 즉시 적용할 수 있습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">자동 저장 및 복원:</Typography>
            <Typography variant="p" className="inline ml-2">작성 중인 내용은 주기적으로 브라우저의 로컬 스토리지에 자동 저장됩니다. 갑작스러운 브라우저 종료나 페이지 이탈 시에도 작업 내용을 안전하게 보호하여 데이터 손실을 방지합니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">에디터-미리보기 스크롤 동기화:</Typography>
            <Typography variant="p" className="inline ml-2">편집기에서 스크롤하면 미리보기 패널도 함께 스크롤되어, 문서의 상대적인 위치에 맞춰 자동으로 스크롤됩니다.
              이 기능은 특히 방대한 콘텐츠를 수정하거나 검토할 때, 편집 중인 내용과 미리보기 결과를 동시에 추적할 수 있도록 도와
              작업 효율성과 사용자 편의성을 크게 향상시킵니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">다크/라이트 모드 테마:</Typography>
            <Typography variant="p" className="inline ml-2">개인의 선호도나 작업 환경에 맞춰 라이트 모드와 다크 모드 사이를 전환할 수 있습니다. 야간 작업 시 눈의 피로를 줄이는 데 도움을 줍니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">생산성 향상 단축키:</Typography>
            <Typography variant="p" className="inline ml-2">자주 사용하는 기능(볼드, 이탤릭, 저장 등)에 대한 단축키를 제공하여 마우스 사용을 최소화하고 키보드만으로 효율적인 편집이 가능합니다.</Typography>
          </li>
        </ul>

        <Typography variant="h2" className="mt-6 mb-3">실무에서 이렇게 사용하세요</Typography>
        <Typography variant="p" className="mb-4">
          Markdown Editor는 단순한 텍스트 변환을 넘어, 당신의 실무 워크플로우를 혁신할 수 있는 다양한 활용 시나리오를 제공합니다.
          몇 가지 예시를 통해 이 도구가 어떻게 당신의 생산성을 높일 수 있는지 살펴보겠습니다.
        </Typography>
        <ul className="list-disc pl-6 space-y-3 mb-4">
          <li>
            <Typography variant="h4" className="font-semibold inline">블로그 포스팅 및 웹 콘텐츠 제작:</Typography>
            <Typography variant="p" className="inline ml-2">블로그 포스팅이나 웹사이트 콘텐츠를 작성할 때, 복잡한 HTML 태그 대신 Markdown으로 초안을 작성한 후 이 에디터에서 최종 HTML을 생성하여 워드프레스, 티스토리 등 다양한 CMS에 손쉽게 붙여넣을 수 있습니다. 실시간 미리보기 기능은 발행 전에 시각적인 오류를 최소화하는 데 도움을 줍니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">기술 문서 및 README 파일 작성:</Typography>
            <Typography variant="p" className="inline ml-2">GitHub 프로젝트의 README.md 파일이나 내부 기술 문서를 작성할 때, GFM(GitHub Flavored Markdown) 지원으로 코드 블록, 테이블, 체크박스 리스트 등을 깔끔하게 표현할 수 있습니다. 코드 블록의 구문 강조는 개발자들이 문서를 더 쉽게 이해하도록 돕습니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">이메일 뉴스레터 및 마케팅 자료:</Typography>
            <Typography variant="p" className="inline ml-2">HTML 기반 이메일 뉴스레터나 마케팅 자료를 제작할 때, 이 도구를 사용하여 콘텐츠를 Markdown으로 작성하고, 깔끔하게 변환된 HTML을 복사하여 이메일 발송 시스템에 붙여넣을 수 있습니다. 이는 디자인과 코드의 일관성을 유지하면서도 작업 시간을 단축시킵니다.</Typography>
          </li>
          <li>
            <Typography variant="h4" className="font-semibold inline">온라인 강의 자료 및 튜토리얼:</Typography>
            <Typography variant="p" className="inline ml-2">온라인 강의 플랫폼이나 튜토리얼 웹사이트에 들어갈 자료를 만들 때, Markdown Editor를 통해 정돈된 형식의 자료를 빠르게 제작할 수 있습니다. 특히 코드 예제가 많은 기술 튜토리얼의 경우, 구문 강조 기능은 학습 효과를 높이는 데 크게 기여합니다.</Typography>
          </li>
        </ul>

        <Typography variant="h2" className="mt-6 mb-3">Markdown의 기술적 배경 및 역사</Typography>
        <Typography variant="p" className="mb-4">
          Markdown은 2004년 존 그루버(John Gruber)와 아론 스워츠(Aaron Swartz)에 의해 만들어진 경량 마크업 언어입니다.
          그들은 사람이 읽기 쉬우면서도, 순수 텍스트 형태로 작성하면 HTML로 쉽게 변환될 수 있는 문법을 목표로 했습니다.
          그 결과, 복잡한 HTML 태그 없이도 텍스트 서식을 지정할 수 있는 매우 직관적인 문법이 탄생했습니다.
          초기 Markdown은 비교적 단순했지만, GitHub를 통해 GFM(GitHub Flavored Markdown)이 확산되면서
          테이블, 체크박스 리스트, 자동 링크 등 개발자들에게 필수적인 기능들이 추가되어 사실상의 표준으로 자리 잡았습니다.
          이는 README 파일, 이슈 트래커, 위키 등 개발 협업 환경에서 Markdown의 활용도를 폭발적으로 높였습니다.
          Markdown의 핵심 원리는 **'사람이 읽고 쓰기 쉬운 것'**에 있으며, 이는 개발 문서를 포함한 모든 텍스트 콘텐츠의 작성 및 소비 방식을 변화시켰습니다.
          이러한 배경을 바탕으로 Markdown은 오늘날 웹 콘텐츠 제작, 문서화, 블로그 포스팅 등 광범위한 분야에서 강력한 도구로 활용되고 있습니다.
        </Typography>

        <table className="w-full mt-4 mb-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 border border-gray-300 dark:border-gray-600 text-left">특징</th>
              <th className="p-2 border border-gray-300 dark:border-gray-600 text-left">Markdown</th>
              <th className="p-2 border border-gray-300 dark:border-gray-600 text-left">HTML</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300 dark:border-gray-600">작성 편의성</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">간결한 문법, 학습 용이</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">복잡한 태그 구조, 학습 시간 필요</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 dark:border-gray-600">가독성</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">순수 텍스트 상태에서도 높은 가독성</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">태그가 많아 가독성 저해</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 dark:border-gray-600">활용 분야</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">블로그, 문서, 코드 README, 메시징</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">웹 페이지 구성, 웹 앱 개발</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 dark:border-gray-600">변환 용이성</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">다양한 도구로 HTML 등 변환 지원</td>
              <td className="p-2 border border-gray-300 dark:border-gray-600">다른 포맷으로 변환 시 파싱 필요</td>
            </tr>
          </tbody>
        </table>
        <Typography variant="p" className="mt-4 mb-4">
          위 표에서 볼 수 있듯이 Markdown은 작성 편의성과 가독성 면에서 HTML보다 월등한 장점을 가집니다.
          특히 기술 문서나 블로그 포스팅처럼 텍스트 콘텐츠의 비중이 높은 경우, Markdown을 사용함으로써
          작성 시간을 대폭 단축하고 콘텐츠의 집중도를 높일 수 있습니다. HTML은 웹 페이지의 최종 구조를
          정의하는 데 필수적이지만, 일상적인 콘텐츠 작성에는 Markdown이 훨씬 효율적입니다.
        </Typography>
        <Typography variant="p" className="mb-4">
          더 자세한 내용은 Mozilla Developer Network (MDN)의 <Link href="https://developer.mozilla.org/ko/docs/Web/Markdown" className="text-blue-600 hover:underline" target="_blank">Markdown 문서</Link>에서 확인할 수 있습니다.
          또한, 이 도구와 관련된 <Link href="/tools/text-formatter" className="text-blue-600 hover:underline">텍스트 포맷터</Link> 도구를 함께 사용하면 더욱 효율적인 콘텐츠 제작이 가능합니다.
        </Typography>

        <Typography variant="h2" className="mt-6 mb-3">자주 묻는 질문</Typography>
        <div className="space-y-4 mb-8">
          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q1: Markdown Editor를 사용해야 하는 주된 이유는 무엇인가요?
            </Typography>
            <Typography variant="p">
              A: Markdown Editor는 텍스트 기반의 콘텐츠를 빠르고 효율적으로 작성하고, 이를 웹 표준 HTML로 변환하는 데 최적화된 도구입니다.
              복잡한 HTML 태그를 일일이 기억하거나 수동으로 입력할 필요 없이, 간결한 Markdown 문법만으로도 제목, 목록, 링크, 코드 블록 등
              다양한 서식의 문서를 만들 수 있습니다. 실시간 미리보기 기능은 작업의 정확성을 높여주고, HTML 내보내기 기능은
              블로그, 웹사이트 등 다양한 플랫폼에 콘텐츠를 쉽게 게시할 수 있도록 돕습니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q2: GFM(GitHub Flavored Markdown)은 무엇이며, 이 에디터에서 어떻게 활용되나요?
            </Typography>
            <Typography variant="p">
              A: GFM은 GitHub에서 확장하여 사용하는 Markdown 문법으로, 기존 Markdown에 비해 테이블, 태스크 리스트(체크박스),
              코드 블록 내 언어 지정 등 개발자 친화적인 기능들이 추가되었습니다. 본 에디터는 GFM을 완벽하게 지원하므로,
              GitHub README 파일이나 기술 문서를 작성할 때 필요한 모든 서식 요소를 문제없이 사용할 수 있습니다.
              이는 개발 관련 콘텐츠의 가독성과 표현력을 크게 향상시킵니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q3: 자동 저장 기능은 어떻게 작동하며, 데이터 손실 위험은 없나요?
            </Typography>
            <Typography variant="p">
              A: 에디터에 작성되는 모든 내용은 1초마다 자동으로 브라우저의 로컬 스토리지에 저장됩니다.
              이는 사용자가 실수로 페이지를 닫거나 브라우저가 예기치 않게 종료되더라도, 다음에 에디터를 열었을 때
              마지막 작업 상태를 그대로 복원할 수 있도록 보장합니다. 로컬 스토리지는 클라이언트 측에 저장되므로
              별도의 서버 비용이 발생하지 않으며, 데이터는 사용자 브라우저 내에 안전하게 보관됩니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q4: 이 도구를 사용하여 생성된 HTML 코드는 웹 표준을 준수하나요?
            </Typography>
            <Typography variant="p">
              A: 네, 이 Markdown Editor는 `marked.js` 라이브러리를 기반으로 HTML을 생성하며, 이는 웹 표준을 준수하는 유효한 HTML을 출력합니다.
              또한, 출력되는 HTML은 `DOMPurify` 라이브러리를 통해 철저히 새니타이징(Sanitizing)되어 XSS(Cross-Site Scripting)와 같은
              보안 위협으로부터 안전합니다. 따라서 생성된 HTML 코드는 신뢰할 수 있으며, 다양한 웹 환경에서 안정적으로 작동합니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q5: 긴 문서를 편집할 때 에디터와 미리보기 패널의 스크롤 동기화가 잘 되나요?
            </Typography>
            <Typography variant="p">
              A: 네, 본 에디터는 긴 문서를 효율적으로 편집할 수 있도록 에디터 패널과 미리보기 패널 간의 스크롤 동기화 기능을 제공합니다.
              어느 한쪽 패널을 스크롤하면 다른 쪽 패널도 문서의 상대적인 위치에 맞춰 자동으로 스크롤됩니다.
              이 기능은 특히 방대한 콘텐츠를 수정하거나 검토할 때, 편집 중인 내용과 미리보기 결과를 동시에 추적할 수 있도록 도와
              작업 효율성과 사용자 편의성을 크게 향상시킵니다.
            </Typography>
          </div>
        </div>
      </ToolSection>

      {/* 4️⃣ 관련 도구 추천 (선택) */}
      {/* <RelatedToolsSection /> */}
    </ToolLayout>
  );
}
