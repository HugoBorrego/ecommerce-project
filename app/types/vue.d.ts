import type { AriaAttributes } from 'vue'

declare module 'vue' {
  interface ComponentCustomProps extends AriaAttributes {
    role?: string
  }
}

export {}
