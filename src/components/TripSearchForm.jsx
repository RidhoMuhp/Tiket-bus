import { ArrowRightLeft, CalendarDays, ChevronDown, MapPin, MapPinned, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const cityDetails = {
  Makassar: 'Gerbang Sulawesi Selatan',
  Selayar: 'Kepulauan Selayar',
  Toraja: 'Rantepao dan sekitarnya',
  Palopo: 'Kota Idaman',
}

function LocationSelect({ label, value, cities, onChange, tone, Icon }) {
  return (
    <label className={`route-field route-field-${tone}`}>
      <span className="route-field-label">
        <Icon size={15} />
        {label}
      </span>
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <small>{cityDetails[value]}</small>
      <ChevronDown
        className="pointer-events-none absolute bottom-7 right-3 text-slate-400"
        size={16}
      />
    </label>
  )
}

export default function TripSearchForm({ cities, onSearch }) {
  const [from, setFrom] = useState('Makassar')
  const [to, setTo] = useState('Selayar')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const availableCities = cities.length ? cities : Object.keys(cityDetails)

  function swapLocations() {
    setFrom(to)
    setTo(from)
  }

  function submitSearch(event) {
    event.preventDefault()
    onSearch({ from, to, date })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submitSearch}
      className="mx-auto grid max-w-5xl gap-3 rounded-3xl bg-white p-3 shadow-soft md:grid-cols-[1fr_44px_1fr_1fr_auto] md:items-center"
    >
      <LocationSelect
        label="Berangkat dari"
        value={from}
        cities={availableCities.filter((city) => city !== to)}
        onChange={setFrom}
        tone="origin"
        Icon={MapPin}
      />
      <button
        type="button"
        onClick={swapLocations}
        aria-label="Tukar kota asal dan tujuan"
        className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-emerald-100 bg-mint text-ink shadow-sm transition hover:rotate-180 hover:scale-105"
      >
        <ArrowRightLeft size={16} />
      </button>
      <LocationSelect
        label="Tujuan"
        value={to}
        cities={availableCities.filter((city) => city !== from)}
        onChange={setTo}
        tone="destination"
        Icon={MapPinned}
      />
      <label className="field date-field">
        <span>
          <CalendarDays size={15} />
          Tanggal perjalanan
        </span>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <button className="btn-primary h-full min-h-[76px] px-7">
        <Search size={18} />
        Cari Tiket
      </button>
    </motion.form>
  )
}
