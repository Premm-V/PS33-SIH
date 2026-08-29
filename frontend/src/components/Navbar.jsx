import { Link, useNavigate } from 'react-router-dom'
import { useAuth, ROLE_HOME } from '../context/AuthContext'
import { Sprout, Menu, X } from 'lucide-react'
import { useState } from 'react'

// Role display labels for the nav identity pill
const ROLE_LABEL = {
  farmer:           'Farmer',
  buyer_individual: 'Individual buyer',
  buyer_enterprise: 'Enterprise',
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  const dashboardHref = user ? ROLE_HOME[user.role] : null
  const displayName = user?.role === 'buyer_enterprise' && user.business_name
    ? user.business_name
    : user?.name

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-stone/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-forest font-semibold text-base tracking-tight"
          aria-label="FarmDirect home"
        >
          <Sprout size={20} strokeWidth={2} className="text-sage" />
          FarmDirect
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {user ? (
            <>
              {/* Identity pill */}
              <span className="text-xs text-stone border border-stone/20 rounded-full px-3 py-1">
                {displayName}
                <span className="ml-1.5 text-sage font-medium">·</span>
                <span className="ml-1 text-sage font-medium">{ROLE_LABEL[user.role]}</span>
              </span>
              {dashboardHref && (
                <Link to={dashboardHref} className="btn-ghost text-xs">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn-ghost text-xs text-stone"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-ghost text-xs">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-xs px-4 py-2">
                Get started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden p-2 text-ink rounded-lg hover:bg-stone/10"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-stone/15 bg-cream px-4 pb-4 pt-3 flex flex-col gap-2">
          {user ? (
            <>
              <p className="text-xs text-stone py-1">
                {displayName} · <span className="text-sage">{ROLE_LABEL[user.role]}</span>
              </p>
              {dashboardHref && (
                <Link
                  to={dashboardHref}
                  className="btn-ghost justify-start text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="btn-ghost justify-start text-sm text-stone"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="btn-ghost justify-start text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="btn-primary justify-start text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
