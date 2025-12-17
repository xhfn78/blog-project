'use client';

import { useEffect } from 'react';
import { usePostStore } from '@/lib/stores/post-store';
import { PostCard } from './post-card';

export function PostList() {
  const { posts, isLoading, error, fetchPosts, deletePost } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading posts: {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No posts yet. Create your first post!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={deletePost} />
      ))}
    </div>
  );
}
