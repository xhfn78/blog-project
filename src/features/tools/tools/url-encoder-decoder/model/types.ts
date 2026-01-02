export interface UrlState {
  input: string;
  encoded: string;
  decoded: string;
  mode: 'encode' | 'decode';
}

export interface UrlActions {
  setInput: (value: string) => void;
  setMode: (mode: 'encode' | 'decode') => void;
  clear: () => void;
}
