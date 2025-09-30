import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CompanionPreset } from "@/types/companions"

const DEFAULT_COMPANIONS: CompanionPreset[] = [
  {
    id: "default",
    name: "Luna",
    avatar: "/silver-haired-anime-girl.png",
    description: "A friendly AI companion",
    personality: "Friendly, helpful, and creative",
    modelName: "openai/gpt-5-mini",
    voiceId: "default",
    voiceSpeed: 1.0,
    generationDefaults: {
      cfg_scale: 7,
      steps: 30,
      sampler: "DPM++ 2M Karras",
      dimensions: "512x768",
      negative_prompt: "low quality, blurry, distorted",
      loras: [],
    },
  },
]

interface CompanionStore {
  companions: CompanionPreset[]
  activeCompanionId: string

  addCompanion: (companion: CompanionPreset) => void
  updateCompanion: (id: string, updates: Partial<CompanionPreset>) => void
  deleteCompanion: (id: string) => void
  setActiveCompanion: (id: string) => void
  getActiveCompanion: () => CompanionPreset | undefined
}

export const useCompanionStore = create<CompanionStore>()(
  persist(
    (set, get) => ({
      companions: DEFAULT_COMPANIONS,
      activeCompanionId: DEFAULT_COMPANIONS[0].id,

      addCompanion: (companion) =>
        set((state) => ({
          companions: [...state.companions, companion],
        })),

      updateCompanion: (id, updates) =>
        set((state) => ({
          companions: state.companions.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCompanion: (id) =>
        set((state) => ({
          companions: state.companions.filter((c) => c.id !== id),
          activeCompanionId: state.activeCompanionId === id ? state.companions[0]?.id : state.activeCompanionId,
        })),

      setActiveCompanion: (id) => set({ activeCompanionId: id }),

      getActiveCompanion: () => {
        const state = get()
        return state.companions.find((c) => c.id === state.activeCompanionId)
      },
    }),
    {
      name: "companion-storage",
    },
  ),
)
