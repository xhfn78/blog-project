'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useBlogStore } from '@/features/blog/lib/use-blog-store';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';
import 'highlight.js/styles/github-dark.css';
import { Post } from '@/entities/content/model/types'; // Import Post type

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { posts, fetchPosts, getPostBySlug } = useBlogStore();

  const [currentPost, setCurrentPost] = useState<Post | null>(null); // New state for the post

  useEffect(() => {
    const loadPost = async () => {
      if (posts.length === 0) {
        // If local posts state is empty, fetch them from the repository
        await fetchPosts();
      }
      // Attempt to get the post by slug, either from newly fetched or existing posts
      const foundPost = await getPostBySlug(slug);
      setCurrentPost(foundPost);
    };
    loadPost();
  }, [slug, posts.length, fetchPosts, getPostBySlug]); // Dependencies for useEffect

  if (!currentPost) { // Check against currentPost
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading post...</h1> {/* Show loading state */}
        <Button onClick={() => router.push('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  const formattedDate = new Date(currentPost.createdAt).toLocaleDateString('en-US', { // Use currentPost
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => router.push('/blog')}
        className="mb-4"
      >
        ← Back to Blog
      </Button>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <time className="text-sm text-muted-foreground">{formattedDate}</time>
          {currentPost.published ? ( // Use currentPost
            <Badge variant="default">Published</Badge>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1> {/* Use currentPost */}
        {currentPost.excerpt && ( // Use currentPost
          <p className="text-xl text-muted-foreground">{currentPost.excerpt}</p>
        )}
      </header>

      <Separator className="mb-8" />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {typeof currentPost.content === 'string' ? currentPost.content : ''}
        </ReactMarkdown>
      </article>
    </article>
  );
}