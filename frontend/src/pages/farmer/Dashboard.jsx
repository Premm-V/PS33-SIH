import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { Sprout } from 'lucide-react'

export default function FarmerDashboard() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center">
            <Sprout size={20} className="text-white" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-ink">Farmer Dashboard</h1>
            <p className="text-xs text-stone">Welcome back, {user?.name}</p>
          </div>
        </div>

        <div className="card-padded border border-stone/15 text-center py-12">
          <p className="text-stone text-sm">
            Dashboard — listings, incoming orders, and create listing will appear here.
          </p>
          <p className="text-xs text-stone/60 mt-1">Coming in Phase 2 of the build.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
