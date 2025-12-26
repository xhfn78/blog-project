import { MetaTagsData } from "../model/types";

/**
 * 표준 HTML 메타 태그 생성
 */
export function generateHtmlTags(data: MetaTagsData): string {
  const tags = [
    `<!-- Primary Meta Tags -->`,
    `<title>${data.title}</title>`,
    `<meta name="title" content="${data.title}">`,
    `<meta name="description" content="${data.description}">`,
    ``,
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="${data.type || 'website'}">`,
    `<meta property="og:url" content="${data.url}">`,
    `<meta property="og:title" content="${data.title}">`,
    `<meta property="og:description" content="${data.description}">`,
    `<meta property="og:image" content="${data.image}">`,
    `<meta property="og:site_name" content="${data.siteName}">`,
    ``,
    `<!-- Twitter -->`,
    `<meta property="twitter:card" content="summary_large_image">`,
    `<meta property="twitter:url" content="${data.url}">`,
    `<meta property="twitter:title" content="${data.title}">`,
    `<meta property="twitter:description" content="${data.description}">`,
    `<meta property="twitter:image" content="${data.image}">`,
  ];

  if (data.twitterHandle) {
    tags.push(`<meta property="twitter:creator" content="${data.twitterHandle}">`);
  }

  return tags.join('\n');
}

/**
 * Next.js App Router용 Metadata 객체 생성
 */
export function generateNextJsMetadata(data: MetaTagsData): string {
  const metadata = {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url,
      siteName: data.siteName,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'ko_KR',
      type: data.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.image],
      creator: data.twitterHandle || undefined,
    },
  };

  return `export const metadata = ${JSON.stringify(metadata, null, 2)};`;
}
