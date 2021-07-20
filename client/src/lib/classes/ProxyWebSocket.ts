import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

class ProxyWebSocket extends WebSocket {
  readonly state: Writable<number> = writable(this.CLOSED)

  constructor(url: string, protocols?: string | Array<string> | undefined) {
    super(url, protocols)
    this.state.set(this.CONNECTING)

    const OPEN = (): void => {
      this.state.set(this.OPEN)
    }
    const ERROR = () => {
      CLOSE()
    }
    const CLOSE = () => {
      this.state.set(this.CLOSED)
      this.removeEventListener('open', OPEN)
      this.removeEventListener('error', ERROR)
      this.removeEventListener('close', CLOSE)
    }

    this.addEventListener('open', OPEN)
    this.addEventListener('error', ERROR)
    this.addEventListener('close', CLOSE)
  }
}

export { ProxyWebSocket }
