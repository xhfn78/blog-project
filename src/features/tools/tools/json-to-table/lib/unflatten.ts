import { JsonValue, JsonObject, FlatRow, FlattenConfig } from './types';
import { DEFAULT_FLATTEN_CONFIG } from './flatten';

/**
 * Set a value in a nested object using a path
 *
 * @param obj - The object to set the value in
 * @param path - Array of keys representing the path
 * @param value - The value to set
 */
function setNestedValue(obj: any, path: string[], value: any): void {
  let current = obj;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];

    // Determine if next level should be an array or object
    const isNextKeyNumeric = /^\d+$/.test(nextKey);

    if (!(key in current)) {
      current[key] = isNextKeyNumeric ? [] : {};
    }

    current = current[key];
  }

  const lastKey = path[path.length - 1];
  current[lastKey] = value;
}

/**
 * Convert a flattened row back to a nested object
 *
 * @param row - The flattened row
 * @param config - Configuration used for flattening
 * @returns Nested object
 */
export function unflattenRow(
  row: FlatRow,
  config: FlattenConfig = DEFAULT_FLATTEN_CONFIG
): JsonObject {
  const result: JsonObject = {};

  for (const key in row) {
    if (!row.hasOwnProperty(key)) continue;

    const value = row[key];
    const path = key.split(config.delimiter);

    // Convert numeric string indices to numbers for array handling
    const processedPath = path.map((segment) => {
      return /^\d+$/.test(segment) ? segment : segment;
    });

    setNestedValue(result, processedPath, value);
  }

  // Convert array-like objects to actual arrays
  return convertArrayLikeObjects(result);
}

/**
 * Recursively convert objects with numeric keys to arrays
 *
 * @param obj - The object to process
 * @returns Processed object with arrays
 */
function convertArrayLikeObjects(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertArrayLikeObjects);
  }

  // Check if object has only numeric keys (is array-like)
  const keys = Object.keys(obj);
  const isArrayLike = keys.length > 0 && keys.every((key) => /^\d+$/.test(key));

  if (isArrayLike) {
    // Convert to array
    const arr: any[] = [];
    keys.forEach((key) => {
      const index = parseInt(key, 10);
      arr[index] = convertArrayLikeObjects(obj[key]);
    });
    return arr;
  }

  // Recursively process nested objects
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = convertArrayLikeObjects(obj[key]);
    }
  }

  return result;
}

/**
 * Convert multiple flattened rows back to JSON
 *
 * @param rows - Array of flattened rows
 * @param config - Configuration used for flattening
 * @returns Original JSON structure (array or object)
 */
export function flatRowsToJson(
  rows: FlatRow[],
  config: FlattenConfig = DEFAULT_FLATTEN_CONFIG
): JsonValue {
  if (rows.length === 0) {
    return null;
  }

  if (rows.length === 1) {
    // Single row could be a single object
    const unflattened = unflattenRow(rows[0], config);

    // If the row has only a 'value' key, return the value itself
    const keys = Object.keys(unflattened);
    if (keys.length === 1 && keys[0] === 'value') {
      return unflattened.value;
    }

    return unflattened;
  }

  // Multiple rows represent an array of objects
  return rows.map((row) => unflattenRow(row, config));
}
