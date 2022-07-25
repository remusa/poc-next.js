import { Socket } from 'phoenix'

const url = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:4000/socket'

function initializeSocket() {
  if (typeof window === 'undefined') return null

  return new Socket(url, {
    // TODO: pass optional params for authentication and other purposes on the side of Phoenix
    params: {
      token: window?.userToken ?? '',
      currentUser: window?.currentUser ?? '',
      user_id: window?.location.search.split('=')[1],
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
