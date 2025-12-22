import { TOOLS_REGISTRY } from '@/shared/config/tools-registry';

export async function GET() {
  const baseUrl = 'https://codepis.com';
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = TOOLS_REGISTRY.map((tool) => `
    <item>
      <title><![CDATA[${tool.name}]]></title>
      <link>${baseUrl}/tools/${tool.category}/${tool.slug}</link>
      <description><![CDATA[${tool.description}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/tools/${tool.category}/${tool.slug}</guid>
      <author><![CDATA[${tool.author}]]></author>
      ${tool.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>바이브코딩 도구 모음</title>
    <link>${baseUrl}</link>
    <description>개발자의 생산성을 극대화하는 하이엔드 온라인 도구 모음</description>
    <language>ko-KR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
