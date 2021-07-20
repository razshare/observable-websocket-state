<script lang="ts">
  import { derived, readable, writable } from 'svelte/store'
  import type { Writable, Readable } from 'svelte/store'
  let messages: Array<string> = []

  const WEBSOCKET: Writable<WebSocket> = writable(
    new WebSocket(`ws://127.0.0.1:8080/chat/${location.hash.substr(1)}`)
  )

  const WS: Readable<WebSocket> = derived(WEBSOCKET, $ws => $ws)


  /**
   * This expression triggers only once, at startup.
   * It doesn't trigger again when the state changes to "closed".
  */
  $: ((WS1, WS2) => {
    console.log("WS1 === WS2?",WS1 === WS2)
  })($WEBSOCKET, $WS)

  $WEBSOCKET.addEventListener('message', e => {
    messages.push(e.data)
    messages = messages
  })
</script>

STATE: {$WS.readyState}
<br />
Messages
<br />
{#each messages as message}
  {message}<br />
{/each}
