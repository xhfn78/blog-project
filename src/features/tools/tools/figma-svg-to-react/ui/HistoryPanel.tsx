'use client';

import { HistoryItem } from "../lib/use-history";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Clock, Trash2, ChevronRight } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onRemove, onClear }: HistoryPanelProps) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography variant="h4" className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-400" />
          최근 작업 내역
        </Typography>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-slate-400 hover:text-red-500">
          모두 삭제
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-3 border rounded-lg bg-white hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div 
                className="w-10 h-10 shrink-0 bg-slate-50 rounded flex items-center justify-center border p-1"
                dangerouslySetInnerHTML={{ __html: item.svg }}
                style={{ width: 40, height: 40 }}
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-slate-400">
                  {new Date(item.timestamp).toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-300 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
