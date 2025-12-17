'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod'; // Import z from zod
import { createPostSchema as postFormSchema } from '@/entities/content/model/schemas';
import { Post as PostBaseType } from '@/entities/content/model/types'; // Keep Post for defaultValues conversion
import { useBlogStore } from '@/features/blog/lib/use-blog-store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/ui/card';
import { MarkdownEditor } from './markdown-editor';

// Define the type for the form input based on the schema
type PostFormInput = z.infer<typeof postFormSchema>;

interface PostFormProps {
  defaultValues?: Partial<PostFormInput>; // Use PostFormInput for defaultValues
  postId?: string;
}

export function PostForm({ defaultValues, postId }: PostFormProps) {
  const router = useRouter();
  const { createPost, updatePost } = useBlogStore();

  const formDefaultValues: PostFormInput = {
    title: defaultValues?.title ?? '',
    content: defaultValues?.content ?? '',
    slug: defaultValues?.slug ?? '',
    published: defaultValues?.published ?? false, // Ensure published is always boolean
    description: defaultValues?.description ?? undefined, // optional, so can be undefined
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormInput>({ // Use PostFormInput here
    resolver: zodResolver(postFormSchema),
    defaultValues: formDefaultValues, // No casting needed, it's already PostFormInput
  });

  const onSubmit = async (data: PostFormInput) => { // Use PostFormInput for data type
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

          {/* Excerpt field is not part of createPostSchema, so commented out */}
          {/* <div className="space-y-2">
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
          </div> */}

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
