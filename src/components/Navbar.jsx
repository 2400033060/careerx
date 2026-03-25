import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import NotificationPanel from './NotificationPanel'

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm transition ${
    isActive ? 'bg-[#128c7e] text-white' : 'text-slate-700 hover:bg-[#dcf8c6]'
  }`

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { unreadCount } = useNotification()
  const [openNotifications, setOpenNotifications] = useState(false)
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#075e54]/20 bg-[#f0f2f5]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#075e54] text-xs font-bold text-white transition group-hover:rotate-6">CX</span>
          CareerX
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>
              Admin Panel
            </NavLink>
          )}
          {isAuthenticated && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenNotifications((prev) => !prev)}
                className="relative rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-[#dcf8c6]"
              >
                Inbox
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationPanel open={openNotifications} />
            </div>
          )}
          {!isAuthenticated ? (
            <NavLink to="/auth" className={linkClass}>
              Login / Register
            </NavLink>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg bg-[#075e54] px-3 py-2 text-sm text-white transition hover:bg-[#0f766e]"
            >
              Logout ({user?.name})
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
