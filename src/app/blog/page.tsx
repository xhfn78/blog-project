import Link from 'next/link';
import { PostList } from '@/components/blog/post-list';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Button asChild>
          <Link href="/blog/write">Write New Post</Link>
        </Button>
      </div>
      <PostList />
    </div>
  );
}
