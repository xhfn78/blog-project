import { useCallback, useRef, useEffect, useState } from 'react';
import { FlattenConfig, FlatRow } from './types';
import type { WorkerMessage, WorkerResponse } from './json-worker';

export interface UseJsonWorkerResult {
  flattenJson: (
    json: any,
    config?: FlattenConfig
  ) => Promise<{ rows: FlatRow[]; columns: string[] }>;
  unflattenJson: (rows: FlatRow[], config?: FlattenConfig) => Promise<any>;
  isProcessing: boolean;
  progress: number;
}

/**
 * Hook to use Web Worker for JSON processing
 * Falls back to synchronous processing if Web Worker is not available
 */
export function useJsonWorker(): UseJsonWorkerResult {
  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const useWorker = useRef(false);

  useEffect(() => {
    // Try to create worker on mount
    try {
      // For Next.js, we need to check if Worker is available (client-side only)
      if (typeof Worker !== 'undefined' && typeof window !== 'undefined') {
        // We'll use synchronous processing for now due to Next.js bundling complexity
        // In a production setup, you'd use a worker loader or inline worker
        useWorker.current = false;
      }
    } catch (error) {
      console.warn('Web Worker not available, using synchronous processing');
      useWorker.current = false;
    }

    return () => {
      // Cleanup worker on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const flattenJson = useCallback(
    async (json: any, config?: FlattenConfig): Promise<{ rows: FlatRow[]; columns: string[] }> => {
      setIsProcessing(true);
      setProgress(0);

      try {
        if (useWorker.current && workerRef.current) {
          // Use Web Worker (future implementation)
          return new Promise((resolve, reject) => {
            const worker = workerRef.current!;

            const handleMessage = (event: MessageEvent<WorkerResponse>) => {
              if (event.data.type === 'success') {
                resolve(event.data.data);
              } else {
                reject(new Error(event.data.error));
              }
              worker.removeEventListener('message', handleMessage);
            };

            worker.addEventListener('message', handleMessage);
            worker.postMessage({
              type: 'flatten',
              data: json,
              config,
            } as WorkerMessage);
          });
        } else {
          // Synchronous processing with progress simulation
          setProgress(25);
          const { jsonToFlatRows, getColumns } = await import('./flatten');

          setProgress(50);
          const rows = jsonToFlatRows(json, config);

          setProgress(75);
          const columns = getColumns(rows);

          setProgress(100);

          // Small delay to show progress
          await new Promise(resolve => setTimeout(resolve, 100));

          return { rows, columns };
        }
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    []
  );

  const unflattenJson = useCallback(
    async (rows: FlatRow[], config?: FlattenConfig): Promise<any> => {
      setIsProcessing(true);
      setProgress(0);

      try {
        if (useWorker.current && workerRef.current) {
          // Use Web Worker (future implementation)
          return new Promise((resolve, reject) => {
            const worker = workerRef.current!;

            const handleMessage = (event: MessageEvent<WorkerResponse>) => {
              if (event.data.type === 'success') {
                resolve(event.data.data);
              } else {
                reject(new Error(event.data.error));
              }
              worker.removeEventListener('message', handleMessage);
            };

            worker.addEventListener('message', handleMessage);
            worker.postMessage({
              type: 'unflatten',
              data: rows,
              config,
            } as WorkerMessage);
          });
        } else {
          // Synchronous processing with progress simulation
          setProgress(50);
          const { flatRowsToJson } = await import('./unflatten');
          const result = flatRowsToJson(rows, config);

          setProgress(100);

          // Small delay to show progress
          await new Promise(resolve => setTimeout(resolve, 100));

          return result;
        }
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    []
  );

  return {
    flattenJson,
    unflattenJson,
    isProcessing,
    progress,
  };
}
