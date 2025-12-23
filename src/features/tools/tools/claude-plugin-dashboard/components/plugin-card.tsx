import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { FolderOpen, Database, Globe, Code, GitBranch, Package, TestTube, LucideIcon } from 'lucide-react';
import { PluginInfo } from '../lib/plugin-data';

interface PluginCardProps {
  plugin: PluginInfo;
}

const iconMap: Record<string, LucideIcon> = {
  FolderOpen, Database, Globe, Code, GitBranch, Package, TestTube,
};

const categoryLabels = {
  'mcp-server': 'MCP 서버',
  'ide-extension': 'IDE 확장',
  'marketplace': '마켓플레이스',
  'custom-tool': '커스텀 도구',
};

export function PluginCard({ plugin }: PluginCardProps) {
  const Icon = iconMap[plugin.icon] || Package;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <CardTitle className="text-base">{plugin.name}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {categoryLabels[plugin.category]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {plugin.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">설치 방법</h5>
          <div className="p-2 rounded-md bg-secondary">
            <code className="text-xs">{plugin.installation}</code>
          </div>
        </div>

        {plugin.documentation && (
          <div>
            <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1">문서</h5>
            <a href={plugin.documentation} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
              {plugin.documentation}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
