export interface MetaTagsData {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  type: string;
  twitterHandle: string;
}

export interface MetaGeneratorState {
  data: MetaTagsData;
  outputFormat: 'html' | 'nextjs';
}
