'use client';

import { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Input } from '@/shared/ui/input';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { FlatRow } from '../lib/types';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export interface VirtualTableProps {
  rows: FlatRow[];
  columns: string[];
  onCellChange: (rowIndex: number, columnName: string, value: string) => void;
  maxHeight?: number;
  sortConfig?: SortConfig | null;
  onSort?: (column: string) => void;
  columnWidths?: Record<string, number>;
  onColumnResize?: (column: string, width: number) => void;
}

export function VirtualTable({
  rows,
  columns,
  onCellChange,
  maxHeight = 600,
  sortConfig = null,
  onSort,
  columnWidths = {},
  onColumnResize,
}: VirtualTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Row virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56, // Increased row height for better readability
    overscan: 10, // Buffer rows for smooth scrolling
  });

  // Column virtualizer
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length + 1, // +1 for row number column
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      if (index === 0) return 80; // Row number column (wider)
      const column = columns[index - 1];
      return columnWidths[column] || 280; // Increased default column width
    },
    overscan: 3, // Buffer columns
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  const totalHeight = rowVirtualizer.getTotalSize();
  const totalWidth = columnVirtualizer.getTotalSize();

  // Header height (increased for better visibility)
  const HEADER_HEIGHT = 52;

  // Minimum height to ensure table is visible even with few rows (about 10 rows visible)
  const MIN_HEIGHT = 620;
  const tableHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, totalHeight + HEADER_HEIGHT));

  return (
    <div
      ref={parentRef}
      className="border rounded-md overflow-auto"
      style={{ height: `${tableHeight}px` }}
    >
      <div style={{ height: `${totalHeight + HEADER_HEIGHT}px`, width: `${totalWidth}px`, position: 'relative' }}>
        {/* Sticky Header */}
        <div
          className="sticky top-0 z-10 bg-secondary border-b"
          style={{ height: `${HEADER_HEIGHT}px`, width: `${totalWidth}px` }}
        >
          {virtualColumns.map((virtualColumn) => {
            const isRowNumberColumn = virtualColumn.index === 0;
            const columnName = isRowNumberColumn ? '번호' : columns[virtualColumn.index - 1];
            const isSorted = sortConfig?.column === columnName;
            const canSort = !isRowNumberColumn && onSort;

            return (
              <div
                key={virtualColumn.key}
                className={`absolute top-0 px-4 py-3 text-left font-semibold border-r flex items-center text-base ${
                  canSort ? 'cursor-pointer hover:bg-secondary/80 select-none' : ''
                }`}
                style={{
                  left: 0,
                  height: `${HEADER_HEIGHT}px`,
                  width: `${virtualColumn.size}px`,
                  transform: `translateX(${virtualColumn.start}px)`,
                }}
                onClick={() => canSort && onSort(columnName)}
              >
                <span className="flex-1 truncate" title={columnName}>
                  {columnName}
                </span>
                {canSort && (
                  <span className="ml-2 flex-shrink-0">
                    {isSorted ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="h-4 w-4 opacity-30" />
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Virtualized Rows */}
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 hover:bg-secondary/50 border-b transition-colors"
              style={{
                top: 0,
                height: `${virtualRow.size}px`,
                width: `${totalWidth}px`,
                transform: `translateY(${virtualRow.start + HEADER_HEIGHT}px)`,
              }}
            >
              {virtualColumns.map((virtualColumn) => {
                const isRowNumberColumn = virtualColumn.index === 0;

                if (isRowNumberColumn) {
                  // Row number cell
                  return (
                    <div
                      key={virtualColumn.key}
                      className="absolute top-0 px-4 py-3 border-r text-muted-foreground text-base flex items-center justify-center font-medium"
                      style={{
                        left: 0,
                        height: `${virtualRow.size}px`,
                        width: `${virtualColumn.size}px`,
                        transform: `translateX(${virtualColumn.start}px)`,
                      }}
                    >
                      {virtualRow.index + 1}
                    </div>
                  );
                }

                // Data cell
                const columnName = columns[virtualColumn.index - 1];
                const cellValue = row[columnName];

                return (
                  <div
                    key={virtualColumn.key}
                    className="absolute top-0 border-r"
                    style={{
                      left: 0,
                      height: `${virtualRow.size}px`,
                      width: `${virtualColumn.size}px`,
                      transform: `translateX(${virtualColumn.start}px)`,
                    }}
                  >
                    <Input
                      value={String(cellValue ?? '')}
                      onChange={(e) => onCellChange(virtualRow.index, columnName, e.target.value)}
                      className="h-full border-0 rounded-none focus-visible:ring-1 focus-visible:ring-ring text-base px-4"
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
