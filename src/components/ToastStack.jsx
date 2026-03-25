import { useNotification } from '../context/NotificationContext'

const typeStyles = {
  success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  error: 'border-rose-300 bg-rose-50 text-rose-900',
  warning: 'border-amber-300 bg-amber-50 text-amber-900',
  info: 'border-slate-300 bg-white text-slate-800',
}

const ToastStack = () => {
  const { toasts } = useNotification()

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex w-[min(90vw,24rem)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur toast-pop ${
            typeStyles[toast.type] || typeStyles.info
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastStack
