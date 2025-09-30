export interface GenerationParams {
  prompt: string
  cfg_scale: number
  steps: number
  dimensions: string
  sampler: string
  seed?: number
  negative_prompt?: string
  loras?: LoRAConfig[]
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

export interface GenerationStatus {
  id: string
  status: "queued" | "processing" | "completed" | "failed"
  image_url?: string
  error?: string
}

export interface GenerationQueueItem {
  id: string
  prompt: string
  params: GenerationParams
  status: "queued" | "processing" | "completed" | "failed"
  createdAt: number
  imageUrl?: string
  error?: string
}

export interface GeneratedImage {
  id: string
  url: string
  prompt: string
  params: GenerationParams
  createdAt: number
  isPinned: boolean
}
