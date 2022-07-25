import { Socket } from 'phoenix'

const url = 'ws://localhost:4000/socket'

function initializeSocket() {
  if (typeof window === 'undefined') return null

  return new Socket(url, {
    params: {
      token: window?.userToken ?? '',
      currentUser: window?.currentUser ?? '',
      // user_id: window?.location.search.split('=')[1],
    },
    logger: (kind, msg, data) => {
      // console.log(`${kind}: ${msg}`, data)
    },
    transport: WebSocket,
  })
}

const socket = initializeSocket()

if (socket) {
  socket.connect()
}

export default socket
