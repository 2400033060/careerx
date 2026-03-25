import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <section className="space-y-12">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-16 h-56 w-56 rounded-full bg-lime-200/45 blur-3xl" />
        <p className="inline-flex rounded-full bg-[#dcf8c6] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#075e54]">
          Virtual Career Fair Platform
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Meet companies, explore opportunities, and apply in real time.
        </h1>
        <p className="mt-5 max-w-2xl text-slate-600">
          CareerX connects admins, companies, and students inside digital fairs with booths, live chat, and streamlined applications.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/auth"
            className="rounded-xl bg-[#128c7e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#075e54]"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Open Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Admin Control',
            text: 'Manage events, approve companies, and view registrations from one panel.',
          },
          {
            title: 'Company Booths',
            text: 'Create branded booths, post job roles, and chat with students instantly.',
          },
          {
            title: 'Student Journey',
            text: 'Browse events, enter booths, chat with recruiters, and submit resumes.',
          },
        ].map((card) => (
          <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.text}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Live Booth Chats', 'Real-time messaging'],
          ['Role Dashboards', 'Admin, company, student'],
          ['Resume Submissions', 'Cloud-backed uploads'],
          ['Event Discovery', 'Search and browse fairs'],
        ].map(([title, subtitle]) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePage
