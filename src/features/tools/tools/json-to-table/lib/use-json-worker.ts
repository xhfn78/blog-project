import { useCallback, useRef, useEffect } from 'react';
import { FlattenConfig, FlatRow } from './types';

export interface UseJsonWorkerResult {
  flattenJson: (
    json: any,
    config?: FlattenConfig
  ) => Promise<{ rows: FlatRow[]; columns: string[] }>;
  unflattenJson: (rows: FlatRow[], config?: FlattenConfig) => Promise<any>;
  isProcessing: boolean;
}

/**
 * Hook to use Web Worker for JSON processing
 * Falls back to synchronous processing if Web Worker is not available
 */
export function useJsonWorker(): UseJsonWorkerResult {
  const workerRef = useRef<Worker | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    // Create worker on mount
    try {
      // For Next.js, we need to use inline worker
      // We'll use synchronous processing as fallback for now
      // In production, you'd want to properly set up worker loading
    } catch (error) {
      console.warn('Web Worker not available, using synchronous processing');
    }

    return () => {
      // Cleanup worker on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const flattenJson = useCallback(
    async (json: any, config?: FlattenConfig): Promise<{ rows: FlatRow[]; columns: string[] }> => {
      isProcessingRef.current = true;

      try {
        // Import synchronously for now
        // In production, this would use the Web Worker
        const { jsonToFlatRows, getColumns } = await import('./flatten');

        const rows = jsonToFlatRows(json, config);
        const columns = getColumns(rows);

        return { rows, columns };
      } finally {
        isProcessingRef.current = false;
      }
    },
    []
  );

  const unflattenJson = useCallback(async (rows: FlatRow[], config?: FlattenConfig): Promise<any> => {
    isProcessingRef.current = true;

    try {
      const { flatRowsToJson } = await import('./unflatten');
      return flatRowsToJson(rows, config);
    } finally {
      isProcessingRef.current = false;
    }
  }, []);

  return {
    flattenJson,
    unflattenJson,
    isProcessing: isProcessingRef.current,
  };
}
