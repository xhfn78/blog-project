import { CopyButton } from '@/shared/ui/copy-button';

interface CommandBlockProps {
  command: string;
}

export function CommandBlock({ command }: CommandBlockProps) {
  return (
    <div className="relative">
      <pre className="bg-secondary p-3 rounded-md overflow-x-auto pr-12">
        <code className="text-sm font-mono">{command}</code>
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton text={command} />
      </div>
    </div>
  );
}
