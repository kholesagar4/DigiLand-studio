const { PUBLIC_BASE_URL }: any = globalThis

export const envConfig = {
  PUBLIC_BASE_URL: PUBLIC_BASE_URL || import.meta.env.PUBLIC_BASE_URL,
};