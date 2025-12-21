import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Download } from 'lucide-react';
import { TemplateFile } from '../lib/templates';

interface TemplateCardProps {
  template: TemplateFile;
  icon?: React.ReactNode;
}

/**
 * 템플릿 다운로드 카드 컴포넌트
 *
 * 설정 파일 템플릿을 다운로드할 수 있는 카드를 표시합니다.
 */
export function TemplateCard({ template, icon }: TemplateCardProps) {
  const handleDownload = () => {
    try {
      // Blob 생성
      const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      // 다운로드 트리거
      const a = document.createElement('a');
      a.href = url;
      a.download = template.filename;
      document.body.appendChild(a);
      a.click();

      // 정리
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download template:', error);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <CardTitle className="text-base">{template.filename}</CardTitle>
            <CardDescription className="text-sm">{template.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={handleDownload} className="w-full" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          다운로드
        </Button>
      </CardContent>
    </Card>
  );
}
