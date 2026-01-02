export interface ConverterState {
  px: number;
  rem: number;
  baseSize: number;
}

export interface ConverterActions {
  setPx: (value: number) => void;
  setRem: (value: number) => void;
  setBaseSize: (value: number) => void;
}

export interface ControlPanelProps {
  baseSize: number;
  onBaseSizeChange: (value: number) => void;
}

export interface ConversionInputProps {
  label: string;
  value: number;
  unit: string;
  onChange: (value: number) => void;
  readOnly?: boolean;
}
