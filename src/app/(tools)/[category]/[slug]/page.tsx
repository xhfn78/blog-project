import { notFound } from "next/navigation";
import { Metadata } from "next";
import { InMemoryContentRepository } from "@/entities/content/repository/content.repository.impl";
import { TOOLS_REGISTRY } from "@/shared/config/tools-registry";
import { Tool } from "@/entities/content/model/types";
import { ToolLayout } from "@/shared/ui/tool-layout";
import ClientToolRenderer from './client-tool-renderer';

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
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const toolRegistration = TOOLS_REGISTRY.find((reg) => reg.slug === slug);

  if (!toolRegistration) {
    return {
      title: "도구를 찾을 수 없습니다",
    };
  }

  const title = `${toolRegistration.name}`;
  const description = toolRegistration.description;
  const baseUrl = "https://codepis.com";
  const url = `${baseUrl}/tools/${toolRegistration.category}/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | 코드피스(Codepis)`,
      description,
      url,
      siteName: "코드피스(Codepis)",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: "/og-image.png", // 각 도구별 전용 이미지가 생기면 여기를 교체 가능
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 코드피스(Codepis)`,
      description,
      images: ["/og-image.png"],
    },
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
      <ClientToolRenderer toolSlug={toolRegistration.slug} />
    </ToolLayout>
  );
}