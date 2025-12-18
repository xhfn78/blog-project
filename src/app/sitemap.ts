import { MetadataRoute } from 'next'
import { TOOLS_REGISTRY } from '@/shared/config/tools-registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 정적 페이지
  const staticPages = [
    '',
    '/tools',
    '/about',
    '/contact',
    '/privacy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 도구 페이지 동적 생성
  const toolPages = TOOLS_REGISTRY.map(tool => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...toolPages]
}
