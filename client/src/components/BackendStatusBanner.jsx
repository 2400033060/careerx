import { useBackendStatus } from '../context/BackendStatusContext'

const BackendStatusBanner = () => {
  const { isBackendOnline, lastCheckedAt, checkBackend } = useBackendStatus()

  if (isBackendOnline) {
    return null
  }

  return (
    <div className="border-b border-amber-300 bg-amber-100/95 px-4 py-2 text-sm text-amber-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 sm:px-2">
        <p>
          Backend is off. Frontend is running on Vercel/static mode, so dynamic features may not work.
          {lastCheckedAt ? ` Last check: ${lastCheckedAt.toLocaleTimeString()}` : ''}
        </p>
        <button
          type="button"
          onClick={checkBackend}
          className="rounded-md bg-amber-700 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-800"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default BackendStatusBanner
