import { XanoClient, XANO_CONFIG } from "./client"
import type { GenerationParams, GenerationStatus, LoRAModel } from "@/types/generation"

export class GenerationService extends XanoClient {
  async generateImage(params: GenerationParams): Promise<{ request_id: string }> {
    return this.request(`${XANO_CONFIG.apiGroups.imageGenV2}/smart_generate`, {
      method: "POST",
      body: JSON.stringify({
        prompt: params.prompt,
        cfg_scale: params.cfg_scale,
        steps: params.steps,
        dimensions: params.dimensions,
        sampler: params.sampler,
        seed: params.seed,
        negative_prompt: params.negative_prompt,
        loras: params.loras,
      }),
    })
  }

  async getGenerationStatus(requestId: string): Promise<GenerationStatus> {
    return this.request(`${XANO_CONFIG.apiGroups.imageGenV2}/requests/${requestId}`)
  }

  async fetchLoRAModels(filters?: {
    search?: string
    base_model?: string
    tags?: string[]
  }): Promise<LoRAModel[]> {
    const params = new URLSearchParams()
    if (filters?.search) params.append("search", filters.search)
    if (filters?.base_model) params.append("base_model", filters.base_model)
    if (filters?.tags) params.append("tags", filters.tags.join(","))

    return this.request(`${XANO_CONFIG.apiGroups.imageGenV2}/loras?${params}`)
  }

  async imageToImage(params: GenerationParams & { image: string }): Promise<{ request_id: string }> {
    return this.request(`${XANO_CONFIG.apiGroups.imageGenV2}/image_to_image`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  async enhanceImage(imageUrl: string, scale = 2): Promise<{ request_id: string }> {
    return this.request(`${XANO_CONFIG.apiGroups.imageGenV2}/enhance_image_v2`, {
      method: "POST",
      body: JSON.stringify({ image_url: imageUrl, scale }),
    })
  }
}
