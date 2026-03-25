import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'

const BoothPage = () => {
  const { boothId } = useParams()
  const { user } = useAuth()
  const { pushToast, pushNotification } = useNotification()

  const [booth, setBooth] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumePreviewUrl, setResumePreviewUrl] = useState('')
  const [jobForm, setJobForm] = useState({ title: '', description: '' })

  // Mock booth data
  const mockBooths = {
    'b1': {
      _id: 'b1',
      name: 'TechCorp Software Engineering',
      description: 'Join our team of innovative software engineers working on cutting-edge technologies.',
      companyId: { _id: 'c1', name: 'TechCorp Inc.' },
      logoUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TC',
      jobs: [
        { _id: 'j1', title: 'Frontend Developer', description: 'Build amazing user interfaces with React', type: 'Full-time', location: 'Remote' },
        { _id: 'j2', title: 'Backend Engineer', description: 'Develop scalable APIs with Node.js', type: 'Internship', location: 'San Francisco' }
      ]
    },
    'b2': {
      _id: 'b2',
      name: 'DataSys Analytics',
      description: 'Data-driven solutions for modern businesses. Looking for data scientists and analysts.',
      companyId: { _id: 'c2', name: 'DataSys Solutions' },
      logoUrl: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=DS',
      jobs: [
        { _id: 'j3', title: 'Data Scientist', description: 'Analyze large datasets and build ML models', type: 'Full-time', location: 'New York' },
        { _id: 'j4', title: 'ML Engineer', description: 'Deploy and maintain machine learning systems', type: 'Contract', location: 'Remote' }
      ]
    },
    'b3': {
      _id: 'b3',
      name: 'FinanceFirst Consulting',
      description: 'Strategic financial consulting and advisory services.',
      companyId: { _id: 'c3', name: 'FinanceFirst' },
      logoUrl: 'https://via.placeholder.com/100x100/DC2626/FFFFFF?text=FF',
      jobs: [
        { _id: 'j5', title: 'Financial Analyst', description: 'Financial modeling and analysis', type: 'Full-time', location: 'Chicago' }
      ]
    }
  }

  useEffect(() => {
    const load = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const boothData = mockBooths[boothId]
      if (boothData) {
        setBooth(boothData)
        // Mock initial messages
        setMessages([
          {
            _id: 'm1',
            text: 'Welcome to our booth! Feel free to ask any questions.',
            senderId: { _id: 'c1', name: 'TechCorp Recruiter' },
            createdAt: new Date().toISOString()
          }
        ])
      }
    }

    load().catch((err) => {
      pushToast('Unable to load booth', 'error')
    })
  }, [boothId])

  useEffect(() => {
    // Mock socket functionality - simulate receiving messages
    const mockMessageTimer = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const mockMessage = {
          _id: Date.now().toString(),
          text: 'Thanks for your interest! We\'ll be in touch soon.',
          senderId: { _id: 'company', name: booth?.companyId?.name + ' Team' },
          createdAt: new Date().toISOString()
        }
        setMessages(prev => [...prev, mockMessage])
        pushNotification(
          `New message in ${booth?.name || 'booth'}`,
          `${mockMessage.senderId.name}: ${mockMessage.text}`,
          'info'
        )
      }
    }, 10000)

    return () => {
      clearInterval(mockMessageTimer)
    }
  }, [boothId, user?.id, booth?.name, pushNotification])

  useEffect(() => {
    return () => {
      if (resumePreviewUrl) {
        URL.revokeObjectURL(resumePreviewUrl)
      }
    }
  }, [resumePreviewUrl])

  const submitMessage = (event) => {
    event.preventDefault()

    if (!text.trim()) {
      return
    }

    // Mock message sending
    const newMessage = {
      _id: Date.now().toString(),
      text: text.trim(),
      senderId: { _id: user.id, name: user.name },
      createdAt: new Date().toISOString()
    }

    setMessages(prev => [...prev, newMessage])
    setText('')

    // Simulate company response after a delay
    setTimeout(() => {
      const responseMessage = {
        _id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! We\'ll get back to you soon.',
        senderId: { _id: 'company', name: booth?.companyId?.name + ' Team' },
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, responseMessage])
    }, 2000)
  }

  const submitApplication = async (event) => {
    event.preventDefault()

    if (!resumeFile) {
      return
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      pushToast('Application submitted successfully', 'success')
      pushNotification('Application Submitted', `You applied to ${booth?.name || 'this booth'}.`, 'success')
      setResumeFile(null)
      setResumePreviewUrl('')
    } catch (err) {
      pushToast('Failed to submit application', 'error')
    }
  }

  const submitJob = async (event) => {
    event.preventDefault()
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newJob = {
        _id: Date.now().toString(),
        ...jobForm,
        type: 'Full-time',
        location: 'Remote'
      }

      setBooth(prev => ({
        ...prev,
        jobs: [...(prev.jobs || []), newJob]
      }))

      setJobForm({ title: '', description: '' })
      pushToast('Job role posted', 'success')
      pushNotification('New Job Role', `${jobForm.title} was added to your booth.`, 'success')
    } catch (err) {
      pushToast('Unable to add job role', 'error')
    }
  }

  const canManageBooth = useMemo(
    () => user?.role === 'company' && booth?.companyId?._id === user?.id,
    [user, booth]
  )

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">{booth?.name || 'Booth'}</h1>
          <p className="mt-2 text-sm text-slate-600">{booth?.description}</p>
          <p className="mt-2 text-xs text-slate-500">
            Hosted by {booth?.companyId?.name || 'Company'}
          </p>

          {booth?.jobs?.length > 0 && (
            <div className="mt-4 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">Job Roles</h2>
              {booth.jobs.map((job) => (
                <div key={job._id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-600">{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Live Chat</h2>
          <div className="mt-4 h-80 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-[#ece5dd] p-3">
            {messages.map((message) => {
              const isMine = String(message.senderId?._id || '') === String(user?.id || '')

              return (
                <div
                  key={message._id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      isMine ? 'bg-[#dcf8c6]' : 'bg-white'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">{message.senderId?.name || 'User'}</p>
                    <p className="text-slate-700">{message.text}</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <form className="mt-3 flex gap-2" onSubmit={submitMessage}>
            <input
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Type your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="rounded-xl bg-[#128c7e] px-4 py-2 text-sm text-white hover:bg-[#075e54]">
              Send
            </button>
          </form>
        </article>
      </div>

      <aside className="space-y-6">
        {user?.role === 'student' && (
          <form
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={submitApplication}
          >
            <h2 className="text-xl font-semibold text-slate-900">Apply</h2>
            <p className="mt-1 text-sm text-slate-600">Upload your resume (PDF recommended)</p>
            <input
              type="file"
              className="mt-3 block w-full text-sm"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                const file = event.target.files?.[0] || null
                setResumeFile(file)
                if (resumePreviewUrl) {
                  URL.revokeObjectURL(resumePreviewUrl)
                }
                if (file && file.type === 'application/pdf') {
                  setResumePreviewUrl(URL.createObjectURL(file))
                } else {
                  setResumePreviewUrl('')
                }
              }}
              required
            />
            {resumePreviewUrl && (
              <iframe
                src={resumePreviewUrl}
                title="Resume Preview"
                className="mt-3 h-56 w-full rounded-xl border border-slate-200"
              />
            )}
            <button className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white">
              Submit Application
            </button>
          </form>
        )}

        {canManageBooth && (
          <form
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={submitJob}
          >
            <h2 className="text-xl font-semibold text-slate-900">Post Job Role</h2>
            <input
              className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Job title"
              value={jobForm.title}
              onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <textarea
              className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="Job description"
              value={jobForm.description}
              onChange={(e) =>
                setJobForm((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
            <button className="mt-3 w-full rounded-xl bg-[#128c7e] px-4 py-2 text-sm text-white hover:bg-[#075e54]">
              Add Role
            </button>
          </form>
        )}
      </aside>
    </section>
  )
}

export default BoothPage
