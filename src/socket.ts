import { Socket } from 'phoenix'

const url = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:4000/socket'

if (typeof window !== 'undefined') {
  // TODO: save current user to window object to authenticate
  // @ts-ignore
  window.currentUser = {
    email: 'test@zubale.com',
    id: 'test',
  }
}

function initializeSocket() {
  if (typeof window === 'undefined') {
    return null
  }

  return new Socket(url, {
    // TODO: pass optional params for authentication and other purposes on the side of Phoenix
    params: {
      // @ts-ignore
      token: window?.userToken || '',
      // @ts-ignore
      currentUser: window?.currentUser || '',
      // user_id: window.location.search.split('=')[1],
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
