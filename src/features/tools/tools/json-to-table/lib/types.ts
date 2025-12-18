/**
 * Types for JSON to Table conversion
 */

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];

/**
 * Flattened row representation
 */
export interface FlatRow {
  [key: string]: string | number | boolean | null;
}

/**
 * Configuration for security masking
 */
export interface MaskConfig {
  enabled: boolean;
  sensitiveKeys: string[];
  maskChar: string;
  showLength: number; // Number of characters to show before masking
}

/**
 * Configuration for flattening
 */
export interface FlattenConfig {
  delimiter: string; // Separator for nested keys (e.g., "_" or ".")
  arrayIndexing: boolean; // Whether to include array indices
  maskConfig?: MaskConfig;
}
