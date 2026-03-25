import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY_TOKEN = 'careerx_token'
const STORAGE_KEY_USER = 'careerx_user'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY_TOKEN))
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem(STORAGE_KEY_USER)
    return rawUser ? JSON.parse(rawUser) : null
  })

  const saveAuth = (authData) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, authData.token)
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authData.user))
    setToken(authData.token)
    setUser(authData.user)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_USER)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      saveAuth,
      logout,
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
