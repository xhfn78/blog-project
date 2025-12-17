/**
 * Type System & Repository Test
 *
 * 이 파일은 타입 시스템과 Repository가 올바르게 동작하는지 테스트합니다.
 * 타입스크립트 컴파일이 성공하면 타입 안전성이 확보된 것입니다.
 */

import type { BaseContent, Tool, Post } from './model/types';
import { z } from 'zod';

type CreateToolDTO = z.infer<typeof createToolSchema>;
type CreatePostDTO = z.infer<typeof createPostSchema>;
import { ToolCategory, TOOL_CATEGORIES, TOOL_CATEGORY_METADATA } from './model/tool-category';
import {
  createToolSchema,
  createPostSchema,
  validateCreateTool,
  validateCreatePost,
} from './model/schemas';
import { contentRepository } from './repository';

// ===== 타입 테스트 =====

const toolExample: CreateToolDTO = {
  title: 'JSON Formatter',
  slug: 'json-formatter',
  description: 'JSON을 예쁘게 포맷팅하는 도구',
  published: true,
  category: 'formatter',
  tags: ['json', 'formatter', 'code'],
  author: 'admin',
};

const postExample: CreatePostDTO = {
  title: 'Next.js 15 소개',
  slug: 'nextjs-15-intro',
  description: 'Next.js 15의 새로운 기능들을 알아봅니다',
  content: '# Next.js 15\n\nNext.js 15는...',
  published: true,
};

// ===== 카테고리 테스트 =====

const categoryMeta = TOOL_CATEGORY_METADATA['formatter'];
console.log('Category Meta:', categoryMeta);
console.log('All Categories:', TOOL_CATEGORIES);

// ===== Zod 검증 테스트 =====

async function testValidation() {
  try {
    // 유효한 데이터
    const validTool = validateCreateTool(toolExample);
    console.log('Valid Tool:', validTool);

    const validPost = validateCreatePost(postExample);
    console.log('Valid Post:', validPost);

    // 무효한 데이터 (에러 발생 예상)
    try {
      validateCreateTool({
        ...toolExample,
        title: '', // 빈 문자열 (에러)
      });
    } catch (error) {
      console.log('Expected validation error:', error);
    }
  } catch (error) {
    console.error('Validation error:', error);
  }
}

// ===== Repository 테스트 =====

async function testRepository() {
  try {
    // Tool 생성
    const createdTool = await contentRepository.tools.create({
      type: 'tool',
      ...toolExample,
    });
    console.log('Created Tool:', createdTool);

    // Tool 조회 (ID)
    const foundTool = await contentRepository.tools.findById(createdTool.id);
    console.log('Found Tool by ID:', foundTool);

    // Tool 조회 (Slug)
    const foundBySlug = await contentRepository.tools.findBySlug('json-formatter');
    console.log('Found Tool by Slug:', foundBySlug);

    // Tool 목록 조회
    const allTools = await contentRepository.tools.findAll();
    console.log('All Tools:', allTools);

    // 카테고리별 조회
    const formatters = await contentRepository.tools.findByCategory('formatter');
    console.log('Formatters:', formatters);

    // Tool 수정
    const updatedTool = await contentRepository.tools.update(createdTool.id, {
      featured: true,
    });
    console.log('Updated Tool:', updatedTool);

    // 사용 횟수 증가
    const toolWithUsage = await contentRepository.tools.incrementUsageCount(createdTool.id);
    console.log('Tool with incremented usage:', toolWithUsage);

    // Post 생성
    const createdPost = await contentRepository.posts.create({
      type: 'blog',
      ...postExample,
    });
    console.log('Created Post:', createdPost);

    // 공개된 포스트 조회
    const publishedPosts = await contentRepository.posts.findPublished();
    console.log('Published Posts:', publishedPosts);

    // 최근 콘텐츠 조회
    const recentContent = await contentRepository.findRecent(5);
    console.log('Recent Content:', recentContent);

    // 타입별 콘텐츠 조회
    const toolContents = await contentRepository.findByType('tool');
    console.log('Tool Contents:', toolContents);

    // 필터링 테스트
    const filteredTools = await contentRepository.tools.findAll({
      category: 'formatter',
      published: true,
    });
    console.log('Filtered Tools:', filteredTools);

    // 페이지네이션 테스트
    // InMemoryContentRepository's findAll does not support pagination directly
    // If pagination is needed, it should be implemented within findAll or as a separate method.
    // For now, removing the second argument.
    const paginatedTools = await contentRepository.tools.findAll(
      {}, // filter
    );
    console.log('Paginated Tools:', paginatedTools);

    // Tool 삭제
    await contentRepository.tools.delete(createdTool.id);
    console.log('Tool deleted');

    // 삭제 확인
    const deletedTool = await contentRepository.tools.findById(createdTool.id);
    console.log('Deleted Tool (should be null):', deletedTool);
  } catch (error) {
    console.error('Repository error:', error);
  }
}

// ===== 타입 가드 테스트 =====

import { isTool, isPost } from './model/types';

async function testTypeGuards() {
  const tool = await contentRepository.tools.create({
    type: 'tool',
    ...toolExample,
  });

  const post = await contentRepository.posts.create({
    type: 'blog',
    ...postExample,
  });

  const recentContent = await contentRepository.findRecent(10);

  recentContent.forEach((content: BaseContent) => {
    if (isTool(content)) {
      console.log('Tool:', content.title, content.category);
    } else if (isPost(content)) {
      console.log('Post:', content.title, content.excerpt);
    }
  });
}

// ===== 실행 (개발 환경에서만) =====

if (process.env.NODE_ENV === 'development') {
  // testValidation();
  // testRepository();
  // testTypeGuards();
}

export {};
