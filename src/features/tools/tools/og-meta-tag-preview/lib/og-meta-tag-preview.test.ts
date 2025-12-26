import { describe, it, expect } from 'vitest';
import { generateHtmlTags, generateNextJsMetadata } from '../lib/meta-generator';
import { MetaTagsData } from '../model/types';

describe('OG 메타 태그 생성 로직 테스트', () => {
  const mockData: MetaTagsData = {
    title: '테스트 페이지',
    description: '테스트용 설명 문구입니다.',
    url: 'https://codepis.com/test',
    image: 'https://codepis.com/test-og.png',
    siteName: '코드피스',
    type: 'website',
    twitterHandle: '@test_user',
  };

  it('올바른 HTML 메타 태그를 생성해야 한다', () => {
    const html = generateHtmlTags(mockData);
    
    expect(html).toContain('<title>테스트 페이지</title>');
    expect(html).toContain('content="테스트용 설명 문구입니다."');
    expect(html).toContain('property="og:url" content="https://codepis.com/test"');
    expect(html).toContain('property="og:image" content="https://codepis.com/test-og.png"');
    expect(html).toContain('property="twitter:creator" content="@test_user"');
  });

  it('Next.js 전용 Metadata 객체를 올바른 구조로 생성해야 한다', () => {
    const nextJs = generateNextJsMetadata(mockData);
    
    expect(nextJs).toContain('export const metadata = {');
    expect(nextJs).toContain('"title": "테스트 페이지"');
    expect(nextJs).toContain('"images": [');
    expect(nextJs).toContain('"url": "https://codepis.com/test-og.png"');
    expect(nextJs).toContain('"creator": "@test_user"');
  });

  it('Twitter 핸들이 없을 경우 twitter:creator 태그를 생략해야 한다', () => {
    const noTwitterData = { ...mockData, twitterHandle: '' };
    const html = generateHtmlTags(noTwitterData);
    expect(html).not.toContain('twitter:creator');
    
    const nextJs = generateNextJsMetadata(noTwitterData);
    expect(nextJs).toContain('"creator": undefined');
  });
});
