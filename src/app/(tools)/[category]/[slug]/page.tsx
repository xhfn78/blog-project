import { notFound } from "next/navigation";
import { Metadata } from "next";
import { InMemoryContentRepository } from "@/entities/content/repository/content.repository.impl";
import { TOOLS_REGISTRY, ToolRegistration } from "@/shared/config/tools-registry";
import { Tool } from "@/entities/content/model/types";
import { ToolLayout } from "@/shared/ui/tool-layout"; // Assuming ToolLayout is a shared UI component
import ClientToolRenderer from './client-tool-renderer'; // 새 컴포넌트 임포트

interface ToolPageProps {
  params: {
    category: string;
    slug: string;
  };
}

const toolContents: Tool[] = TOOLS_REGISTRY.map(reg => ({
  id: reg.slug, // In-memory repository, so slug can serve as a unique ID
  type: 'tool',
  title: reg.name,
  slug: reg.slug,
  description: reg.description,
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true, // Assuming all registered tools are published by default
  category: reg.category,
  component: reg.slug, // Storing component slug/name, not the component itself
  tags: reg.tags,
  author: reg.author,
  featured: false, // Default value
  usageCount: 0,   // Default value
}));

const repository = new InMemoryContentRepository(toolContents);

export async function generateMetadata({

  params,

}: ToolPageProps): Promise<Metadata> {

  const resolvedParams = await params; // params가 Promise일 경우 await를 사용

  const { slug } = resolvedParams; // 변경 후



  const tool = (await repository.findBySlug(slug)) as Tool;



  if (!tool) {

    return {};

  }



  return {

    title: tool.title,

    description: tool.description,

  };

}



export default async function ToolPage({ params }: ToolPageProps) {

  const resolvedParams = await params; // params가 Promise일 경우 await를 사용

  const { category, slug } = resolvedParams; // 변경 후


  const tool = (await repository.findBySlug(slug)) as Tool;

  if (!tool || tool.type !== "tool" || tool.category !== category) {
    notFound();
  }

  const toolRegistration = TOOLS_REGISTRY.find(
    (reg) => reg.slug === slug && reg.category === category
  );

  if (!toolRegistration) {
    notFound();
  }

  // const DynamicToolComponent = toolRegistration.component; // 이 라인 주석 처리 또는 삭제

  return (
    <ToolLayout config={toolRegistration}>
      <ClientToolRenderer ToolComponent={toolRegistration.component} />
    </ToolLayout>
  );
}