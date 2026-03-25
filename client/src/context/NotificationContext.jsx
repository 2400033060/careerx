import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

let toastIdCounter = 1
let notificationIdCounter = 1

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const [notifications, setNotifications] = useState([])

  const pushToast = useCallback((message, type = 'info') => {
    const id = toastIdCounter
    toastIdCounter += 1

    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 2800)
  }, [])

  const pushNotification = useCallback((title, message, type = 'info') => {
    const id = notificationIdCounter
    notificationIdCounter += 1

    setNotifications((prev) => [
      { id, title, message, type, read: false, createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  )

  const value = useMemo(
    () => ({
      toasts,
      notifications,
      unreadCount,
      pushToast,
      pushNotification,
      markAllRead,
    }),
    [toasts, notifications, unreadCount, pushToast, pushNotification, markAllRead]
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used inside NotificationProvider')
  }

  return context
}
