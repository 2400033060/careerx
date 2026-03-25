import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { saveAuth } = useAuth()

  const useTestAdmin = () => {
    setIsLogin(true)
    setError('')
    setForm((prev) => ({
      ...prev,
      email: 'admin@careerx.test',
      password: 'Admin@123',
    }))
  }

  const bypassAuthentication = () => {
    // Simulate successful authentication with a test user
    const mockAuthData = {
      token: 'bypass-token-' + Date.now(),
      user: {
        id: 'bypass-user',
        name: 'Test User',
        email: 'test@bypass.local',
        role: 'admin'
      }
    }
    saveAuth(mockAuthData)
    navigate('/dashboard')
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      if (form.email && form.password) {
        const mockAuthData = {
          token: 'demo-token-' + Date.now(),
          user: {
            id: 'demo-user',
            name: form.name || 'Demo User',
            email: form.email,
            role: form.role || 'student'
          }
        }
        saveAuth(mockAuthData)
        navigate('/dashboard')
      } else {
        setError('Please fill in all required fields')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      <div className="hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#082f49,#164e63)] p-8 text-white shadow-sm lg:block">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">CareerX Access</p>
        <h2 className="mt-3 text-3xl font-semibold">Everything in one fair platform.</h2>
        <ul className="mt-6 space-y-3 text-sm text-cyan-50">
          <li>Live chat between students and recruiters</li>
          <li>Event and booth lifecycle for admin teams</li>
          <li>Fast resume workflows for applications</li>
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        {isLogin ? 'Welcome back' : 'Create account'}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {isLogin
          ? 'Login to continue your fair journey'
          : 'Register as student, company, or admin'}
      </p>

      <div className="mt-3 rounded-xl border border-emerald-200 bg-[#dcf8c6] p-3 text-sm text-[#075e54]">
        <p className="font-semibold">Test Admin Access</p>
        <p className="mt-1">Email: admin@careerx.test</p>
        <p>Password: Admin@123</p>
        <button
          type="button"
          onClick={useTestAdmin}
          className="mt-2 rounded-lg bg-[#128c7e] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#075e54]"
        >
          Use Test Admin Credentials
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
        <p className="font-semibold">Quick Access - No Backend Required</p>
        <p className="mt-1">Skip authentication and explore the app with full admin access.</p>
        <button
          type="button"
          onClick={bypassAuthentication}
          className="mt-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Quick Access
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {!isLogin && (
          <label className="block">
            <span className="mb-1 block text-sm text-slate-700">Name</span>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </label>
        )}

        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">Email</span>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-slate-700">Password</span>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </label>

        {!isLogin && (
          <label className="block">
            <span className="mb-1 block text-sm text-slate-700">Role</span>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
              name="role"
              value={form.role}
              onChange={onChange}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#128c7e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#075e54] disabled:opacity-60"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        className="mt-4 text-sm text-cyan-700"
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? 'No account? Register here' : 'Already have an account? Login'}
      </button>
      </div>
    </section>
  )
}

export default AuthPage
