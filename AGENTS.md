# AGENTS.md

This document provides comprehensive context about the codebase for AI agents working with this repository.

## Overview

This is a personal machine learning notes website built with **Quartz v4**, a static site generator for digital gardens. The site contains research paper summaries, ML concept explanations, and blog posts stored as Markdown files. The site is deployed to GitHub Pages.

**Key Technologies:**
- Quartz v4 (static site generator)
- TypeScript/Node.js
- Markdown with YAML frontmatter
- Obsidian-style wikilinks support
- Preact for UI components

## Architecture

### Core Build Pipeline

The build process follows a three-stage pipeline:

1. **Parse** (`quartz/processors/parse.ts`)
   - Reads Markdown files from `content/` directory
   - Transforms Markdown → Markdown AST → HTML AST
   - Uses worker pools for parallel processing (configurable concurrency)
   - Applies text transforms, markdown plugins, and HTML plugins

2. **Filter** (`quartz/processors/filter.ts`)
   - Filters content based on publish status and other criteria
   - Uses filter plugins to determine which files should be published
   - Currently uses `ExplicitPublish` filter (checks `publish: "true"` in frontmatter)

3. **Emit** (`quartz/processors/emit.ts`)
   - Generates static HTML files and assets
   - Uses emitter plugins to create different output types
   - Emits content pages, folder pages, tag pages, RSS feeds, sitemaps, etc.

### Plugin System

The codebase uses a plugin-based architecture with three plugin types:

**Transformers** (`quartz/plugins/transformers/`)
- Process content during parsing
- Three phases: `textTransform`, `markdownPlugins`, `htmlPlugins`
- Examples: FrontMatter, TableOfContents, Latex, SyntaxHighlighting, ObsidianFlavoredMarkdown

**Filters** (`quartz/plugins/filters/`)
- Determine which content should be published
- Applied after parsing, before emitting
- Example: ExplicitPublish (filters by `publish: "true"` frontmatter)

**Emitters** (`quartz/plugins/emitters/`)
- Generate output files
- Examples: ContentPage, FolderPage, TagPage, ContentIndex (RSS/sitemap), Assets, Static

### Worker Pool Architecture

For parallel processing, the build system uses worker pools:

- **Main Process**: `quartz/build.ts` - Orchestrates the build
- **Worker Script**: `quartz/worker.ts` - Contains `parseFiles` function
- **Worker Bootstrap**: `quartz/bootstrap-worker.mjs` - Entry point for worker threads
- **Pool Management**: Uses `workerpool` library with configurable concurrency (1-4 workers)
- **Chunking**: Files are processed in chunks of 128 for optimal JIT performance

### File Structure

```
/
├── content/              # All site content (Markdown files)
│   ├── Papers/          # Research paper summaries
│   ├── Concepts/        # ML concept explanations
│   ├── Posts/           # Blog posts
│   ├── tags/            # Tag definition pages
│   └── Templates/       # Template files for new content
├── quartz/              # Quartz framework code
│   ├── build.ts         # Main build orchestration
│   ├── worker.ts        # Worker thread parsing logic
│   ├── processors/      # Parse, filter, emit processors
│   ├── plugins/         # Plugin implementations
│   ├── components/      # React/Preact UI components
│   ├── cli/             # CLI handlers and commands
│   └── util/            # Utility functions
├── public/              # Build output directory
├── quartz.config.ts     # Main configuration
├── quartz.layout.ts     # Layout component configuration
└── package.json         # Dependencies and scripts
```

## Content Format

### Markdown Files

All content is stored as Markdown files with YAML frontmatter:

```yaml
---
date: YYYY-MM-DD
tags: ["tag1", "tag2"]
publish: "true"  # Must be string, not boolean
aliases: ["Alternative names"]
Year: YYYY
updated: YYYY-MM-DD  # Optional
---
```

**Important Notes:**
- `publish` must be the string `"true"`, not a boolean
- Files with `publish: "false"` or missing publish field are filtered out
- Supports Obsidian-style wikilinks: `[[Link Text]]` or `[[Link Text|Display Text]]`
- Supports LaTeX math via KaTeX

### Content Organization

- **Papers**: Research paper summaries in `content/Papers/`
- **Concepts**: ML concept explanations in `content/Concepts/`
- **Posts**: Blog posts in `content/Posts/`
- **Tags**: Tag pages auto-generated in `content/tags/`
- **Templates**: Reusable templates in `content/Templates/`

## Configuration

### Main Config (`quartz.config.ts`)

- **Page Title**: "Gui's ML Library"
- **Base URL**: "gilunga.github.io"
- **Ignore Patterns**: `["private", "templates", "Templates", ".obsidian"]`
- **Theme**: Custom colors for light/dark mode, typography settings
- **Plugins**: Configured transformers, filters, and emitters

### Layout Config (`quartz.layout.ts`)

Defines page layout components:
- Sidebar navigation
- Header
- Footer
- Page content structure

## Development Workflow

### Local Development

```bash
# Build and serve locally with hot reload
npx quartz build --serve

# Build only
npx quartz build

# Check code quality
npm run check    # TypeScript + Prettier check
npm run format   # Format with Prettier
npm run test     # Run tests
```

### Build Process

1. **Clean**: Removes output directory
2. **Glob**: Finds all Markdown files in `content/` directory
3. **Parse**: Processes files through worker pool (parallel)
4. **Filter**: Removes unpublished content
5. **Emit**: Generates static HTML and assets

### Watch Mode

When using `--serve`, the build system:
- Watches for file changes using `chokidar`
- Rebuilds incrementally on changes
- Uses WebSocket for live reload
- Debounces rebuilds (250ms)

## Key Files and Their Purposes

### Build System
- `quartz/build.ts`: Main build orchestration, handles incremental rebuilds
- `quartz/processors/parse.ts`: Markdown parsing with worker pool support
- `quartz/processors/filter.ts`: Content filtering logic
- `quartz/processors/emit.ts`: Static file generation

### Configuration
- `quartz.config.ts`: Plugin configuration, theme, site settings
- `quartz.layout.ts`: Page layout structure
- `package.json`: Dependencies and npm scripts

### CLI
- `quartz/cli/handlers.js`: Command handlers (build, create, update, etc.)
- `quartz/bootstrap-cli.mjs`: CLI entry point

### Utilities
- `quartz/util/path.ts`: Path manipulation utilities
- `quartz/util/perf.ts`: Performance timing utilities
- `quartz/util/trace.ts`: Error tracing and reporting

## Important Patterns

### Plugin Development

Plugins implement interfaces defined in `quartz/plugins/types.ts`:
- Transformers: `textTransform?`, `markdownPlugins?`, `htmlPlugins?`
- Filters: `shouldPublish(ctx, content)`
- Emitters: `emit(ctx, content, staticResources)`

### Content Processing

Content flows through the pipeline as `ProcessedContent`:
- Tuple of `[HTML AST, VFile]`
- VFile contains metadata: `filePath`, `relativePath`, `slug`
- Plugins can access and modify both AST and metadata

### Path Handling

- Uses `FilePath` type for type-safe paths
- Paths are normalized to POSIX format
- Slug generation via `slugifyFilePath()`

## Deployment

The site is deployed via GitHub Actions:
- Triggers on push to `master` branch
- Builds using `npx quartz build`
- Outputs to `public/` directory
- Deploys to GitHub Pages

## Common Tasks for Agents

### Modifying Build Process
1. Edit plugins in `quartz/plugins/`
2. Modify processors in `quartz/processors/`
3. Update configuration in `quartz.config.ts`
4. Test with verbose flag: `npx quartz build --verbose`

### Debugging
- Use `--verbose` flag for detailed logging
- Check worker pool output for parsing issues
- Review filter logs to see which files are excluded
- Check emitter logs to see generated files

## Dependencies

Key dependencies:
- `quartz`: Core framework (bundled)
- `workerpool`: Parallel processing
- `chokidar`: File watching
- `preact`: UI components
- `remark/rehype`: Markdown processing
- `katex`: Math rendering
- `flexsearch`: Search functionality

## Notes

- The codebase uses TypeScript with ESM modules
- Build artifacts are cached in `.quartz-cache/`
- Source maps are generated for debugging
- The site supports both light and dark themes
- RSS feed and sitemap are auto-generated

