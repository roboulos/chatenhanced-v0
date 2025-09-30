export interface XanoError {
  status: number
  message: string
}

export interface ChatResponse {
  message: string
  audio_url?: string
  session_id: string
}

export interface Voice {
  id: string
  name: string
  language: string
  gender: string
  preview_url?: string
}

export interface GenerationStatus {
  id: string
  status: "queued" | "processing" | "completed" | "failed"
  image_url?: string
  error?: string
}
