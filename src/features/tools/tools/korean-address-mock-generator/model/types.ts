export interface AddressData {
  zipCode: string;
  roadAddress: string;
  jibunAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

export type ExportFormat = 'json' | 'csv' | 'tsv' | 'typescript';

export interface GenerationOptions {
  count: number;
  includeCoordinates: boolean;
  includeDetail: boolean;
  format: ExportFormat;
}
