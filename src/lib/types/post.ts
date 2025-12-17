export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePostInput = Partial<CreatePostInput>;
