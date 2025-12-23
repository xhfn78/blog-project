'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PHASES } from '../lib/command-registry';

interface AddCommandModalProps {
  isOpen: boolean;
  phaseId: string | null;
  onClose: () => void;
  onAdd: (phaseId: string, command: string, description: string) => void;
}

export function AddCommandModal({
  isOpen,
  phaseId,
  onClose,
  onAdd,
}: AddCommandModalProps) {
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');

  const phase = PHASES.find((p) => p.id === phaseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phaseId || !command.trim() || !description.trim()) {
      return;
    }

    onAdd(phaseId, command.trim(), description.trim());
    handleClose();
  };

  const handleClose = () => {
    setCommand('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>명령어 추가</DialogTitle>
          <DialogDescription>
            {phase ? `"${phase.name}" 단계에 새 명령어를 추가합니다.` : '새 명령어를 추가합니다.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="command">명령어</Label>
            <Input
              id="command"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="npm install package-name"
              className="font-mono"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              터미널에서 실행할 명령어를 입력하세요.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="패키지를 설치합니다."
            />
            <p className="text-xs text-muted-foreground">
              명령어에 대한 간단한 설명을 입력하세요.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" disabled={!command.trim() || !description.trim()}>
              추가
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
