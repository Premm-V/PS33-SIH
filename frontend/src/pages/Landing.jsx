import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sprout,
  ShoppingBasket,
  Building2,
  ArrowRight,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroImg from '../assets/hero_produce.png'

// ─── Fade-up animation preset ─────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

// ─── Step data for "How it works" ─────────────────────────────
const steps = [
  {
    number: '01',
    heading: 'Farmers list produce',
    body: 'A farmer sets crop name, quantity, price per kg, and harvest date. The listing is live immediately and visible to all buyers in the zone.',
  },
  {
    number: '02',
    heading: 'Buyers place orders',
    body: 'Individual buyers pick a quantity and choose pickup or pooled delivery. Enterprise buyers can submit a bulk request that the platform fulfills across multiple listings.',
  },
  {
    number: '03',
    heading: 'Fulfillment',
    body: 'Orders are confirmed and grouped by zone. Enterprise buyers can mark an order as recurring (weekly or monthly) so replenishment happens without repeat effort.',
  },
]

// ─── Role data ────────────────────────────────────────────────
const roles = [
  {
    icon: Sprout,
    title: 'Farmer',
    subtitle: 'List and sell directly',
    points: [
      'Create listings with crop, quantity, and price',
      'See incoming orders tagged Individual or Bulk',
      'No intermediaries setting your price',
    ],
    cta: 'Start listing',
    href: '/signup',
    accent: 'bg-forest/8 border-forest/20',
    iconBg: 'bg-forest text-white',
  },
  {
    icon: ShoppingBasket,
    title: 'Individual buyer',
    subtitle: 'Fresh produce in small quantities',
    points: [
      'Browse available listings in your zone',
      'Order from 1 kg upward, choose pickup or delivery',
      'Track your order from placed to completed',
    ],
    cta: 'Browse produce',
    href: '/signup',
    accent: 'bg-sage/8 border-sage/20',
    iconBg: 'bg-sage text-white',
  },
  {
    icon: Building2,
    title: 'Enterprise buyer',
    subtitle: 'Bulk sourcing for hotels, restaurants & stores',
    points: [
      'Submit a single bulk request — the platform matches it across farmers',
      'Set recurring orders (weekly / monthly) to automate replenishment',
      'View itemised invoice-style order history',
    ],
    cta: 'Source in bulk',
    href: '/signup',
    accent: 'bg-amber/10 border-amber/30',
    iconBg: 'bg-amber text-ink',
  },
]

// ─── Enterprise scenario (sourced from db.json, presented as demo data) ──
const enterpriseScenario = {
  crop: 'Tomato',
  needed: 100,
  fulfilled: 100,
  listings: [
    { farmer: 'Ramesh Patil', zone: 'Zone A', qty: 50, price: 20 },
    { farmer: 'Suresh Kumar', zone: 'Zone A', qty: 50, price: 19 },
  ],
  buyer: 'Hotel Sagar',
  recurring: 'weekly',
}

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-forest">
          {/* Hero image as a background panel */}
          <div className="absolute inset-0 opacity-30">
            <img
              src={heroImg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <p className="section-label text-sage/80 mb-4">
                Farmer marketplace
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight text-balance">
                Fresh produce,<br />direct from the farm.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed text-balance">
                Farmers list produce directly. Individual buyers order small quantities.
                Businesses source in bulk — from one or multiple farmers — in a single request.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup" className="btn-amber px-6 py-3 text-sm font-semibold">
                  Get started
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all duration-150 hover:bg-white/10 active:scale-95"
                >
                  Sign in
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Three roles ──────────────────────────────────────── */}
        <section aria-labelledby="roles-heading" className="py-16 sm:py-20 bg-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="section-label mb-2">Who this is for</p>
              <h2 id="roles-heading" className="section-heading max-w-lg text-balance">
                Three roles. One marketplace.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <motion.article
                  key={role.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4 }}
                  className={`card border-2 ${role.accent} p-6 flex flex-col`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.iconBg} mb-4`}>
                    <role.icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="font-semibold text-base text-ink">{role.title}</h3>
                  <p className="text-xs text-stone mt-0.5 mb-4">{role.subtitle}</p>
                  <ul className="flex flex-col gap-2 flex-1">
                    {role.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-stone leading-relaxed">
                        <CheckCircle2 size={14} className="text-sage mt-0.5 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={role.href}
                    className="btn-secondary mt-5 text-xs w-full justify-center"
                  >
                    {role.cta}
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section aria-labelledby="how-heading" className="py-16 sm:py-20 bg-surface border-t border-stone/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="section-label mb-2">Process</p>
              <h2 id="how-heading" className="section-heading max-w-lg text-balance">
                How a transaction works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <span className="text-4xl font-bold text-stone/20 leading-none">
                    {step.number}
                  </span>
                  <h3 className="font-semibold text-sm text-ink">{step.heading}</h3>
                  <p className="text-xs text-stone leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Enterprise bulk fulfillment ───────────────────────── */}
        <section aria-labelledby="enterprise-heading" className="py-16 sm:py-20 bg-cream border-t border-stone/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <p className="section-label mb-2">Enterprise buying</p>
              <h2 id="enterprise-heading" className="section-heading max-w-xl text-balance">
                One request, fulfilled across multiple farmers
              </h2>
              <p className="text-sm text-stone mt-2 max-w-xl">
                Enterprise buyers can specify a total quantity. The platform identifies
                listings from different farmers to cover the full amount — shown below
                using sample data from the demo.
              </p>
            </div>

            {/* Demo scenario card */}
            <div className="card border border-amber/20 p-6 max-w-2xl">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="badge-enterprise mb-1">Enterprise · {enterpriseScenario.buyer}</span>
                  <h3 className="font-semibold text-ink mt-1">
                    Bulk request — {enterpriseScenario.crop}
                  </h3>
                  <p className="text-xs text-stone mt-0.5">
                    Recurring · {enterpriseScenario.recurring}
                  </p>
                </div>
                <span className="badge bg-sage/15 text-sage text-xs font-semibold px-3 py-1">
                  Fulfilled
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-stone mb-1.5">
                  <span>Quantity fulfilled</span>
                  <span className="font-medium text-ink">
                    {enterpriseScenario.fulfilled} / {enterpriseScenario.needed} kg
                  </span>
                </div>
                <div className="h-2 bg-stone/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage rounded-full"
                    style={{ width: `${(enterpriseScenario.fulfilled / enterpriseScenario.needed) * 100}%` }}
                  />
                </div>
              </div>

              {/* Matched listings */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={13} className="text-stone" />
                  <span className="text-xs font-medium text-stone uppercase tracking-wide">
                    Matched from {enterpriseScenario.listings.length} farmers
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {enterpriseScenario.listings.map((l) => (
                    <div
                      key={l.farmer}
                      className="flex items-center justify-between bg-cream rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-ink">{l.farmer}</p>
                        <p className="text-xs text-stone">{l.zone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-ink">{l.qty} kg</p>
                        <p className="text-xs text-stone">₹{l.price}/kg</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone/60 mt-3 italic">
                  Sample data — not a real transaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-forest border-t border-forest">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight text-balance mb-3">
              Ready to start?
            </h2>
            <p className="text-sm text-white/60 mb-7 max-w-md mx-auto">
              Create an account as a farmer, individual buyer, or enterprise buyer.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup" className="btn-amber px-6 py-3 text-sm font-semibold">
                Create an account
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all duration-150 hover:bg-white/10 active:scale-95"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
