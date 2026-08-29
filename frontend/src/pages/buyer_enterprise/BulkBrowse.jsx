import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { Building2 } from 'lucide-react'

export default function BulkBrowse() {
  const { user } = useAuth()
  const displayName = user?.business_name || user?.name

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-lg bg-amber flex items-center justify-center">
            <Building2 size={20} className="text-ink" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-ink">Bulk Browse</h1>
            <p className="text-xs text-stone">{displayName} · Enterprise</p>
          </div>
        </div>

        <div className="card-padded border border-stone/15 text-center py-12">
          <p className="text-stone text-sm">
            Listing cards with number-input quantity controls, "Add to bulk request" buttons,
            and recurring order options will appear here.
          </p>
          <p className="text-xs text-stone/60 mt-1">Coming in Phase 2 of the build.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
