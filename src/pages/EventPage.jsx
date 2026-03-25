import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const FAVORITES_KEY = 'careerx_favorite_booths'

const EventPage = () => {
  const { eventId } = useParams()
  const [events, setEvents] = useState([])
  const [booths, setBooths] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  })

  // Mock data
  const mockEvents = [
    {
      _id: '1',
      title: 'Tech Career Fair 2026',
      description: 'Connect with top tech companies and explore career opportunities in software development, data science, and more.',
      date: '2026-04-15T10:00:00.000Z',
      createdAt: '2026-03-01T00:00:00.000Z'
    },
    {
      _id: '2',
      title: 'Business & Finance Expo',
      description: 'Meet with finance firms, consulting companies, and business leaders for internships and full-time positions.',
      date: '2026-05-20T09:00:00.000Z',
      createdAt: '2026-03-05T00:00:00.000Z'
    },
    {
      _id: '3',
      title: 'Engineering Showcase',
      description: 'Showcase of engineering opportunities across mechanical, electrical, civil, and chemical engineering fields.',
      date: '2026-06-10T11:00:00.000Z',
      createdAt: '2026-03-10T00:00:00.000Z'
    }
  ]

  const mockBooths = {
    '1': [
      {
        _id: 'b1',
        name: 'TechCorp Software Engineering',
        description: 'Join our team of innovative software engineers working on cutting-edge technologies.',
        companyId: { _id: 'c1', name: 'TechCorp Inc.' },
        logoUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TC',
        jobs: [
          { title: 'Frontend Developer', type: 'Full-time', location: 'Remote' },
          { title: 'Backend Engineer', type: 'Internship', location: 'San Francisco' }
        ]
      },
      {
        _id: 'b2',
        name: 'DataSys Analytics',
        description: 'Data-driven solutions for modern businesses. Looking for data scientists and analysts.',
        companyId: { _id: 'c2', name: 'DataSys Solutions' },
        logoUrl: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=DS',
        jobs: [
          { title: 'Data Scientist', type: 'Full-time', location: 'New York' },
          { title: 'ML Engineer', type: 'Contract', location: 'Remote' }
        ]
      }
    ],
    '2': [
      {
        _id: 'b3',
        name: 'FinanceFirst Consulting',
        description: 'Strategic financial consulting and advisory services.',
        companyId: { _id: 'c3', name: 'FinanceFirst' },
        logoUrl: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=FF',
        jobs: [
          { title: 'Financial Analyst', type: 'Full-time', location: 'Chicago' }
        ]
      }
    ]
  }

  useEffect(() => {
    const load = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setEvents(mockEvents)
      setBooths(mockBooths[eventId] || [])
    }

    load().catch(() => {})
  }, [eventId])

  const event = events.find((item) => item._id === eventId)

  const filteredBooths = useMemo(() => {
    const visible = booths.filter((booth) =>
      `${booth.name} ${booth.description} ${booth.companyId?.name || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    return visible.sort((a, b) => {
      if (sortBy === 'jobs') {
        return (b.jobs?.length || 0) - (a.jobs?.length || 0)
      }
      if (sortBy === 'company') {
        return (a.companyId?.name || '').localeCompare(b.companyId?.name || '')
      }
      return a.name.localeCompare(b.name)
    })
  }, [booths, search, sortBy])

  const toggleFavorite = (boothId) => {
    setFavorites((prev) => {
      const next = prev.includes(boothId)
        ? prev.filter((id) => id !== boothId)
        : [...prev, boothId]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">{event?.title || 'Event'}</h1>
        <p className="mt-2 text-slate-600">{event?.description}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Booths</h2>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 sm:w-72"
              placeholder="Search booths"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="name">Sort: Booth Name</option>
              <option value="company">Sort: Company</option>
              <option value="jobs">Sort: Most Jobs</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooths.map((booth) => (
            <article key={booth._id} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-400">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-slate-900">{booth.name}</h3>
                <button
                  type="button"
                  onClick={() => toggleFavorite(booth._id)}
                  className={`rounded-md px-2 py-1 text-xs font-semibold ${
                    favorites.includes(booth._id)
                      ? 'bg-[#dcf8c6] text-[#075e54]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {favorites.includes(booth._id) ? 'Saved' : 'Save'}
                </button>
              </div>
              <p className="mt-1 text-sm text-slate-600">{booth.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                by {booth.companyId?.name || 'Company'}
              </p>
              <p className="mt-1 text-xs text-slate-500">Jobs posted: {booth.jobs?.length || 0}</p>
              <Link
                to={`/booths/${booth._id}`}
                className="mt-3 inline-flex rounded-lg bg-[#128c7e] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#075e54]"
              >
                Enter Booth
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventPage
