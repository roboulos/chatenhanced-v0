import { XanoClient, XANO_CONFIG } from "./client"
import type { Voice } from "@/types/xano"

export class VoiceService extends XanoClient {
  async generateSpeech(params: {
    text: string
    voice_id: string
    speed: number
  }): Promise<{ audio_url: string }> {
    return this.request(`${XANO_CONFIG.apiGroups.voiceAudio}/text_to_speech_real`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  async listVoices(language = "en"): Promise<Voice[]> {
    return this.request(`${XANO_CONFIG.apiGroups.voiceAudio}/voices_v3?language=${language}`)
  }
}
