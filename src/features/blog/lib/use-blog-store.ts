import { create } from 'zustand';
import { Post } from '@/entities/content/model/types';
import { InMemoryContentRepository } from '@/entities/content/repository/content.repository.impl';
import { ContentRepository, CreateContentDTO, UpdateContentDTO } from '@/entities/content/repository/content.repository';

interface BlogStore {
  posts: Post[];
  isLoading: boolean; // Add isLoading
  error: string | null; // Add error
  repository: ContentRepository<Post>;

  // Actions
  fetchPosts: () => Promise<void>;
  getPost: (id: string) => Post | undefined;
  getPostBySlug: (slug: string) => Promise<Post | null>;
  createPost: (input: CreateContentDTO) => Promise<void>;
  updatePost: (id: string, input: UpdateContentDTO) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

// Instantiate the InMemoryContentRepository for Posts
const postRepository = new InMemoryContentRepository() as ContentRepository<Post>;

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  isLoading: false, // Initial state for isLoading
  error: null,      // Initial state for error
  repository: postRepository,

  fetchPosts: async () => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const posts = await get().repository.findAll({ type: 'blog', published: true });
      set({ posts, isLoading: false }); // Update posts and unset loading
    } catch (error: any) { // Explicitly type error
      console.error("Failed to fetch posts:", error);
      set({ error: error.message || "Failed to fetch posts", isLoading: false }); // Set error state
    }
  },

  getPost: (id: string) => {
    return get().posts.find(post => post.id === id);
  },

  getPostBySlug: (slug: string) => {
    // This finds from the repository, not the local state
    return get().repository.findBySlug(slug);
  },

  createPost: async (input: CreateContentDTO) => {
    try {
      const newPost = await get().repository.create({ ...input, type: 'blog', published: false });
      set(state => ({
        posts: [...state.posts, newPost as Post],
      }));
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  },

  updatePost: async (id: string, input: UpdateContentDTO) => {
    try {
      const updatedPost = await get().repository.update(id, input);
      set(state => ({
        posts: state.posts.map(post => post.id === id ? updatedPost as Post : post),
      }));
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  },

  deletePost: async (id: string) => {
    try {
      await get().repository.delete(id);
      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  },
}));