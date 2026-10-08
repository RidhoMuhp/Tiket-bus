import { ArrowRight, Ticket } from 'lucide-react'
import { formatRupiah } from '../utils/formatters'
export default function BookingSummary({
  trip,
  seats,
  onContinue,
  label = 'Lanjutkan',
  showButton = true,
}) {
  const total = trip.price * seats.length
  return (
    <aside className="card h-fit p-6">
      <div className="mb-5 flex items-center gap-2">
        <Ticket size={18} className="text-coral" />
        <h3 className="font-display text-lg font-bold">Ringkasan pesanan</h3>
      </div>
      <div className="rounded-2xl bg-mint/60 p-4">
        <div className="flex justify-between text-sm font-bold">
          <span>{trip.from}</span>
          <ArrowRight size={17} />
          <span>{trip.to}</span>
        </div>
        <div className="mt-3 flex justify-between text-xs text-slate-500">
          <span>{trip.operator}</span>
          <span>
            {trip.depart} — {trip.arrive}
          </span>
        </div>
      </div>
      <div className="my-5 space-y-3 text-sm">
        <p className="flex justify-between text-slate-500">
          <span>Kursi</span>
          <b className="text-ink">{seats.length ? seats.join(', ') : 'Belum dipilih'}</b>
        </p>
        <p className="flex justify-between text-slate-500">
          <span>
            {seats.length} tiket × {formatRupiah(trip.price)}
          </span>
          <b className="text-ink">{formatRupiah(total)}</b>
        </p>
      </div>
      <div className="border-t border-dashed pt-4">
        <p className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span className="text-lg">{formatRupiah(total)}</span>
        </p>
      </div>
      {showButton && (
        <button
          disabled={!seats.length}
          onClick={onContinue}
          className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {label}
          <ArrowRight size={17} />
        </button>
      )}
    </aside>
  )
}
