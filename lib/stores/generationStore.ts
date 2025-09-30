import { create } from "zustand"
import type { GenerationQueueItem, GeneratedImage } from "@/types/generation"

interface GenerationStore {
  queue: GenerationQueueItem[]
  gallery: GeneratedImage[]

  addToQueue: (item: GenerationQueueItem) => void
  updateQueueItem: (id: string, updates: Partial<GenerationQueueItem>) => void
  removeFromQueue: (id: string) => void
  clearCompleted: () => void

  addToGallery: (image: GeneratedImage) => void
  togglePin: (id: string) => void
  removeFromGallery: (id: string) => void
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  queue: [],
  gallery: [],

  addToQueue: (item) =>
    set((state) => ({
      queue: [...state.queue, item],
    })),

  updateQueueItem: (id, updates) =>
    set((state) => ({
      queue: state.queue.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),

  removeFromQueue: (id) =>
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    })),

  clearCompleted: () =>
    set((state) => ({
      queue: state.queue.filter((item) => item.status !== "completed" && item.status !== "failed"),
    })),

  addToGallery: (image) =>
    set((state) => ({
      gallery: [image, ...state.gallery],
    })),

  togglePin: (id) =>
    set((state) => ({
      gallery: state.gallery.map((img) => (img.id === id ? { ...img, isPinned: !img.isPinned } : img)),
    })),

  removeFromGallery: (id) =>
    set((state) => ({
      gallery: state.gallery.filter((img) => img.id !== id),
    })),
}))
