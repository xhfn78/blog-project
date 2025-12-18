/**
 * Web Worker for processing large JSON files
 * This runs in a separate thread to avoid blocking the UI
 */

import { jsonToFlatRows, getColumns } from './flatten';
import { flatRowsToJson } from './unflatten';
import { FlattenConfig } from './types';

export interface WorkerMessage {
  type: 'flatten' | 'unflatten';
  data: any;
  config?: FlattenConfig;
}

export interface WorkerResponse {
  type: 'success' | 'error';
  data?: any;
  error?: string;
}

// This code runs in the worker context
self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { type, data, config } = event.data;

  try {
    if (type === 'flatten') {
      const rows = jsonToFlatRows(data, config);
      const columns = getColumns(rows);

      self.postMessage({
        type: 'success',
        data: { rows, columns },
      } as WorkerResponse);
    } else if (type === 'unflatten') {
      const json = flatRowsToJson(data, config);

      self.postMessage({
        type: 'success',
        data: json,
      } as WorkerResponse);
    } else {
      throw new Error(`Unknown worker message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    } as WorkerResponse);
  }
});

export {};
