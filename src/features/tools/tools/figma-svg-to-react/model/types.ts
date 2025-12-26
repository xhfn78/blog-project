export interface SvgTransformOptions {
  useTypescript: boolean;
  useCurrentColor: boolean;
  componentName: string;
  addPropsInterface: boolean;
}

export interface SvgTransformResult {
  code: string;
  originalSize: number;
  optimizedSize: number;
  error?: string;
}

export interface SvgConverterState {
  inputSvg: string;
  options: SvgTransformOptions;
  result: SvgTransformResult | null;
  isTransforming: boolean;
}
