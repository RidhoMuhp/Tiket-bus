import { Bus } from 'lucide-react'
const seats = [
  'A1',
  'A2',
  'A3',
  'A4',
  'B1',
  'B2',
  'B3',
  'B4',
  'C1',
  'C2',
  'C3',
  'C4',
  'D1',
  'D2',
  'D3',
  'D4',
]
export default function SeatPicker({ selectedSeats, occupiedSeats, loading, onChange }) {
  const toggle = (seat) => {
    // Kursi yang sudah terisi tidak dapat diubah pengguna.
    if (!occupiedSeats.includes(seat))
      onChange(
        selectedSeats.includes(seat)
          ? selectedSeats.filter((item) => item !== seat)
          : [...selectedSeats, seat],
      )
  }
  return (
    <div className="card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold">Pilih tempat duduk</h3>
          <p className="text-sm text-slate-400">Kursi yang nyaman untuk perjalananmu.</p>
        </div>
        <div className="flex gap-3 text-[11px]">
          <i className="legend bg-mint" />
          Tersedia <i className="legend bg-coral" />
          Dipilih
        </div>
      </div>
      <div className="mx-auto max-w-xs rounded-[32px] border-2 border-slate-100 bg-slate-50 p-5">
        <div className="mb-5 flex justify-between text-slate-300">
          <Bus size={19} />
          <span className="text-xs font-bold">PINTU</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {seats.map((seat, index) => (
            <div className="contents" key={seat}>
              {index % 4 === 2 && <span />}
              <button
                disabled={loading || occupiedSeats.includes(seat)}
                onClick={() => toggle(seat)}
                className={`seat ${occupiedSeats.includes(seat) ? 'taken' : selectedSeats.includes(seat) ? 'selected' : ''}`}
              >
                {seat}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
