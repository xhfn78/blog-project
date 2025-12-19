import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarkdownEditorTool from '@/features/tools/tools/markdown-editor'; // MarkdownEditorTool 컴포넌트 임포트
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { vi } from 'vitest';

// marked와 DOMPurify 모킹
vi.mock('marked', () => ({
  marked: {
    parse: vi.fn((markdown) => `<p>${markdown}</p>`), // 간단히 HTML로 변환하는 것처럼 모킹
    setOptions: vi.fn(),
  },
}));

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html) => html), // sanitize는 인풋을 그대로 반환하는 것처럼 모킹
  },
}));

// localStorage 모킹
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// next-themes useTheme 모킹
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

// useCopyToClipboard 모킹
vi.mock('@/shared/lib/hooks/use-copy-to-clipboard', () => ({
  useCopyToClipboard: () => [
    { isCopied: false, value: undefined }, // 초기 상태
    vi.fn(() => ({ isCopied: true, value: 'mocked content' })), // 복사 함수
  ],
}));


describe('MarkdownEditorTool', () => {
  beforeEach(() => {
    localStorageMock.clear(); // 각 테스트 전에 localStorage 초기화
    vi.clearAllMocks(); // 모든 모의 함수 초기화
  });

  it('renders correctly and loads initial markdown from localStorage if available', () => {
    localStorage.setItem('markdown-editor-content', '## Saved Markdown');
    render(<MarkdownEditorTool />);

    // localStorage에서 로드된 내용 확인
    expect(screen.getByPlaceholderText('여기에 Markdown 텍스트를 입력하세요...')).toHaveValue('## Saved Markdown');
    // marked.parse가 호출되었는지 확인
    expect(marked.parse).toHaveBeenCalledWith('## Saved Markdown');
    // dompurify.sanitize가 호출되었는지 확인
    expect(DOMPurify.sanitize).toHaveBeenCalledWith('<p>## Saved Markdown</p>');
    // 미리보기 영역에 HTML이 올바르게 렌더링되었는지 확인
    expect(screen.getByText('## Saved Markdown').closest('div')).toHaveClass('prose');
  });

  it('renders correctly with initial markdown if no localStorage content', () => {
    render(<MarkdownEditorTool />);

    // 초기 마크다운 내용이 로드되었는지 확인
    expect(screen.getByPlaceholderText('여기에 Markdown 텍스트를 입력하세요...')).toHaveValue(expect.any(String));
    expect(marked.parse).toHaveBeenCalled();
    expect(DOMPurify.sanitize).toHaveBeenCalled();
  });

  it('updates html output when markdown input changes', async () => {
    render(<MarkdownEditorTool />);
    const editor = screen.getByPlaceholderText('여기에 Markdown 텍스트를 입력하세요...');

    fireEvent.change(editor, { target: { value: '# New Heading' } });

    await waitFor(() => {
      expect(marked.parse).toHaveBeenCalledWith('# New Heading');
      expect(DOMPurify.sanitize).toHaveBeenCalledWith('<p># New Heading</p>');
    });
  });

  it('saves markdown to localStorage automatically on input change', async () => {
    render(<MarkdownEditorTool />);
    const editor = screen.getByPlaceholderText('여기에 Markdown 텍스트를 입력하세요...');

    fireEvent.change(editor, { target: { value: 'Auto-saved content' } });

    // 디바운스 시간(1000ms) 이후에 localStorage.setItem이 호출되는지 확인
    // vi.advanceTimersByTime을 사용하여 시간을 가속화합니다.
    vi.useFakeTimers();
    fireEvent.change(editor, { target: { value: 'Auto-saved content' } });
    vi.advanceTimersByTime(1000);
    expect(localStorage.setItem).toHaveBeenCalledWith('markdown-editor-content', 'Auto-saved content');
    vi.useRealTimers();
  });

  it('loads markdown from file correctly', async () => {
    render(<MarkdownEditorTool />);
    const fileContent = 'Content from file';
    const file = new File([fileContent], 'test.md', { type: 'text/markdown' });
    const input = screen.getByLabelText('Load Markdown');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('여기에 Markdown 텍스트를 입력하세요...')).toHaveValue(fileContent);
      expect(localStorage.setItem).toHaveBeenCalledWith('markdown-editor-content', fileContent);
    });
  });

  it('downloads markdown file', () => {
    render(<MarkdownEditorTool />);
    const downloadButton = screen.getByRole('button', { name: 'Download Markdown' });

    // window.URL.createObjectURL 및 document.createElement('a') 모킹
    const createObjectURLMock = vi.fn(() => 'blob:http://localhost/mock-url');
    const revokeObjectURLMock = vi.fn();
    Object.defineProperty(window.URL, 'createObjectURL', { value: createObjectURLMock });
    Object.defineProperty(window.URL, 'revokeObjectURL', { value: revokeObjectURLMock });

    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    const clickMock = vi.fn();
    const aTagMock = {
      href: '',
      download: '',
      click: clickMock,
    };
    Object.defineProperty(document, 'createElement', {
      value: vi.fn((tagName: string) => (tagName === 'a' ? aTagMock : undefined)),
    });
    Object.defineProperty(document.body, 'appendChild', { value: appendChildMock });
    Object.defineProperty(document.body, 'removeChild', { value: removeChildMock });

    fireEvent.click(downloadButton);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(aTagMock.download).toBe('document.md');
    expect(appendChildMock).toHaveBeenCalledWith(aTagMock);
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalledWith(aTagMock);
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:http://localhost/mock-url');
  });

  it('downloads html file', async () => {
    render(<MarkdownEditorTool />);
    const downloadButton = screen.getByRole('button', { name: 'Download HTML' });

    const createObjectURLMock = vi.fn(() => 'blob:http://localhost/mock-url-html');
    const revokeObjectURLMock = vi.fn();
    Object.defineProperty(window.URL, 'createObjectURL', { value: createObjectURLMock });
    Object.defineProperty(window.URL, 'revokeObjectURL', { value: revokeObjectURLMock });

    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    const clickMock = vi.fn();
    const aTagMock = {
      href: '',
      download: '',
      click: clickMock,
    };
    Object.defineProperty(document, 'createElement', {
      value: vi.fn((tagName: string) => (tagName === 'a' ? aTagMock : undefined)),
    });
    Object.defineProperty(document.body, 'appendChild', { value: appendChildMock });
    Object.defineProperty(document.body, 'removeChild', { value: removeChildMock });

    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
      expect(aTagMock.download).toBe('document.html');
      expect(appendChildMock).toHaveBeenCalledWith(aTagMock);
      expect(clickMock).toHaveBeenCalled();
      expect(removeChildMock).toHaveBeenCalledWith(aTagMock);
      expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:http://localhost/mock-url-html');
    });
  });

  it('copies html to clipboard', async () => {
    render(<MarkdownEditorTool />);
    const copyButton = screen.getByRole('button', { name: 'Copy HTML' });

    // useCopyToClipboard 훅의 복사 함수가 호출되는지 확인
    fireEvent.click(copyButton);

    // useCopyToClipboard 훅이 모킹되었으므로, 해당 훅의 내부 함수 호출 여부로 확인
    // 여기서는 useCopyToClipboard의 두 번째 인자가 호출되는지만 확인합니다.
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument();
  });

  // 테마 토글 테스트 (next-themes 모킹에 따라 달라질 수 있음)
  it('toggles theme', () => {
    const setThemeMock = vi.fn();
    vi.mock('next-themes', () => ({
      useTheme: () => ({ theme: 'light', setTheme: setThemeMock }),
    }));
    render(<MarkdownEditorTool />);
    const themeToggleButton = screen.getByRole('button', { name: 'Light Mode' });

    fireEvent.click(themeToggleButton);
    expect(setThemeMock).toHaveBeenCalledWith('dark');

    vi.mock('next-themes', () => ({
      useTheme: () => ({ theme: 'dark', setTheme: setThemeMock }),
    }));
    render(<MarkdownEditorTool />); // 다시 렌더링하여 모의 테마 상태 변경
    fireEvent.click(screen.getByRole('button', { name: 'Dark Mode' }));
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });

});
