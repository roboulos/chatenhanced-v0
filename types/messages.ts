export interface Message {
  id: string
  content: string
  type: "sent" | "received"
  timestamp: number
  status: "sending" | "sent" | "failed"
  audioUrl?: string
  imageUrl?: string
}

export interface ChatSession {
  id: string
  companionId: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}
