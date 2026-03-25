import { useMemo } from 'react'
import { useNotification } from '../context/NotificationContext'

const NotificationPanel = ({ open }) => {
  const { notifications, markAllRead } = useNotification()

  const items = useMemo(() => notifications.slice(0, 8), [notifications])

  if (!open) {
    return null
  }

  return (
    <div className="absolute right-0 top-12 z-40 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Notifications</p>
        <button
          type="button"
          onClick={markAllRead}
          className="text-xs font-medium text-[#128c7e] hover:text-[#075e54]"
        >
          Mark all read
        </button>
      </div>

      {items.length === 0 && <p className="p-2 text-sm text-slate-500">No notifications yet.</p>}

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={`rounded-xl border p-2 text-sm ${
              item.read ? 'border-slate-200 bg-slate-50' : 'border-emerald-200 bg-[#dcf8c6]'
            }`}
          >
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="text-slate-600">{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationPanel
