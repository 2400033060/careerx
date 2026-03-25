import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const BackendStatusContext = createContext(null)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const BackendStatusProvider = ({ children }) => {
  const [isBackendOnline, setIsBackendOnline] = useState(true)
  const [lastCheckedAt, setLastCheckedAt] = useState(null)

  const checkBackend = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        cache: 'no-store',
      })

      setIsBackendOnline(response.ok)
      setLastCheckedAt(new Date())
    } catch {
      setIsBackendOnline(false)
      setLastCheckedAt(new Date())
    }
  }, [])

  useEffect(() => {
    checkBackend()
    const timer = setInterval(checkBackend, 20000)

    const onOffline = () => {
      setIsBackendOnline(false)
      setLastCheckedAt(new Date())
    }

    const onOnline = () => {
      setIsBackendOnline(true)
      setLastCheckedAt(new Date())
    }

    window.addEventListener('careerx:backend-offline', onOffline)
    window.addEventListener('careerx:backend-online', onOnline)

    return () => {
      clearInterval(timer)
      window.removeEventListener('careerx:backend-offline', onOffline)
      window.removeEventListener('careerx:backend-online', onOnline)
    }
  }, [checkBackend])

  const value = useMemo(
    () => ({ isBackendOnline, lastCheckedAt, checkBackend }),
    [isBackendOnline, lastCheckedAt, checkBackend]
  )

  return <BackendStatusContext.Provider value={value}>{children}</BackendStatusContext.Provider>
}

export const useBackendStatus = () => {
  const context = useContext(BackendStatusContext)
  if (!context) {
    throw new Error('useBackendStatus must be used within BackendStatusProvider')
  }

  return context
}
