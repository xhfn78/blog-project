# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vlog** is a modern blogging platform with integrated developer tools, built with Next.js 16, TypeScript, and Tailwind CSS. The platform combines a markdown-based blog with mini developer utilities.

## Key Commands

### Development
```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
```

### Tool Creation
```bash
npm run create-tool <slug>    # Scaffold a new developer tool
                              # Creates feature branch: feature/tool-<slug>
                              # Updates tools-registry.ts automatically
```

### Documentation
```bash
cd workthrough
npm install
npm run dev          # VitePress docs server (localhost:5173)
npm run build        # Build documentation
```

## Architecture

### Feature-Sliced Design (FSD)
The codebase follows Feature-Sliced Design principles with clear layer separation:

```
src/
├── app/                      # Next.js App Router (routes & layouts)
│   ├── (tools)/             # Route group for tools
│   │   ├── [category]/
│   │   │   └── [slug]/     # Dynamic tool pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── tools/              # Tools listing page
│   ├── api/                # API routes
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy page
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Sitemap generation
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── entities/               # Business entities (Content, Tool, Post)
│   └── content/
│       ├── model/         # Types, schemas, interfaces
│       ├── repository/    # Data access layer
│       └── index.ts       # Public API
├── features/              # Feature modules
│   ├── blog/             # Blog feature (if exists)
│   └── tools/            # Developer tools feature
│       ├── tools/        # Individual tool implementations
│       │   ├── _template/          # Template for new tools
│       │   ├── code-snapshot/      # Code to image generator
│       │   ├── json-to-table/      # JSON to table converter
│       │   ├── markdown-editor/    # Markdown editor
│       │   ├── tailwind-class-visualizer/
│       │   └── vibe-token-slimmer/ # AI token optimizer
│       └── lib/          # Tool-specific utilities
├── lib/                  # Global utilities & hooks
└── shared/               # Shared resources
    ├── ui/              # ShadCN UI components
    ├── lib/             # Utilities & hooks
    └── config/          # Configuration files
        └── tools-registry.ts
```

### Content Model (Repository Pattern)

All content types (Blog Posts, Tools, Snippets) share a common `BaseContent` interface with specialized extensions:

- **`BaseContent`**: Core fields (id, type, title, slug, description, dates, published)
- **`Post`**: Extends BaseContent with content/excerpt
- **`Tool`**: Extends BaseContent with category/tags/component

The **Repository Pattern** provides a unified data access layer:

- `ContentRepository<T>`: Generic CRUD operations
- `InMemoryContentRepository`: Current implementation (data resets on server restart)
- Future: Swap to database repository without changing feature code

**Key Files:**
- `src/entities/content/model/types.ts`: Type definitions
- `src/entities/content/repository/content.repository.ts`: Repository interfaces
- `src/entities/content/repository/content.repository.impl.ts`: In-memory implementation

### State Management (Zustand)

Feature-specific Zustand stores wrap repository access:

- **`useBlogStore`**: Blog post CRUD + local cache (if exists in `src/features/blog/lib/use-blog-store.ts`)
- **`useToolStore`**: Tool management (if exists in `src/features/tools/lib/use-tool-store.ts`)

Pattern: Store methods call repository, then update local state. This keeps features decoupled from data layer implementation.

### Developer Tools System

Tools are dynamically registered and lazy-loaded:

1. **Tool Structure**: Each tool lives in `src/features/tools/tools/<slug>/`
   - `tool.config.ts`: Metadata (slug, name, description, category, tags, author)
   - `index.tsx`: React component
   - `lib/`: Tool-specific utilities (optional)
   - `README.md`: Tool documentation (optional)

2. **Tool Registry**: `src/shared/config/tools-registry.ts`
   - Imports all tool configs
   - Maps tool config to registration
   - Automatically updated by `create-tool` script
   - Categories: 'converter', 'generator', 'formatter', 'utility'

3. **Creation Workflow**:
   ```bash
   npm run create-tool my-tool-name
   # → Copies _template to src/features/tools/tools/my-tool-name
   # → Updates tool.config.ts with slug/name
   # → Adds import and entry to tools-registry.ts
   # → Creates git branch: feature/tool-my-tool-name
   ```

4. **Existing Tools**:
   - **code-snapshot** (generator): Code to social media image converter
   - **json-to-table** (converter): JSON to editable table with security masking
   - **markdown-editor** (formatter): Markdown editor with live preview
   - **tailwind-class-visualizer** (utility): Visualize Tailwind CSS classes
   - **vibe-token-slimmer** (utility): AI token optimizer (30-50% reduction)

### Routing Architecture

- **`/`**: Home page with navigation
- **`/(tools)`**: Route group for tools (URL: `/`)
  - **`/(tools)/[category]/[slug]`**: Individual tool pages (dynamic routing)
- **`/tools`**: Tool listing page (separate from route group)
- **`/about`**: About page
- **`/contact`**: Contact page
- **`/privacy`**: Privacy policy page

Route groups like `(tools)` allow shared layouts without affecting URL structure. The actual route pattern is `/<category>/<slug>` for tools.

## TypeScript Configuration

- **Path alias**: `@/*` → `./src/*`
- **Target**: ES2018 (for modern async/await)
- **JSX**: react-jsx (React 19 automatic runtime)
- Strict mode enabled
- Vitest config uses same alias mapping

## Important Patterns

### Adding a New Tool

1. Run `npm run create-tool <slug>` (script handles boilerplate)
2. Edit `src/features/tools/tools/<slug>/tool.config.ts`:
   - Ensure slug is unique and URL-friendly (kebab-case)
   - Choose category: 'converter' | 'generator' | 'formatter' | 'utility'
   - Add descriptive tags (used for search/filtering)
   - Set author name
3. Implement component in `src/features/tools/tools/<slug>/index.tsx`
4. Tool automatically appears in registry and routing
5. Access tool at `/<category>/<slug>` (e.g., `/utility/vibe-token-slimmer`)

### Working with Content

When adding features that work with posts/tools:

1. Import repository interfaces from `@/entities/content/repository`
2. Use Zustand stores (if available) in components
3. Repository methods return Promises - handle async properly
4. Filter by `type`, `category`, or `published` status
5. Content types: 'post', 'tool', 'snippet'

### Markdown Rendering

Blog uses react-markdown with plugins:
- `remark-gfm`: GitHub Flavored Markdown (tables, task lists)
- `rehype-highlight`: Code syntax highlighting
- `rehype-raw`: HTML passthrough for embeds

### Testing

Vitest is configured with:
- jsdom environment for React component testing
- `@vitest/browser-playwright` for browser testing
- Path alias `@/*` mapped to `./src/`
- Setup file: `vitest.setup.ts`
- Inline deps for `@/shared/` and markdown editor components

Run tests with `npm run test`.

## Known Limitations

- **In-memory storage**: Data resets on server restart (no database yet)
- **No authentication**: User system not implemented
- **No image uploads**: Markdown images use external URLs only
- **Test coverage**: Infrastructure exists but test suite is minimal

## Tech Stack Summary

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + ShadCN/ui components
- **State**: Zustand (client state), React Hook Form (forms)
- **Validation**: Zod v4 schemas
- **Markdown**: react-markdown + remark/rehype plugins
- **Icons**: Lucide React
- **Testing**: Vitest + Playwright
- **Code Highlighting**: highlight.js
- **Image Capture**: html2canvas (for code snapshot tool)
- **Token Counting**: gpt-tokenizer (for token slimmer tool)

## Development Notes

- **Branch Strategy**: Feature branches (`feature/tool-*`, `feature/*`) → `main`
- **Commit Convention**: Follows conventional commits (feat:, fix:, docs:, chore:)
- **React Version**: 19.2.1 (ensure compatibility with all dependencies)
- **Next.js Version**: 16.0.10 (latest stable)
- **Documentation**: VitePress in `workthrough/` directory tracks development progress
- **Deployment**: Configured for Vercel (see `.doc/` for deployment docs if exists)
