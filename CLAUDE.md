# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vlog** is a modern blogging platform with integrated developer tools, built with Next.js 16, TypeScript, and Tailwind CSS. The platform combines a markdown-based blog with mini developer utilities (code snapshots, SQL-to-ERD converter, etc.).

## Key Commands

### Development
```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Tool Creation
```bash
npm run create-tool <slug>    # Scaffold a new developer tool
                              # Creates feature branch: feature/tool-<slug>
                              # Updates tools-registry.ts automatically
```

### Testing
```bash
# Vitest is configured but test projects are empty
# Browser testing available via @vitest/browser-playwright
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
├── entities/                 # Business entities (Content, Tool, Post)
│   └── content/
│       ├── model/           # Types, schemas, interfaces
│       ├── repository/      # Data access layer
│       └── index.ts         # Public API
├── features/                 # Feature modules
│   ├── blog/               # Blog feature
│   │   └── lib/use-blog-store.ts
│   └── tools/              # Developer tools feature
│       ├── tools/          # Individual tool implementations
│       │   ├── _template/  # Template for new tools
│       │   ├── code-snapshot/
│       │   └── sql-to-erd/
│       └── lib/use-tool-store.ts
└── shared/                  # Shared resources
    ├── ui/                  # ShadCN UI components
    ├── lib/                 # Utilities & hooks
    └── config/              # Configuration files
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

- **`useBlogStore`**: Blog post CRUD + local cache (`src/features/blog/lib/use-blog-store.ts`)
- **`useToolStore`**: Tool management (if exists)

Pattern: Store methods call repository, then update local state. This keeps features decoupled from data layer implementation.

### Developer Tools System

Tools are dynamically registered and lazy-loaded:

1. **Tool Structure**: Each tool lives in `src/features/tools/tools/<slug>/`
   - `tool.config.ts`: Metadata (name, description, category, tags)
   - `index.tsx`: React component
   - `lib/`: Tool-specific utilities

2. **Tool Registry**: `src/shared/config/tools-registry.ts`
   - Maps tool config + lazy-loaded component
   - Automatically updated by `create-tool` script
   - Categories: 'converter', 'generator', 'formatter', 'utility'

3. **Creation Workflow**:
   ```bash
   npm run create-tool my-tool-name
   # → Copies _template
   # → Updates tool.config.ts with slug/name
   # → Adds to tools-registry.ts
   # → Creates git branch: feature/tool-my-tool-name
   ```

### Routing Architecture

- **`/`**: Home with navigation to Tools/Blog
- **`/tools`**: Tool listing page
- **`/tools/[category]/[slug]`**: Individual tool pages (dynamic routing)
- **`/blog`**: Blog post listing
- **`/blog/[slug]`**: Blog post detail
- **`/blog/write`**: Markdown editor for creating posts

Route groups: `(tools)` group for shared tool layouts without affecting URL structure.

## TypeScript Configuration

- **Path alias**: `@/*` → `./src/*`
- **Target**: ES2017 (for modern async/await)
- **JSX**: react-jsx (React 19 automatic runtime)
- Strict mode enabled

## Important Patterns

### Adding a New Tool

1. Run `npm run create-tool <slug>` (script handles boilerplate)
2. Edit `src/features/tools/tools/<slug>/tool.config.ts`:
   - Set unique slug
   - Choose category: 'converter' | 'generator' | 'formatter' | 'utility'
   - Add descriptive tags
3. Implement component in `src/features/tools/tools/<slug>/index.tsx`
4. Tool automatically appears in registry and routing

### Working with Content

When adding features that work with posts/tools:

1. Import repository interfaces from `@/entities/content/repository`
2. Use Zustand stores (`useBlogStore`, etc.) in components
3. Repository methods return Promises - handle async properly
4. Filter by `type`, `category`, or `published` status

### Markdown Rendering

Blog uses react-markdown with plugins:
- `remark-gfm`: GitHub Flavored Markdown (tables, task lists)
- `rehype-highlight`: Code syntax highlighting
- `rehype-raw`: HTML passthrough for embeds

## Known Limitations

- **In-memory storage**: Data resets on server restart (no database yet)
- **No authentication**: User system not implemented
- **No image uploads**: Markdown images use external URLs only
- **Vitest empty**: Test infrastructure exists but no tests written

## Tech Stack Summary

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + ShadCN/ui components
- **State**: Zustand (client state), React Hook Form (forms)
- **Validation**: Zod schemas
- **Markdown**: react-markdown + remark/rehype plugins
- **Icons**: Lucide React
- **Flow Diagrams**: @xyflow/react + dagre (for ERD tool)
- **Testing**: Vitest + Playwright (configured but unused)

## Development Notes

- **Branch Strategy**: Feature branches (`feature/tool-*`, `feature/blog-*`) → `main`
- **Claude Code Skills**: Uses `workthrough-v2`, `web-to-markdown`, `nextjs15-init` plugins
- **Documentation**: VitePress in `workthrough/` directory tracks development progress
- **Commit Convention**: Follows conventional commits (feat:, fix:, docs:)
