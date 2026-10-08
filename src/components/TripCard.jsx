import { ArrowRight, Bus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatRupiah } from '../utils/formatters'
export default function TripCard({ trip, onSelect }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="card flex flex-col gap-5 p-5 md:flex-row md:items-center"
    >
      <div className="min-w-[150px]">
        <div className="mb-1 flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint">
            <Bus size={17} />
          </span>
          {trip.operator}
        </div>
        <p className="pl-10 text-xs text-slate-400">{trip.type}</p>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <strong className="text-lg">{trip.depart}</strong>
          <p className="text-xs text-slate-400">{trip.from}</p>
        </div>
        <div className="mx-3 flex flex-1 flex-col items-center">
          <span className="text-xs text-slate-400">{trip.duration}</span>
          <span className="relative my-2 h-px w-full bg-slate-200">
            <i className="absolute -top-1 right-0 h-2.5 w-2.5 rounded-full border-2 border-coral bg-white" />
          </span>
          <span className="text-[10px] font-bold text-emerald-600">Langsung</span>
        </div>
        <div className="text-right">
          <strong className="text-lg">{trip.arrive}</strong>
          <p className="text-xs text-slate-400">{trip.to}</p>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 md:min-w-[190px] md:border-l md:border-t-0 md:pl-5 md:pt-0">
        <div className="mb-2 flex items-center gap-1 text-xs text-amber-500">
          <Star size={13} fill="currentColor" /> {trip.rating}{' '}
          <span className="ml-1 text-slate-400">{trip.amenities.join(' · ')}</span>
        </div>
        <div className="flex items-center justify-between">
          <strong>{formatRupiah(trip.price)}</strong>
          <button
            onClick={() => onSelect(trip)}
            className="rounded-xl bg-ink px-3 py-2 text-xs font-bold text-white"
          >
            Pilih
          </button>
        </div>
      </div>
    </motion.article>
  )
}
