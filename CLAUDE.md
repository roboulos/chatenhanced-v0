# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChatEnhanced-v0 is a Next.js 15 application with App Router for an AI-powered chat interface. This is a fresh Next.js implementation bootstrapped with `create-next-app`, using Turbopack for faster builds and hot reloading.

**Stack:**
- Next.js 15.5.4 with App Router
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4.1
- Zustand for state management
- shadcn/ui components (New York style)
- Xano backend API integration

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Linting
npm run lint
```

**Note:** The dev server runs on `http://localhost:3000` by default.

## Architecture

### Directory Structure

```
chatenhanced-v0/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page (root route)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── stores/              # Zustand state stores
│   │   ├── chatStore.ts     # Chat sessions & messages
│   │   ├── companionStore.ts # AI companion management
│   │   └── generationStore.ts # Image generation state
│   ├── xano/                # Xano API client services
│   │   ├── client.ts        # Base XanoClient & config
│   │   ├── chat.ts          # Chat API methods
│   │   ├── generation.ts    # Image generation API
│   │   └── voice.ts         # Voice/audio API
│   └── utils.ts             # Utility functions (cn, etc.)
└── types/                   # TypeScript definitions
    ├── companions.ts        # Companion & LoRA types
    ├── messages.ts          # Message & chat types
    └── xano.ts              # Xano API types
```

### Key Architectural Patterns

**State Management (Zustand):**
- Three primary stores: `chatStore`, `companionStore`, `generationStore`
- Stores live in `lib/stores/`
- Chat store manages sessions as a dictionary keyed by session ID
- Active session pattern: store tracks `activeSessionId` for current conversation

**Xano Integration:**
- Base class pattern: `XanoClient` in `lib/xano/client.ts` provides shared `request()` method
- Service classes extend `XanoClient`: `ChatService`, etc.
- API configuration centralized in `XANO_CONFIG` object with named API groups:
  - `auth`: `/api:XfMv-Vhp`
  - `chatCore`: `/api:GIojy04c`
  - `imageGenV2`: `/api:f0PVlTz_`
  - `voiceAudio`: `/api:nw4Il-wU`
- Base URL: `https://xnwv-v1z6-dvnr.n7c.xano.io` (Workspace ID: 5)

**Component Organization:**
- UI primitives from shadcn/ui in `components/ui/`
- Feature components will be organized by domain (chat, companions, generation)
- Uses shadcn/ui with "New York" style variant

**Type System:**
- Strict TypeScript enabled
- Types organized by domain in `types/`
- Path alias `@/*` maps to project root

### Xano Backend Structure

The backend has four API groups:

1. **Authentication (`auth`)**: User login/signup
2. **Chat Core (`chatCore`)**:
   - POST `/messages` - Send message, get AI response
   - GET `/messages` - Retrieve chat history
   - POST `/sessions` - Create new chat session
3. **Image Generation V2 (`imageGenV2`)**: DALL-E, Flux, LoRA models
4. **Voice & Audio (`voiceAudio`)**: TTS generation

### State Flow

```
User Action → Zustand Store → Xano API → Store Update → UI Refresh
```

Example for chat messages:
1. User types message
2. `chatStore.addMessage()` optimistically adds to local state
3. `ChatService.sendMessage()` calls Xano API
4. Response updates message with AI reply
5. React re-renders from store subscription

## shadcn/ui Integration

The project uses shadcn/ui components. Configuration in `components.json`:

```bash
# Add new components
npx shadcn@latest add [component-name]

# Components are added to components/ui/
# Import with: import { Button } from "@/components/ui/button"
```

**Styling approach:**
- Tailwind CSS 4.1 with CSS variables for theming
- Base color: neutral
- Icon library: lucide-react

## Environment Variables

Set in `.env.local` (not tracked in git):

```bash
NEXT_PUBLIC_XANO_BASE_URL=https://xnwv-v1z6-dvnr.n7c.xano.io
NEXT_PUBLIC_XANO_WORKSPACE_ID=5
```

These have defaults in `lib/xano/client.ts` so they're optional.

## Common Patterns

### Creating a New API Service

```typescript
// lib/xano/myservice.ts
import { XanoClient, XANO_CONFIG } from "./client"

export class MyService extends XanoClient {
  async getData(): Promise<DataType> {
    return this.request(`${XANO_CONFIG.apiGroups.chatCore}/endpoint`)
  }
}
```

### Adding Zustand Store

```typescript
// lib/stores/myStore.ts
import { create } from "zustand"

interface MyStore {
  data: string[]
  addData: (item: string) => void
}

export const useMyStore = create<MyStore>((set) => ({
  data: [],
  addData: (item) => set((state) => ({
    data: [...state.data, item]
  })),
}))
```

### Using Path Aliases

All imports use `@/` prefix for absolute imports:

```typescript
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/lib/stores/chatStore"
import type { Message } from "@/types/messages"
```

## Important Implementation Notes

- **Turbopack enabled**: Both dev and build use `--turbopack` flag for performance
- **React 19**: Using latest React version with new features
- **Server Components**: Default in App Router; mark with `"use client"` when needed
- **Type safety**: All Xano responses should have corresponding types in `types/`
- **Error handling**: `XanoError` class extends Error with status codes
