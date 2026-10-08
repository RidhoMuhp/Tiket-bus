import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
const fields = [
  { key: 'name', label: 'Nama lengkap', placeholder: 'Contoh: Aulia Pratama' },
  {
    key: 'email',
    label: 'Alamat email',
    placeholder: 'nama@email.com',
    type: 'email',
  },
  { key: 'phone', label: 'Nomor WhatsApp', placeholder: '08xx xxxx xxxx' },
]
export default function PassengerForm({ onSubmit, processing }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(form)
      }}
      className="card space-y-5 p-6"
    >
      <div>
        <h3 className="font-display text-xl font-bold">Data penumpang</h3>
        <p className="text-sm text-slate-400">Pastikan sesuai kartu identitas.</p>
      </div>
      {fields.map((field) => (
        <label className="block" key={field.key}>
          <span className="mb-2 block text-sm font-bold">{field.label}</span>
          <input
            required
            type={field.type || 'text'}
            value={form[field.key]}
            onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
            placeholder={field.placeholder}
            className="input"
          />
        </label>
      ))}
      <button disabled={processing} className="btn-primary w-full">
        {processing ? (
          'Memproses...'
        ) : (
          <>
            Lanjut ke pembayaran <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  )
}
