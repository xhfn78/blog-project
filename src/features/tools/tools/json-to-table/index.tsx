'use client';

import { useState, useCallback, ChangeEvent } from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Upload, Download, Table2, Trash2, Settings2 } from 'lucide-react';
import { useJsonWorker } from './lib/use-json-worker';
import { FlatRow, FlattenConfig } from './lib/types';
import { DEFAULT_MASK_CONFIG } from './lib/mask';

export default function JsonToTableConverter() {
  const [jsonInput, setJsonInput] = useState('');
  const [rows, setRows] = useState<FlatRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuration state
  const [maskingEnabled, setMaskingEnabled] = useState(true);
  const [delimiter, setDelimiter] = useState('_');
  const [showSettings, setShowSettings] = useState(false);

  const { flattenJson, unflattenJson } = useJsonWorker();

  // Handle file upload
  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
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
      const parsed = JSON.parse(jsonInput);

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

  // Update cell value
  const handleCellChange = useCallback(
    (rowIndex: number, columnName: string, value: string) => {
      const newRows = [...rows];
      newRows[rowIndex] = {
        ...newRows[rowIndex],
        [columnName]: value,
      };
      setRows(newRows);
    },
    [rows]
  );

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
      a.download = 'converted.json';
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

  // Export as CSV
  const handleExportCsv = useCallback(() => {
    if (rows.length === 0) return;

    // Create CSV content
    const csvRows = [];

    // Header row
    csvRows.push(columns.join(','));

    // Data rows
    rows.forEach((row) => {
      const values = columns.map((col) => {
        const value = row[col];
        if (value === null || value === undefined) return '';

        // Escape values containing commas or quotes
        const strValue = String(value);
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
    a.download = 'converted.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [rows, columns]);

  // Clear all data
  const handleClear = useCallback(() => {
    setJsonInput('');
    setRows([]);
    setColumns([]);
    setError('');
  }, []);

  return (
    <ToolLayout config={config}>
      {/* Input Section */}
      <ToolSection title="JSON 입력">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="json-file" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
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
            </div>
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
              {isLoading ? '변환 중...' : '테이블로 변환'}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={isLoading}>
              <Trash2 className="h-4 w-4 mr-2" />
              초기화
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>
          )}
        </div>
      </ToolSection>

      {/* Table Section */}
      {rows.length > 0 && (
        <ToolSection title="편집 가능한 테이블">
          <div className="space-y-4">
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

            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium border-r w-12">#</th>
                    {columns.map((col) => (
                      <th key={col} className="px-3 py-2 text-left font-medium border-r">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t hover:bg-secondary/50">
                      <td className="px-3 py-2 border-r text-muted-foreground">{rowIndex + 1}</td>
                      {columns.map((col) => (
                        <td key={col} className="px-0 py-0 border-r">
                          <Input
                            value={String(row[col] ?? '')}
                            onChange={(e) => handleCellChange(rowIndex, col, e.target.value)}
                            className="border-0 rounded-none focus-visible:ring-1 focus-visible:ring-ring"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              총 행: <span className="font-medium">{rows.length}</span> | 열:{' '}
              <span className="font-medium">{columns.length}</span>
            </p>
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
            <strong className="text-foreground">4. 데이터 편집:</strong> 테이블의 모든 셀을 직접 수정할 수 있습니다.
            변경 사항은 내보낼 때 보존됩니다.
          </p>
          <p>
            <strong className="text-foreground">5. 내보내기:</strong> 수정된 데이터를 JSON 또는 CSV 형식으로
            다운로드하세요.
          </p>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
