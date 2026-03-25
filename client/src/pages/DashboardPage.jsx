import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'

const DashboardPage = () => {
  const { user } = useAuth()
  const { pushToast, pushNotification } = useNotification()

  const [events, setEvents] = useState([])
  const [pendingCompanies, setPendingCompanies] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [adminBooths, setAdminBooths] = useState([])
  const [companyApps, setCompanyApps] = useState([])
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '' })
  const [boothForm, setBoothForm] = useState({
    eventId: '',
    name: '',
    description: '',
    logoUrl: '',
  })

  const isAdmin = user?.role === 'admin'
  const isCompany = user?.role === 'company'

  // Mock data for frontend-only operation
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

  const mockPendingCompanies = [
    { _id: 'c1', name: 'TechCorp Inc.', email: 'hr@techcorp.com', status: 'pending' },
    { _id: 'c2', name: 'DataSys Solutions', email: 'recruiting@datasys.com', status: 'pending' },
    { _id: 'c3', name: 'InnovateLabs', email: 'careers@innovatelabs.com', status: 'pending' }
  ]

  const mockRegistrations = [
    { _id: 'r1', studentName: 'Alice Johnson', studentEmail: 'alice@email.com', eventId: '1', status: 'approved' },
    { _id: 'r2', studentName: 'Bob Smith', studentEmail: 'bob@email.com', eventId: '1', status: 'pending' },
    { _id: 'r3', studentName: 'Carol Davis', studentEmail: 'carol@email.com', eventId: '2', status: 'approved' }
  ]

  const mockAdminBooths = [
    { _id: 'b1', name: 'TechCorp Booth', eventId: '1', companyId: { _id: 'c1', name: 'TechCorp Inc.' } },
    { _id: 'b2', name: 'DataSys Booth', eventId: '1', companyId: { _id: 'c2', name: 'DataSys Solutions' } },
    { _id: 'b3', name: 'InnovateLabs Booth', eventId: '2', companyId: { _id: 'c3', name: 'InnovateLabs' } }
  ]

  const mockCompanyApps = [
    { _id: 'a1', studentName: 'Alice Johnson', resumeUrl: '/resumes/alice.pdf', status: 'pending' },
    { _id: 'a2', studentName: 'Bob Smith', resumeUrl: '/resumes/bob.pdf', status: 'reviewed' }
  ]

  const loadData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setEvents(mockEvents)

    if (isAdmin) {
      setPendingCompanies(mockPendingCompanies)
      setRegistrations(mockRegistrations)
      setAdminBooths(mockAdminBooths)
    }

    if (isCompany) {
      setCompanyApps(mockCompanyApps)
    }
  }

  useEffect(() => {
    loadData().catch((err) => {
      pushToast(err.response?.data?.message || 'Failed to load dashboard data', 'error')
    })
  }, [isAdmin, isCompany])

  const upcomingEvents = useMemo(
    () => events.filter((event) => new Date(event.date) >= new Date()),
    [events]
  )

  const analytics = useMemo(() => {
    const eventsCount = events.length
    const boothsCount = adminBooths.length
    const applicationsCount = registrations.length
    const companiesCount = adminBooths.reduce((acc, booth) => {
      if (booth.companyId?._id) {
        acc.add(booth.companyId._id)
      }
      return acc
    }, new Set()).size

    const conversionRate = boothsCount
      ? Math.round((applicationsCount / boothsCount) * 100)
      : 0

    return {
      eventsCount,
      boothsCount,
      applicationsCount,
      companiesCount,
      conversionRate,
    }
  }, [events, adminBooths, registrations])

  const handleCreateEvent = async (event) => {
    event.preventDefault()
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newEvent = {
        _id: Date.now().toString(),
        ...eventForm,
        createdAt: new Date().toISOString()
      }

      setEvents(prev => [...prev, newEvent])
      setEventForm({ title: '', description: '', date: '' })
      pushToast('Event created successfully', 'success')
      pushNotification('Event Created', `${eventForm.title} is now live in CareerX.`, 'success')
    } catch (err) {
      pushToast('Unable to create event', 'error')
    }
  }

  const handleCreateBooth = async (event) => {
    event.preventDefault()
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newBooth = {
        _id: Date.now().toString(),
        ...boothForm,
        companyId: { _id: user.id, name: user.name }
      }

      setAdminBooths(prev => [...prev, newBooth])
      setBoothForm({ eventId: '', name: '', description: '', logoUrl: '' })
      pushToast('Booth created successfully', 'success')
      pushNotification('Booth Published', `${boothForm.name} booth is now visible.`, 'success')
    } catch (err) {
      pushToast('Unable to create booth', 'error')
    }
  }

  const handleApproveCompany = async (companyId, companyName) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setPendingCompanies(prev => prev.filter(c => c._id !== companyId))
      pushToast(`Approved ${companyName}`, 'success')
      pushNotification('Company Approved', `${companyName} can now create booths.`, 'success')
    } catch (err) {
      pushToast('Approval failed', 'error')
    }
  }

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-[linear-gradient(120deg,#075e54,#128c7e)] px-6 py-7 text-white sm:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Control Center</p>
          <h1 className="mt-2 text-3xl font-semibold capitalize">{user?.role} dashboard</h1>
          <p className="mt-1 text-sm text-emerald-50">
            Signed in as {user?.name} ({user?.email})
          </p>
        </div>

        {isAdmin && (
          <div className="grid gap-3 px-6 py-5 sm:grid-cols-2 lg:grid-cols-5 sm:px-8">
            {[
              { label: 'Events', value: analytics.eventsCount },
              { label: 'Booths', value: analytics.boothsCount },
              { label: 'Applications', value: analytics.applicationsCount },
              { label: 'Companies', value: analytics.companiesCount },
              { label: 'CVR', value: `${analytics.conversionRate}%` },
            ].map((item) => (
              <article key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming Events</h2>
          <span className="rounded-full bg-[#dcf8c6] px-3 py-1 text-xs font-semibold text-[#075e54]">
            {upcomingEvents.length} available
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {upcomingEvents.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-emerald-500"
            >
              <h3 className="font-medium text-slate-900">{event.title}</h3>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{event.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(event.date).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={handleCreateEvent}
          >
            <h2 className="text-xl font-semibold text-slate-900">Create Event</h2>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Title"
              value={eventForm.title}
              onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
            <textarea
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Description"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((p) => ({ ...p, description: e.target.value }))
              }
              required
            />
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={eventForm.date}
              onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))}
              required
            />
            <button className="rounded-xl bg-[#128c7e] px-4 py-2 text-sm text-white hover:bg-[#075e54]">
              Create Event
            </button>
          </form>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Pending Companies</h2>
            {pendingCompanies.length === 0 && (
              <p className="text-sm text-slate-500">No pending approvals</p>
            )}
            {pendingCompanies.map((company) => (
              <div
                key={company._id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{company.name}</p>
                  <p className="text-sm text-slate-600">{company.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleApproveCompany(company._id, company.name)}
                  className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">Registrations</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600">
                    <th className="py-2">Student</th>
                    <th className="py-2">Booth</th>
                    <th className="py-2">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((row) => (
                    <tr key={row._id} className="border-b border-slate-100">
                      <td className="py-2 text-slate-800">{row.userId?.name}</td>
                      <td className="py-2 text-slate-800">{row.boothId?.name}</td>
                      <td className="py-2">
                        <a
                          className="text-[#128c7e]"
                          href={row.resumeURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Resume
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isCompany && (
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={handleCreateBooth}
          >
            <h2 className="text-xl font-semibold text-slate-900">Create Booth</h2>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={boothForm.eventId}
              onChange={(e) => setBoothForm((p) => ({ ...p, eventId: e.target.value }))}
              required
            >
              <option value="">Select event</option>
              {events.map((event) => (
                <option value={event._id} key={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Booth Name"
              value={boothForm.name}
              onChange={(e) => setBoothForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <textarea
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Booth Description"
              value={boothForm.description}
              onChange={(e) =>
                setBoothForm((p) => ({ ...p, description: e.target.value }))
              }
              required
            />
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Logo URL (optional)"
              value={boothForm.logoUrl}
              onChange={(e) => setBoothForm((p) => ({ ...p, logoUrl: e.target.value }))}
            />
            <button className="rounded-xl bg-[#128c7e] px-4 py-2 text-sm text-white hover:bg-[#075e54]">
              Create Booth
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Applicants</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {companyApps.map((application) => (
                <li key={application._id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-medium text-slate-900">
                    {application.userId?.name} - {application.boothId?.name}
                  </p>
                  <a
                    className="text-[#128c7e]"
                    href={application.resumeURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume Link
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {user?.role === 'student' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Explore Career Fairs</h2>
          <p className="mt-2 text-sm text-slate-600">
            Pick an event above to enter booths, chat with companies, and apply.
          </p>
        </div>
      )}
    </section>
  )
}

export default DashboardPage
