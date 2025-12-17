import { create } from 'zustand';
import { Post, CreatePostInput, UpdatePostInput } from '@/lib/types/post';

interface PostStore {
  posts: Post[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPosts: () => Promise<void>;
  getPost: (id: string) => Post | undefined;
  getPostBySlug: (slug: string) => Post | undefined;
  createPost: (input: CreatePostInput) => Promise<void>;
  updatePost: (id: string, input: UpdatePostInput) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      set({ posts: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getPost: (id: string) => {
    return get().posts.find(post => post.id === id);
  },

  getPostBySlug: (slug: string) => {
    return get().posts.find(post => post.slug === slug);
  },

  createPost: async (input: CreatePostInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      set(state => ({
        posts: [...state.posts, newPost],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updatePost: async (id: string, input: UpdatePostInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error('Failed to update post');
      const updatedPost = await response.json();
      set(state => ({
        posts: state.posts.map(post => post.id === id ? updatedPost : post),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deletePost: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
