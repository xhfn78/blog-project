'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { postFormSchema, PostFormData } from '@/lib/validations/post';
import { usePostStore } from '@/lib/stores/post-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { MarkdownEditor } from './markdown-editor';

interface PostFormProps {
  defaultValues?: Partial<PostFormData>;
  postId?: string;
}

export function PostForm({ defaultValues, postId }: PostFormProps) {
  const router = useRouter();
  const { createPost, updatePost } = usePostStore();

  const formDefaultValues: Partial<PostFormData> = defaultValues || {
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    published: false,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      if (postId) {
        await updatePost(postId, data);
      } else {
        await createPost(data);
      }
      router.push('/blog');
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{postId ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register('slug')}
              placeholder="post-slug-example"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register('excerpt')}
              placeholder="Brief description of the post"
              rows={2}
            />
            {errors.excerpt && (
              <p className="text-sm text-red-500">{errors.excerpt.message}</p>
            )}
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <MarkdownEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.content?.message}
              />
            )}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              {...register('published')}
              className="h-4 w-4"
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/blog')}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
