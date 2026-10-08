import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import TripCard from '../components/TripCard'
import TripSearchForm from '../components/TripSearchForm'
export default function HomePage({ trips, onSelectTrip, onSearch }) {
  const [filters, setFilters] = useState({ from: 'Makassar', to: 'Selayar' })
  const cities = useMemo(() => [...new Set(trips.flatMap((trip) => [trip.from, trip.to]))], [trips])
  const filteredTrips = trips.filter((trip) => trip.from === filters.from && trip.to === filters.to)
  function handleSearch(search) {
    setFilters(search)
    onSearch(search.date)
    document.querySelector('#trips').scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <section className="hero px-5 pb-12 pt-14 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-bold"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Perjalanan nyaman dimulai di sini
        </motion.p>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
          Ke mana pun tujuannya,
          <br />
          <span className="text-coral">kami antarkan.</span>
        </h1>
        <p className="mx-auto my-5 max-w-md text-slate-500">
          Temukan perjalanan bus yang pas, pilih kursimu, dan nikmati perjalanan tanpa ribet.
        </p>
        <TripSearchForm cities={cities} onSearch={handleSearch} />
      </section>
      <section id="trips" className="mx-auto max-w-5xl px-5 pb-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold text-coral">
              {filters.from.toUpperCase()} → {filters.to.toUpperCase()}
            </p>
            <h2 className="font-display text-2xl font-bold">Rute perjalanan tersedia</h2>
          </div>
          <button className="text-sm font-bold underline">Filter perjalanan</button>
        </div>
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onSelect={onSelectTrip} />
          ))}
        </div>
      </section>
    </>
  )
}
