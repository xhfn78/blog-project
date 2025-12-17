import { PostForm } from '@/features/blog/ui/post-form';

export default function WritePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Write New Post</h1>
      <PostForm />
    </div>
  );
}
