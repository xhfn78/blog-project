"use client";

import { HistoryItem } from "../lib/use-history";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Clock, Trash2, ChevronRight } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (input: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function HistoryPanel({ history, onSelect, onRemove, onClear }: HistoryPanelProps) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          <Typography variant="h4" className="text-lg font-bold">최근 변환 히스토리</Typography>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground hover:text-red-400">
          <Trash2 className="w-4 h-4 mr-2" />
          전체 삭제
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => (
          <Card
            key={item.id}
            className="p-4 bg-slate-900/40 border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
            onClick={() => onSelect(item.input)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] text-muted-foreground font-mono">
                {new Date(item.timestamp).toLocaleString("ko-KR", { 
                  month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" 
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1">
              <Typography variant="small" className="line-clamp-1 text-slate-400 font-mono text-[11px]">
                {item.input.split("\n")[0]}...
              </Typography>
              <div className="flex items-center gap-2 text-indigo-400">
                <Typography variant="small" className="font-bold line-clamp-1 flex-1">
                  {item.output}
                </Typography>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
