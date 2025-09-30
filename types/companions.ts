export interface CompanionPreset {
  id: string
  name: string
  avatar: string
  description: string
  personality: string
  modelName: string
  voiceId?: string
  voiceSpeed?: number

  // Image generation defaults
  generationDefaults: {
    cfg_scale: number
    steps: number
    sampler: string
    dimensions: string
    negative_prompt: string
    loras: LoRAConfig[]
  }
}

export interface LoRAConfig {
  id: string
  name: string
  weight: number
  trigger_words?: string[]
}

export interface LoRAModel {
  id: string
  name: string
  description: string
  thumbnail: string
  trigger_words: string[]
  base_model: string
  tags: string[]
}
