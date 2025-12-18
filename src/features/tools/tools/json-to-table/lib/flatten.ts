import { JsonValue, JsonObject, JsonArray, FlatRow, FlattenConfig } from './types';
import { applyMasking, DEFAULT_MASK_CONFIG } from './mask';

/**
 * Default flatten configuration
 */
export const DEFAULT_FLATTEN_CONFIG: FlattenConfig = {
  delimiter: '_',
  arrayIndexing: true,
  maskConfig: DEFAULT_MASK_CONFIG,
};

/**
 * Recursively flatten a nested JSON object
 *
 * @param obj - The object to flatten
 * @param config - Configuration for flattening
 * @param prefix - Current key prefix for nested objects
 * @param result - Accumulated result object
 * @returns Flattened object
 */
function flattenObject(
  obj: JsonObject,
  config: FlattenConfig,
  prefix: string = '',
  result: FlatRow = {}
): FlatRow {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}${config.delimiter}${key}` : key;

    if (value === null || value === undefined) {
      // Handle null/undefined values
      result[newKey] = applyMasking(newKey, null, config.maskConfig || DEFAULT_MASK_CONFIG);
    } else if (Array.isArray(value)) {
      // Handle arrays
      if (value.length === 0) {
        result[newKey] = '[]';
      } else {
        flattenArray(value, config, newKey, result);
      }
    } else if (typeof value === 'object') {
      // Recursively flatten nested objects
      flattenObject(value as JsonObject, config, newKey, result);
    } else {
      // Handle primitive values (string, number, boolean)
      result[newKey] = applyMasking(
        newKey,
        value,
        config.maskConfig || DEFAULT_MASK_CONFIG
      );
    }
  }

  return result;
}

/**
 * Flatten an array
 *
 * @param arr - The array to flatten
 * @param config - Configuration for flattening
 * @param prefix - Current key prefix
 * @param result - Accumulated result object
 */
function flattenArray(
  arr: JsonArray,
  config: FlattenConfig,
  prefix: string,
  result: FlatRow
): void {
  arr.forEach((item, index) => {
    const indexKey = config.arrayIndexing ? `${prefix}${config.delimiter}${index}` : prefix;

    if (item === null || item === undefined) {
      result[indexKey] = applyMasking(indexKey, null, config.maskConfig || DEFAULT_MASK_CONFIG);
    } else if (Array.isArray(item)) {
      flattenArray(item, config, indexKey, result);
    } else if (typeof item === 'object') {
      flattenObject(item as JsonObject, config, indexKey, result);
    } else {
      result[indexKey] = applyMasking(
        indexKey,
        item,
        config.maskConfig || DEFAULT_MASK_CONFIG
      );
    }
  });
}

/**
 * Convert JSON to flattened rows
 *
 * @param json - The JSON data to flatten
 * @param config - Configuration for flattening
 * @returns Array of flattened rows
 */
export function jsonToFlatRows(
  json: JsonValue,
  config: FlattenConfig = DEFAULT_FLATTEN_CONFIG
): FlatRow[] {
  if (json === null || json === undefined) {
    return [];
  }

  if (Array.isArray(json)) {
    // If root is an array, flatten each element as a separate row
    return json.map((item) => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        return flattenObject(item as JsonObject, config);
      } else {
        // Handle primitive array elements
        return { value: applyMasking('value', item as any, config.maskConfig || DEFAULT_MASK_CONFIG) };
      }
    });
  } else if (typeof json === 'object') {
    // If root is an object, return a single row
    return [flattenObject(json as JsonObject, config)];
  } else {
    // If root is a primitive value
    return [{ value: applyMasking('value', json as any, config.maskConfig || DEFAULT_MASK_CONFIG) }];
  }
}

/**
 * Get all unique column names from flattened rows
 *
 * @param rows - Array of flattened rows
 * @returns Array of unique column names
 */
export function getColumns(rows: FlatRow[]): string[] {
  const columnSet = new Set<string>();

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => columnSet.add(key));
  });

  return Array.from(columnSet).sort();
}
