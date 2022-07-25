import { Socket } from 'phoenix'
import * as React from 'react'
import socket from '../socket'

type OnMessage = (eventName: string, payload: any) => void

export function useChannel(channelTopic: string, onMessage: OnMessage) {
  const [broadcast, setBroadcast] = React.useState(mustJoinChannelWarning)
  React.useEffect(() => {
    let doCleanup
    if (socket !== null) {
      doCleanup = joinChannel(socket, channelTopic, onMessage, setBroadcast)
    }
    return doCleanup
  }, [channelTopic, onMessage])
  return broadcast
}

type SetBroadcast = React.Dispatch<React.SetStateAction<(_eventName: any, _payload: any) => void>>

function joinChannel(socket: Socket, channelTopic: string, onMessage: OnMessage, setBroadcast: SetBroadcast) {
  const channel = socket.channel(channelTopic, { client: 'browser' })

  channel.onMessage = (event, payload) => {
    // I don't think the chan_reply_ events are needed - always duplicates.
    if (event != null && !event.startsWith('chan_reply_')) {
      onMessage(event, payload)
    }
    // Return the payload since we're using the special onMessage hook
    return payload
  }

  channel
    .join()
    .receive('ok', (res) => console.log('successfully joined channel', res?.messages ?? ''))
    .receive('error', (err) => console.error('failed to join channel', err?.reason))

  setBroadcast((_prevState: any) => (eventName: string, payload: any) => channel.push(eventName, payload))

  return () => {
    channel.leave()
  }
}

const mustJoinChannelWarning = (_oldstate: any) => (_eventName: string, _payload: any) =>
  console.error(`useChannel broadcast function cannot be invoked before the channel has been joined`)
