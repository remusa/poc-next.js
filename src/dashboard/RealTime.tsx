import * as React from 'react'
import { useChannel } from '../hooks/use-channel'
import Title from './Title'

if (typeof window !== 'undefined') {
  // TODO: save current user to window object to authenticate with user_socket in Zoul
  window.currentUser = {
    email: 'test@zubale.com',
    id: 'test',
  }
}

const topic = `room:lobby`

export default function RealTime() {
  const onChannelMessage = React.useCallback((event, payload) => {
    if (event === 'response:validated' || (event === 'phx_reply ' && payload.status === 'ok')) {
      console.log('message received')
      console.log(payload?.response ?? payload)
    }
  }, [])

  const broadcast = useChannel(topic, onChannelMessage)

  const onSend = React.useCallback(() => {
    broadcast(topic, { payload: 'message' })
  }, [broadcast])

  React.useEffect(() => {
    onSend()
  }, [broadcast, onSend])

  return (
    <React.Fragment>
      <Title>Real Time</Title>
    </React.Fragment>
  )
}
