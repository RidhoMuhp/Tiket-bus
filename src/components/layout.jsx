import { Bus, Check, UserRound } from 'lucide-react'
const steps = ['Cari Perjalanan', 'Pilih Kursi', 'Detail Penumpang', 'Selesai']
function Stepper({ currentStep }) {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {steps.map((label, index) => (
        <div className="contents" key={label}>
          <div
            className={`flex items-center gap-2 text-xs font-bold ${index <= currentStep ? 'text-ink' : 'text-slate-300'}`}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[10px] ${index < currentStep ? 'bg-ink text-white' : index === currentStep ? 'bg-coral text-white' : 'bg-slate-100'}`}
            >
              {index < currentStep ? <Check size={13} /> : index + 1}
            </span>
            {label}
          </div>
          {index < 3 && <span className="mx-2 h-px w-6 bg-slate-200" />}
        </div>
      ))}
    </div>
  )
}
export function Header({ currentStep }) {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <a href="#" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-mint">
          <Bus size={20} />
        </span>
        bustara.
      </a>
      <Stepper currentStep={currentStep} />
      <button aria-label="Profil" className="rounded-xl border border-slate-200 bg-white p-2.5">
        <UserRound size={18} />
      </button>
    </nav>
  )
}
export function Footer() {
  return (
    <footer className="border-t border-slate-200 px-5 py-8 text-center text-xs text-slate-400">
      © 2026 Bustara · Perjalanan yang lebih baik, dimulai dari sini.
    </footer>
  )
}
