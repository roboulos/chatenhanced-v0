import { XanoClient, XANO_CONFIG } from "./client"
import type { Message } from "@/types/messages"
import type { ChatResponse } from "@/types/xano"

export class ChatService extends XanoClient {
  async sendMessage(params: {
    session_id: string
    message: string
    companion_id: string
    model_name: string
  }): Promise<ChatResponse> {
    return this.request(`${XANO_CONFIG.apiGroups.chatCore}/messages`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  async getHistory(sessionId: string, limit = 50): Promise<Message[]> {
    return this.request(`${XANO_CONFIG.apiGroups.chatCore}/messages?session_id=${sessionId}&limit=${limit}`)
  }

  async createSession(companionId: string): Promise<{ session_id: string }> {
    return this.request(`${XANO_CONFIG.apiGroups.chatCore}/sessions`, {
      method: "POST",
      body: JSON.stringify({ companion_id: companionId }),
    })
  }
}
