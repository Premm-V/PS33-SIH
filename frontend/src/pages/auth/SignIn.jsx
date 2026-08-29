import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, AlertCircle } from 'lucide-react'
import { useAuth, ROLES, ROLE_HOME } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import RoleCard from '../../components/RoleCard'

// Role options for sign-in — user-facing labels map to exact contract values.
const SIGN_IN_ROLES = [
  {
    value: ROLES.FARMER,
    label: "I'm a farmer",
    description: 'Access your listings and incoming orders.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12s1-4 4-4 4 4 4 4" />
        <path d="M12 16v-4" />
      </svg>
    ),
  },
  {
    value: ROLES.BUYER_INDIVIDUAL,
    label: 'Buying for myself',
    description: 'Browse listings and place individual orders.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    value: ROLES.BUYER_ENTERPRISE,
    label: 'Buying for a business',
    description: 'Submit bulk requests and manage recurring orders.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
]

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [phone, setPhone]     = useState('')
  const [role, setRole]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!phone.trim()) { setError('Please enter your phone number.'); return }
    if (!role)         { setError('Please select your role.'); return }

    setLoading(true)
    try {
      const user = await login({ phone: phone.trim(), role })
      navigate(ROLE_HOME[user.role], { replace: true })
    } catch (err) {
      setError(err.message || 'Sign in failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <div className="border-b border-stone/15 bg-cream px-4 sm:px-6 h-14 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-forest font-semibold text-sm"
        >
          <Sprout size={18} strokeWidth={2} className="text-sage" />
          FarmDirect
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-ink tracking-tight">Sign in</h1>
            <p className="text-sm text-stone mt-1">
              Don't have an account?{' '}
              <Link to="/signup" className="text-sage font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Phone */}
            <Input
              id="signin-phone"
              label="Phone number"
              type="tel"
              inputMode="numeric"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              required
            />

            {/* Role selection */}
            <fieldset>
              <legend className="input-label mb-2">I am signing in as</legend>
              <div className="flex flex-col gap-2" role="radiogroup" aria-label="Role">
                {SIGN_IN_ROLES.map((r) => (
                  <RoleCard
                    key={r.value}
                    value={r.value}
                    label={r.label}
                    description={r.description}
                    icon={r.icon}
                    selected={role === r.value}
                    onSelect={setRole}
                  />
                ))}
              </div>
            </fieldset>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3"
              disabled={loading}
              id="signin-submit"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Demo hint */}
          <p className="text-xs text-stone/60 mt-6 text-center leading-relaxed">
            Demo build: use a phone number from the sample data
            (e.g. 9876543210 as Farmer, 9876543212 as Individual buyer,
            9876543213 as Enterprise buyer).
          </p>
        </div>
      </div>
    </div>
  )
}
