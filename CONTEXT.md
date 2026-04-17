# Application Context for AI Agents

## Overview
This is the **HackerMouse Blog** - a modern blog platform built with Next.js 16, Fumadocs MDX, and Tailwind CSS. It delivers news, insights, and analysis for hacking developers and tech enthusiasts.

## Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS 4, clsx, tailwind-merge
- **MDX**: Fumadocs MDX for blog content rendering
- **State Management**: React Server Components, Next.js Session State
- **Animations**: Motion (framer-motion)
- **Icons**: Lucide React
- **Utilities**: TypeScript, Zod for validation

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Core utilities and data fetching logic
- `blog/content/` - MDX blog posts
- `node_modules/` - Dependencies
- `.next/` - Next.js build output

### Core Components
- `components/stock-ticker.tsx` - Real-time market data ticker
- `components/market-terminal.tsx` - Market intelligence panel with live quotes
- `components/news-feed.tsx` - Dynamic blog feed with tag filtering
- `components/theme-provider.tsx` - Dark/light theme toggle
- `app/page.tsx` - Main page with feed, tags, and market terminal

### Data Flow
1. `app/page.tsx` loads blog content via `loader` from `@/.source/server`
2. Blog posts are filtered by tags and sorted by date (newest first)
3. Market data fetched via `lib/stock-actions.ts` using Yahoo Finance API
4. Real-time updates every 60 seconds via `setInterval`
5. Streaming responses supported via `chatbot.run(stream=True)` in groq_chatbot.py

### API Integration
- **Yahoo Finance**: `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`
- **Groq API**: Used for AI chatbot responses (`groq/compound` model)
- `lib/stock-actions.ts` handles server-side stock quote fetching

### Environment
- Package manager: pnpm 10.30.3
- Node.js: v22.16.0
- Scripts: `dev`, `build`, `start`, `lint`
- Dependencies include: react, next, tailwindcss, groq, streamlit, agno-ai

### Configuration Files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS with Tailwind
- `eslint.config.mjs` - ESLint with FlatConfig
- `pnpm-lock.yaml` - Dependency lockfile
- `.env.example` - Environment variable template

### Blog Post Format
MDX files in `blog/content/` with frontmatter:
```mdx
---
title: "Post Title"
description: "Brief description"
date: "2024-12-01"
tags: ["React", "Next.js", "Tutorial"]
featured: true
readTime: "10 min read"
author: "author-key"
---
```

### Authors
Defined in `lib/authors.ts` with name, position, avatar path.

### Features
- Real-time market data terminal with animated charts
- Tag-based blog filtering
- MDX support with component embedding
- Dark/light theme toggle
- Streaming AI chatbot responses
- Responsive mobile design
- SEO-optimized metadata

### Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build && pnpm start` - Production build and serve
- `pnpm lint` - Run ESLint
- `pnpm install` - Install dependencies (runs fumadocs-mdx postinstall)