import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, AlertCircle } from 'lucide-react'
import { useAuth, ROLES, ROLE_HOME } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import RoleCard from '../../components/RoleCard'

// Role options — user-facing labels map to exact api-contract.md values.
// "value" must always be the exact contract string. Do NOT rename.
const SIGNUP_ROLES = [
  {
    value: ROLES.FARMER,            // "farmer"
    label: "I'm a farmer",
    description: 'List your produce, set prices, and receive orders directly from buyers.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    value: ROLES.BUYER_INDIVIDUAL,  // "buyer_individual"
    label: 'Buying for myself',
    description: 'Order fresh produce in small quantities for home use, with pickup or delivery.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    value: ROLES.BUYER_ENTERPRISE,  // "buyer_enterprise"
    label: 'Buying for a business',
    description: 'Source produce in bulk for hotels, restaurants, caterers, or kirana stores.',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
]

export default function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name:          '',
    phone:         '',
    zone:          'Zone A',
    role:          '',
    business_name: '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const isEnterprise = form.role === ROLES.BUYER_ENTERPRISE

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function setRole(value) {
    setForm((f) => ({
      ...f,
      role: value,
      // Clear business_name when switching away from enterprise
      business_name: value === ROLES.BUYER_ENTERPRISE ? f.business_name : '',
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim())  { setError('Please enter your name.'); return }
    if (!form.phone.trim()) { setError('Please enter your phone number.'); return }
    if (!form.role)         { setError('Please select a role.'); return }
    if (isEnterprise && !form.business_name.trim()) {
      setError('Please enter your business name.')
      return
    }

    setLoading(true)
    try {
      const user = await signup({
        name:          form.name.trim(),
        phone:         form.phone.trim(),
        role:          form.role,               // exact contract value always
        business_name: isEnterprise ? form.business_name.trim() : null,
        zone:          form.zone,
      })
      navigate(ROLE_HOME[user.role], { replace: true })
    } catch (err) {
      setError(err.message || 'Sign up failed.')
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
            <h1 className="text-2xl font-semibold text-ink tracking-tight">Create an account</h1>
            <p className="text-sm text-stone mt-1">
              Already have one?{' '}
              <Link to="/signin" className="text-sage font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Role selection — first so the form structure makes sense */}
            <fieldset>
              <legend className="input-label mb-2">I am joining as</legend>
              <div
                className="flex flex-col gap-2"
                role="radiogroup"
                aria-label="Account type"
              >
                {SIGNUP_ROLES.map((r) => (
                  <RoleCard
                    key={r.value}
                    value={r.value}
                    label={r.label}
                    description={r.description}
                    icon={r.icon}
                    selected={form.role === r.value}
                    onSelect={setRole}
                  />
                ))}
              </div>
            </fieldset>

            {/* Business name — only shown and required for enterprise */}
            {isEnterprise && (
              <Input
                id="signup-business-name"
                label="Business name"
                type="text"
                placeholder="e.g. Hotel Sagar"
                value={form.business_name}
                onChange={set('business_name')}
                autoComplete="organization"
                required
              />
            )}

            {/* Name */}
            <Input
              id="signup-name"
              label={isEnterprise ? 'Your name (contact person)' : 'Your name'}
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
              required
            />

            {/* Phone */}
            <Input
              id="signup-phone"
              label="Phone number"
              type="tel"
              inputMode="numeric"
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={set('phone')}
              autoComplete="tel"
              required
            />

            {/* Zone */}
            <div className="input-group">
              <label htmlFor="signup-zone" className="input-label">Zone</label>
              <select
                id="signup-zone"
                className="input-field"
                value={form.zone}
                onChange={set('zone')}
              >
                <option value="Zone A">Zone A</option>
                <option value="Zone B">Zone B</option>
                <option value="Zone C">Zone C</option>
              </select>
            </div>

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
              id="signup-submit"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
