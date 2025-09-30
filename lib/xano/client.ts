export const XANO_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || "https://xnwv-v1z6-dvnr.n7c.xano.io",
  workspaceId: process.env.NEXT_PUBLIC_XANO_WORKSPACE_ID || "5",
  apiGroups: {
    auth: "/api:XfMv-Vhp",
    chatCore: "/api:GIojy04c",
    imageGenV2: "/api:f0PVlTz_",
    voiceAudio: "/api:nw4Il-wU",
  },
}

export class XanoError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "XanoError"
  }
}

export class XanoClient {
  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${XANO_CONFIG.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new XanoError(response.status, errorText || "Request failed")
      }

      return response.json()
    } catch (error) {
      if (error instanceof XanoError) {
        throw error
      }
      throw new XanoError(500, error instanceof Error ? error.message : "Unknown error")
    }
  }
}
