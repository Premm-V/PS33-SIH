import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-stone/15 bg-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-forest font-semibold text-sm"
          >
            <Sprout size={16} strokeWidth={2} className="text-sage" />
            FarmDirect
          </Link>
          <p className="text-xs text-stone max-w-xs">
            Fresh produce listed directly by farmers.
            No middlemen. Honest prices.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs text-stone" aria-label="Footer navigation">
          <Link to="/signup" className="hover:text-ink transition-colors">
            Start as a farmer
          </Link>
          <Link to="/signup" className="hover:text-ink transition-colors">
            Buy produce
          </Link>
          <Link to="/signup" className="hover:text-ink transition-colors">
            Enterprise sourcing
          </Link>
        </nav>
      </div>

      <div className="border-t border-stone/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <p className="text-xs text-stone/60">
            Demo build — data shown is sample data, not real transactions.
          </p>
        </div>
      </div>
    </footer>
  )
}
