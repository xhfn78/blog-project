import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";

export default function ToolTemplate() {
  return (
    <ToolLayout
        config={config}
    >
        <ToolSection title="Input">
            <Textarea placeholder="Paste your input here" className="h-48" />
        </ToolSection>

        <ToolSection title="Output">
            <Textarea placeholder="Output will appear here" className="h-48" readOnly />
        </ToolSection>

        <div className="flex justify-end mt-4">
            <Button>Process</Button>
        </div>
    </ToolLayout>
  );
}