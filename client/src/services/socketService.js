import { io } from 'socket.io-client'

let socket

export const connectSocket = () => {
  const token = localStorage.getItem('careerx_token')

  if (!token) {
    return null
  }

  if (!socket) {
    const baseUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    socket = io(baseUrl, {
      auth: { token },
    })
  }

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
