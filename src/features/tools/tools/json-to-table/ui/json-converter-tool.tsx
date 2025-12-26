'use client';

import { useState, useCallback, ChangeEvent, useMemo } from 'react';
import { ToolSection } from '@/shared/ui/tool-layout';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Upload, Download, Table2, Trash2, Settings2, FileJson } from 'lucide-react';
import { useJsonWorker } from '../lib/use-json-worker';
import { FlatRow, FlattenConfig } from '../lib/types';
import { DEFAULT_MASK_CONFIG } from '../lib/mask';
import { VirtualTable, SortConfig } from './VirtualTable';
import { TableToolbar } from './TableToolbar';

// Sample JSON data for testing
const SAMPLE_JSON = {
  users: [
    {
      id: 1,
      name: '김철수',
      email: 'kim.chulsoo@example.com',
      age: 28,
      active: true,
      address: {
        city: '서울',
        district: '강남구',
        zipCode: '06234',
      },
      skills: ['JavaScript', 'React', 'Node.js'],
      preferences: {
        theme: 'dark',
        language: 'ko',
        notifications: true,
      },
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee.younghee@example.com',
      age: 32,
      active: true,
      address: {
        city: '부산',
        district: '해운대구',
        zipCode: '48094',
      },
      skills: ['Python', 'Django', 'PostgreSQL'],
      preferences: {
        theme: 'light',
        language: 'ko',
        notifications: false,
      },
    },
    {
      id: 3,
      name: '박민수',
      email: 'park.minsoo@example.com',
      age: 25,
      active: false,
      address: {
        city: '대구',
        district: '수성구',
        zipCode: '42190',
      },
      skills: ['Java', 'Spring Boot', 'MySQL'],
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: true,
      },
    },
    {
      id: 4,
      name: '최지은',
      email: 'choi.jieun@example.com',
      age: 29,
      active: true,
      address: {
        city: '인천',
        district: '남동구',
        zipCode: '21556',
      },
      skills: ['TypeScript', 'Vue.js', 'MongoDB'],
      preferences: {
        theme: 'light',
        language: 'ko',
        notifications: true,
      },
    },
  ],
  metadata: {
    version: '1.0.0',
    created: '2025-12-22',
    totalUsers: 4,
    activeCities: ['서울', '부산', '대구', '인천'],
  },
};

export function JsonConverterTool() {
  const [jsonInput, setJsonInput] = useState('');
  const [rows, setRows] = useState<FlatRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuration state
  const [maskingEnabled, setMaskingEnabled] = useState(true);
  const [delimiter, setDelimiter] = useState('_');
  const [showSettings, setShowSettings] = useState(false);

  // Filter and sort state
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set());
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  const { flattenJson, unflattenJson, progress } = useJsonWorker();

  // Handle file upload
  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Security: Limit file size to 10MB
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError(`파일 크기가 너무 큽니다. 최대 ${MAX_FILE_SIZE / (1024 * 1024)}MB까지 허용됩니다.`);
      e.target.value = ''; // Reset file input
      return;
    }

    // Security: Validate file type
    if (!file.name.endsWith('.json')) {
      setError('JSON 파일만 업로드 가능합니다.');
      e.target.value = ''; // Reset file input
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
      setError(''); // Clear any previous errors
    };
    reader.onerror = () => {
      setError('파일을 읽는데 실패했습니다');
    };
    reader.readAsText(file);
  }, []);

  // Convert JSON to table
  const handleConvert = useCallback(async () => {
    setError('');
    setIsLoading(true);

    try {
      // Security: Limit JSON input size to prevent DoS attacks (10MB limit)
      const MAX_JSON_SIZE = 10 * 1024 * 1024; // 10MB
      const inputSize = new Blob([jsonInput]).size;

      if (inputSize > MAX_JSON_SIZE) {
        throw new Error(`JSON 크기가 너무 큽니다. 최대 ${MAX_JSON_SIZE / (1024 * 1024)}MB까지 허용됩니다.`);
      }

      const parsed = JSON.parse(jsonInput);

      // Security: Prevent prototype pollution by checking for dangerous keys
      const hasDangerousKeys = (obj: any): boolean => {
        if (typeof obj !== 'object' || obj === null) return false;

        const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
        for (const key of Object.keys(obj)) {
          if (dangerousKeys.includes(key)) return true;
          if (typeof obj[key] === 'object' && hasDangerousKeys(obj[key])) return true;
        }
        return false;
      };

      if (hasDangerousKeys(parsed)) {
        throw new Error('보안상 허용되지 않는 키가 포함되어 있습니다 (__proto__, constructor, prototype)');
      }

      const config: FlattenConfig = {
        delimiter,
        arrayIndexing: true,
        maskConfig: {
          ...DEFAULT_MASK_CONFIG,
          enabled: maskingEnabled,
        },
      };

      const result = await flattenJson(parsed, config);
      setRows(result.rows);
      setColumns(result.columns);
      // Initialize visible columns
      setVisibleColumns(new Set(result.columns));
      // Reset filters and sorting
      setGlobalFilter('');
      setColumnFilters({});
      setSortConfig(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('잘못된 JSON 형식입니다: ' + err.message);
      } else {
        setError('JSON 변환 중 오류 발생: ' + (err instanceof Error ? err.message : '알 수 없는 오류'));
      }
      setRows([]);
      setColumns([]);
    } finally {
      setIsLoading(false);
    }
  }, [jsonInput, delimiter, maskingEnabled, flattenJson]);

  // Filter and sort rows
  const filteredAndSortedRows = useMemo(() => {
    let filtered = rows;

    // Apply global filter
    if (globalFilter) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, filter]) => {
      if (filter) {
        filtered = filtered.filter((row) =>
          String(row[column] ?? '').toLowerCase().includes(filter.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortConfig.column];
        const bVal = b[sortConfig.column];

        // Handle null/undefined
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bVal == null) return sortConfig.direction === 'asc' ? -1 : 1;

        // Try numeric comparison first
        const aNum = Number(aVal);
        const bNum = Number(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // String comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [rows, globalFilter, columnFilters, sortConfig]);

  // Visible columns only
  const displayColumns = useMemo(
    () => columns.filter((col) => visibleColumns.has(col)),
    [columns, visibleColumns]
  );

  // Update cell value
  const handleCellChange = useCallback(
    (rowIndex: number, columnName: string, value: string) => {
      // Find the original row index in the unfiltered array
      const originalRow = filteredAndSortedRows[rowIndex];
      const originalIndex = rows.findIndex((r) => r === originalRow);

      if (originalIndex !== -1) {
        const newRows = [...rows];
        newRows[originalIndex] = {
          ...newRows[originalIndex],
          [columnName]: value,
        };
        setRows(newRows);
      }
    },
    [rows, filteredAndSortedRows]
  );

  // Handle sorting
  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.column !== column) {
        return { column, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { column, direction: 'desc' };
      }
      return null; // Clear sort
    });
  }, []);

  // Convert table back to JSON
  const handleExportJson = useCallback(async () => {
    setIsLoading(true);
    try {
      const config: FlattenConfig = {
        delimiter,
        arrayIndexing: true,
        maskConfig: {
          ...DEFAULT_MASK_CONFIG,
          enabled: false, // Don't mask when exporting
        },
      };

      const json = await unflattenJson(rows, config);
      const jsonString = JSON.stringify(json, null, 2);

      // Download as file
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '변환된데이터.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('JSON 내보내기 중 오류 발생: ' + (err instanceof Error ? err.message : '알 수 없는 오류'));
    } finally {
      setIsLoading(false);
    }
  }, [rows, delimiter, unflattenJson]);

  // Sanitize CSV value to prevent CSV Injection attacks
  const sanitizeCsvValue = (value: string): string => {
    // Prevent CSV Injection: escape values starting with =, +, -, @, tab, or carriage return
    // These characters can be interpreted as formulas in Excel/Google Sheets
    const dangerousChars = ['=', '+', '-', '@', '\t', '\r'];

    if (dangerousChars.some(char => value.startsWith(char))) {
      // Prepend single quote to prevent formula execution
      return `'${value}`;
    }

    return value;
  };

  // Export as CSV
  const handleExportCsv = useCallback(() => {
    if (rows.length === 0) return;

    // Create CSV content
    const csvRows = [];

    // Header row (sanitize column names too)
    csvRows.push(columns.map(col => sanitizeCsvValue(col)).join(','));

    // Data rows
    rows.forEach((row) => {
      const values = columns.map((col) => {
        const value = row[col];
        if (value === null || value === undefined) return '';

        // Convert to string and sanitize
        let strValue = String(value);
        strValue = sanitizeCsvValue(strValue);

        // Escape values containing commas or quotes
        if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
          return `"${strValue.replace(/"/g, '""')}"`;
        }
        return strValue;
      });
      csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');

    // Download as file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '변환된데이터.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [rows, columns]);

  // Load sample JSON data
  const handleLoadSample = useCallback(() => {
    const sampleJson = JSON.stringify(SAMPLE_JSON, null, 2);
    setJsonInput(sampleJson);
    setError('');
  }, []);

  // Clear all data
  const handleClear = useCallback(() => {
    setJsonInput('');
    setRows([]);
    setColumns([]);
    setError('');
  }, []);

  return (
    <>
      {/* Input Section */}
      <ToolSection title="JSON 입력">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Label htmlFor="json-file" className="cursor-pointer flex-1">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                <Upload className="h-4 w-4" />
                <span>JSON 파일 업로드</span>
              </div>
              <Input
                id="json-file"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </Label>
            <Button
              variant="secondary"
              onClick={handleLoadSample}
              className="flex-1"
            >
              <FileJson className="h-4 w-4 mr-2" />
              샘플 데이터
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              title="설정"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>

          {showSettings && (
            <div className="p-4 bg-secondary/50 rounded-md space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="masking"
                  checked={maskingEnabled}
                  onCheckedChange={(checked) => setMaskingEnabled(checked === true)}
                />
                <Label htmlFor="masking" className="cursor-pointer">
                  보안 마스킹 활성화 (이메일, 전화번호, 비밀번호 등)
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delimiter">키 구분자</Label>
                <Input
                  id="delimiter"
                  type="text"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  placeholder="_"
                  className="w-20"
                  maxLength={3}
                />
                <p className="text-xs text-muted-foreground">
                  중첩된 키를 연결하는 문자 (예: user{delimiter}name)
                </p>
              </div>
            </div>
          )}

          <Textarea
            placeholder="JSON 데이터를 여기에 붙여넣거나 파일을 업로드하세요..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="h-64 font-mono text-sm"
          />

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!jsonInput || isLoading} className="flex-1">
              <Table2 className="h-4 w-4 mr-2" />
              {isLoading ? `변환 중... ${progress}%` : '테이블로 변환'}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={isLoading}>
              <Trash2 className="h-4 w-4 mr-2" />
              초기화
            </Button>
          </div>

          {isLoading && progress > 0 && (
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>
          )}
        </div>
      </ToolSection>

      {/* Table Section */}
      {rows.length > 0 && (
        <ToolSection title="편집 가능한 테이블">
          <div className="space-y-4">
            {/* Export Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleExportJson} disabled={isLoading}>
                <Download className="h-4 w-4 mr-2" />
                JSON 다운로드
              </Button>
              <Button variant="outline" onClick={handleExportCsv} disabled={isLoading}>
                <Download className="h-4 w-4 mr-2" />
                CSV 다운로드
              </Button>
            </div>

            {/* Table Toolbar */}
            <TableToolbar
              columns={columns}
              visibleColumns={visibleColumns}
              onVisibleColumnsChange={setVisibleColumns}
              globalFilter={globalFilter}
              onGlobalFilterChange={setGlobalFilter}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
              totalRows={rows.length}
              filteredRows={filteredAndSortedRows.length}
            />

            {/* Virtual Table */}
            <VirtualTable
              rows={filteredAndSortedRows}
              columns={displayColumns}
              onCellChange={handleCellChange}
              maxHeight={800}
              sortConfig={sortConfig}
              onSort={handleSort}
              columnWidths={columnWidths}
            />
          </div>
        </ToolSection>
      )}

      {/* Help Section */}
      <ToolSection title="사용 방법">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">1. JSON 업로드 또는 붙여넣기:</strong> 파일 업로드 버튼을 사용하거나
            JSON 데이터를 텍스트 영역에 직접 붙여넣으세요.
          </p>
          <p>
            <strong className="text-foreground">2. 설정 구성:</strong> 보안 마스킹을 활성화하여 이메일, 비밀번호,
            전화번호 같은 민감한 필드를 자동으로 숨길 수 있습니다. 필요시 키 구분자를 커스터마이징하세요.
          </p>
          <p>
            <strong className="text-foreground">3. 변환:</strong> &quot;테이블로 변환&quot; 버튼을 클릭하여
            중첩된 JSON을 편집 가능한 평면 테이블 형식으로 변환하세요.
          </p>
          <p>
            <strong className="text-foreground">4. 데이터 편집:</strong> 테이블의 모든 셀을 직접 수정할 수 있습니다. 변경 사항은 내보낼 때 보존됩니다.
          </p>
          <p>
            <strong className="text-foreground">5. 내보내기:</strong> 수정된 데이터를 JSON 또는 CSV 형식으로
            다운로드하세요.
          </p>
        </div>
      </ToolSection>
    </>
  );
}
