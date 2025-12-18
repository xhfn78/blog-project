import { NextRequest, NextResponse } from 'next/server';
import { InMemoryContentRepository } from '@/entities/content/repository/content.repository.impl';
import { BaseContent, ContentType, Tool } from '@/entities/content/model/types';
import { createToolSchema } from '@/entities/content/model/schemas';
import { ZodError } from 'zod';
import { TOOLS_REGISTRY } from '@/shared/config/tools-registry';

const toolContents: Tool[] = TOOLS_REGISTRY.map(reg => ({
  id: reg.slug,
  type: 'tool',
  title: reg.name,
  slug: reg.slug,
  description: reg.description,
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true,
  category: reg.category,
  component: reg.slug, // Storing component slug/name
  tags: reg.tags,
  author: reg.author,
  featured: false,
  usageCount: 0,
}));

// Initialise with only toolContents, so it will only manage tools
const contentRepository = new InMemoryContentRepository<Tool>(toolContents);

// GET /api/content?type=tool&id=xxx - Get all content or specific content by ID
export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') as ContentType | null; // type can only be 'tool' now
    const slug = request.nextUrl.searchParams.get('slug');

    if (slug) {
        const content = await contentRepository.findBySlug(slug);
        if (!content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }
        // Only allow 'tool' type
        if (content.type !== 'tool') {
             return NextResponse.json({ error: 'Only tool content is available' }, { status: 400 });
        }
        if (type && content.type !== type) {
            return NextResponse.json({ error: `Content type mismatch: Expected ${type}, got ${content.type}` }, { status: 400 });
        }
        return NextResponse.json(content);
    }

    // findAll now only returns tools
    const contents = await contentRepository.findAll({ type: 'tool', published: true }) as Tool[];
    return NextResponse.json(contents);
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

// POST /api/content - Create new content (only tool now)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contentType = body.type as ContentType; // Only 'tool' is valid now

    let validatedData;
    if (contentType === 'tool') {
      validatedData = createToolSchema.parse(body);
    } else {
      return NextResponse.json({ error: 'Invalid content type or type must be "tool"' }, { status: 400 });
    }

    const newContent = await contentRepository.create({
      ...validatedData,
      type: contentType,
      published: validatedData.published || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }) as Tool;

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// PATCH /api/content?id=xxx - Update content (only tool now)
export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const contentType = body.type as ContentType; // Only 'tool' is valid now

    let validatedData;
    if (contentType === 'tool') {
        validatedData = createToolSchema.partial().parse(body);
    } else {
        return NextResponse.json({ error: 'Invalid content type or type must be "tool"' }, { status: 400 });
    }


    const updatedContent = await contentRepository.update(id, {
      ...validatedData,
      updatedAt: new Date(),
    }) as Tool;

    return NextResponse.json(updatedContent);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/content?id=xxx - Delete content (only tool now)
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    await contentRepository.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Content not found') {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}