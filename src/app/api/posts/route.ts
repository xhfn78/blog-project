import { NextRequest, NextResponse } from 'next/server';
import { Post, CreatePostInput } from '@/lib/types/post';
import { postSchema, updatePostSchema } from '@/lib/validations/post';

// In-memory database (replace with real DB in production)
const posts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Your Blog',
    content: 'This is your first blog post. Start writing amazing content!',
    excerpt: 'Getting started with your new blog',
    slug: 'welcome-to-your-blog',
    published: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Building with Next.js 15',
    content: 'Next.js 15 brings amazing new features including improved performance and better developer experience.',
    excerpt: 'Exploring the latest features in Next.js 15',
    slug: 'building-with-nextjs-15',
    published: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

// GET /api/posts - Get all posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = postSchema.parse(body) as CreatePostInput;

    const newPost: Post = {
      id: String(Date.now()),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    posts.push(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// PATCH /api/posts?id=xxx - Update a post
export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);

    posts[postIndex] = {
      ...posts[postIndex],
      ...validatedData,
      updatedAt: new Date(),
    };

    return NextResponse.json(posts[postIndex]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/posts?id=xxx - Delete a post
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    posts.splice(postIndex, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
