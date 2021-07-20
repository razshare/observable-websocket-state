<script lang="ts">
  import type { Writable } from 'svelte/store'

  import { ProxyWebSocket } from './lib/classes/ProxyWebSocket'

  let messages: Array<string> = []
  const websocket: ProxyWebSocket = new ProxyWebSocket(
    `ws://127.0.0.1:8080/chat/${location.hash.substr(1)}`
  )
  const STATE: Writable<number> = websocket.state

  STATE.subscribe(s => {
    console.log('state:', s)
  })
  websocket.addEventListener('message', e => {
    messages.push(e.data)
    messages = messages
  })
</script>

STATE: {$STATE}
<br />
Messages
<br />
{#each messages as message}
  {message}<br />
{/each}
