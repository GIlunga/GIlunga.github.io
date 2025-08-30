# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal ML notes website built with Quartz v4, a static site generator for digital gardens. The site contains research paper notes, ML concepts, and blog posts stored as Markdown files.

## Development Commands

**Build and serve locally:**
```bash
npx quartz build --serve
```

**Code quality:**
```bash
npm run check    # TypeScript check + Prettier format check
npm run format   # Format with Prettier
npm run test     # Run path utility tests
```

**Documentation build:**
```bash
npm run docs     # Build and serve docs directory
```

## Architecture

- **Content**: All content lives in `content/` directory as Markdown files
  - `content/Papers/` - Research paper summaries and notes
  - `content/Blog/` - Blog posts
  - `content/Concepts/` - ML concept explanations
  - `content/Templates/` - Template files for new content
- **Configuration**: 
  - `quartz.config.ts` - Main Quartz configuration (theme, plugins, analytics)
  - `quartz.layout.ts` - Page layout components (sidebar, header, footer)
- **Build system**: Quartz handles TypeScript compilation and static site generation
- **Content format**: Markdown with YAML frontmatter, supports Obsidian-style wikilinks

## Content Creation

**Paper notes template**: Use `content/Templates/GeneralPaper.template.md` for new paper summaries

**Required frontmatter**:
```yaml
---
date: YYYY-MM-DD
tags: ["paper", "concept", etc.]
publish: "true"  # Must be string, not boolean
aliases: ["Alternative names"]
Year: YYYY
---
```

## Key Files

- `quartz.config.ts:6` - Site title configuration
- `quartz.config.ts:10` - Base URL for deployment  
- `content/index.md` - Homepage content
- `package.json:14-19` - Available npm scripts