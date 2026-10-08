import { motion } from 'framer-motion'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
export default function SuccessPage({ trip, seats, booking, onReset }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg px-5 py-16 text-center"
    >
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-mint text-emerald-600">
        <Check size={38} />
      </div>
      <p className="font-bold text-coral">PEMESANAN BERHASIL</p>
      <h1 className="mt-2 font-display text-4xl font-bold">Tiketmu sudah siap!</h1>
      <p className="mt-3 text-slate-500">
        Notifikasi detail booking telah disiapkan untuk WhatsApp admin. Simpan kode booking ini
        untuk check-in.
      </p>
      <div className="my-8 rounded-3xl bg-ink p-6 text-white">
        <p className="text-xs text-slate-400">KODE BOOKING</p>
        <strong className="font-display text-3xl tracking-[.18em]">{booking?.code}</strong>
        <div className="mt-5 flex justify-between border-t border-white/15 pt-4 text-sm">
          <span>
            {trip?.from} → {trip?.to}
          </span>
          <span>{seats.join(', ')}</span>
        </div>
      </div>
      {booking?.whatsappUrl && (
        <a
          href={booking.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700"
        >
          <MessageCircle size={17} />
          Kirim detail ke WhatsApp admin
        </a>
      )}
      <button onClick={onReset} className="btn-primary mx-auto">
        Pesan perjalanan lain <ArrowUpRight size={17} />
      </button>
    </motion.section>
  )
}
