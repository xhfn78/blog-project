'use client';

import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export interface TableToolbarProps {
  columns: string[];
  visibleColumns: Set<string>;
  onVisibleColumnsChange: (columns: Set<string>) => void;
  globalFilter: string;
  onGlobalFilterChange: (filter: string) => void;
  columnFilters: Record<string, string>;
  onColumnFiltersChange: (filters: Record<string, string>) => void;
  sortConfig: SortConfig | null;
  onSortChange: (config: SortConfig | null) => void;
  totalRows: number;
  filteredRows: number;
}

export function TableToolbar({
  columns,
  visibleColumns,
  onVisibleColumnsChange,
  globalFilter,
  onGlobalFilterChange,
  columnFilters,
  onColumnFiltersChange,
  sortConfig,
  onSortChange,
  totalRows,
  filteredRows,
}: TableToolbarProps) {
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const toggleColumn = (column: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(column)) {
      newVisible.delete(column);
    } else {
      newVisible.add(column);
    }
    onVisibleColumnsChange(newVisible);
  };

  const toggleAllColumns = () => {
    if (visibleColumns.size === columns.length) {
      // Hide all
      onVisibleColumnsChange(new Set());
    } else {
      // Show all
      onVisibleColumnsChange(new Set(columns));
    }
  };

  const clearColumnFilter = (column: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[column];
    onColumnFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onGlobalFilterChange('');
    onColumnFiltersChange({});
  };

  const activeFilterCount =
    (globalFilter ? 1 : 0) + Object.keys(columnFilters).length;

  return (
    <div className="space-y-3">
      {/* Top Row: Global Search and Column Visibility */}
      <div className="flex gap-2">
        {/* Global Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="전체 검색..."
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {globalFilter && (
            <button
              onClick={() => onGlobalFilterChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Column Filters Toggle */}
        <Button
          variant={showColumnFilters ? 'default' : 'outline'}
          size="default"
          onClick={() => setShowColumnFilters(!showColumnFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          칼럼 필터
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-primary-foreground text-primary rounded-full text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {/* Column Visibility */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="default">
              {visibleColumns.size === columns.length ? (
                <Eye className="h-4 w-4 mr-2" />
              ) : (
                <EyeOff className="h-4 w-4 mr-2" />
              )}
              칼럼 ({visibleColumns.size}/{columns.length})
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">칼럼 표시/숨김</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAllColumns}
                  className="h-7 text-xs"
                >
                  {visibleColumns.size === columns.length
                    ? '모두 숨기기'
                    : '모두 표시'}
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {columns.map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={`col-${column}`}
                      checked={visibleColumns.has(column)}
                      onCheckedChange={() => toggleColumn(column)}
                    />
                    <Label
                      htmlFor={`col-${column}`}
                      className="text-sm cursor-pointer flex-1 truncate"
                      title={column}
                    >
                      {column}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Column Filters */}
      {showColumnFilters && (
        <div className="p-4 bg-secondary/50 rounded-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">칼럼별 필터</h4>
            {Object.keys(columnFilters).length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                모두 지우기
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {columns.map((column) => (
              <div key={column} className="space-y-1">
                <Label htmlFor={`filter-${column}`} className="text-xs truncate block" title={column}>
                  {column}
                </Label>
                <div className="relative">
                  <Input
                    id={`filter-${column}`}
                    placeholder="필터..."
                    value={columnFilters[column] || ''}
                    onChange={(e) =>
                      onColumnFiltersChange({
                        ...columnFilters,
                        [column]: e.target.value,
                      })
                    }
                    className="text-sm pr-7"
                  />
                  {columnFilters[column] && (
                    <button
                      onClick={() => clearColumnFilter(column)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {filteredRows !== totalRows ? (
            <span>
              표시: <strong>{filteredRows}</strong> / 전체:{' '}
              <strong>{totalRows}</strong>
            </span>
          ) : (
            <span>
              총 <strong>{totalRows}</strong>개 행
            </span>
          )}
        </div>
        {sortConfig && (
          <div className="flex items-center gap-1">
            정렬: <strong>{sortConfig.column}</strong>
            {sortConfig.direction === 'asc' ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <button
              onClick={() => onSortChange(null)}
              className="ml-1 hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
