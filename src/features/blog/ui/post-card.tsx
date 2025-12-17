'use client';

import Link from 'next/link';
import { Post } from '@/entities/content/model/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          {post.published ? (
            <Badge variant="default">Published</Badge>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt || post.content}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </Button>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
