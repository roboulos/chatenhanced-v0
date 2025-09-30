import { create } from "zustand"
import type { Message, ChatSession } from "@/types/messages"

interface ChatStore {
  sessions: Record<string, ChatSession>
  activeSessionId: string | null

  createSession: (companionId: string, sessionId: string) => void
  addMessage: (sessionId: string, message: Message) => void
  updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) => void
  clearMessages: (sessionId: string) => void
  setActiveSession: (sessionId: string) => void
  getActiveMessages: () => Message[]
}

export const useChatStore = create<ChatStore>((set, get) => ({
  sessions: {},
  activeSessionId: null,

  createSession: (companionId, sessionId) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [sessionId]: {
          id: sessionId,
          companionId,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
      activeSessionId: sessionId,
    })),

  addMessage: (sessionId, message) =>
    set((state) => {
      const session = state.sessions[sessionId]
      if (!session) return state

      return {
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            messages: [...session.messages, message],
            updatedAt: Date.now(),
          },
        },
      }
    }),

  updateMessage: (sessionId, messageId, updates) =>
    set((state) => {
      const session = state.sessions[sessionId]
      if (!session) return state

      return {
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            messages: session.messages.map((m) => (m.id === messageId ? { ...m, ...updates } : m)),
            updatedAt: Date.now(),
          },
        },
      }
    }),

  clearMessages: (sessionId) =>
    set((state) => {
      const session = state.sessions[sessionId]
      if (!session) return state

      return {
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            messages: [],
            updatedAt: Date.now(),
          },
        },
      }
    }),

  setActiveSession: (sessionId) => set({ activeSessionId: sessionId }),

  getActiveMessages: () => {
    const state = get()
    if (!state.activeSessionId) return []
    return state.sessions[state.activeSessionId]?.messages || []
  },
}))
