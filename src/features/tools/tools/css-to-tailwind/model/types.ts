export interface CSSProperty {
  property: string;
  value: string;
}

export interface TailwindResult {
  className: string;
  originalProperty: string;
  originalValue: string;
}

export interface ConversionResult {
  fullClassName: string;
  details: TailwindResult[];
}
