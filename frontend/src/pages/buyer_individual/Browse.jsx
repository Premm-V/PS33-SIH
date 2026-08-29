import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { ShoppingBasket } from 'lucide-react'

export default function Browse() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
            <ShoppingBasket size={20} className="text-white" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-ink">Browse Produce</h1>
            <p className="text-xs text-stone">Hello, {user?.name}</p>
          </div>
        </div>

        <div className="card-padded border border-stone/15 text-center py-12">
          <p className="text-stone text-sm">
            Listing cards with stepper quantity controls and Order now buttons will appear here.
          </p>
          <p className="text-xs text-stone/60 mt-1">Coming in Phase 2 of the build.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
