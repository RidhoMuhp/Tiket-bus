import { demoTrips } from '../data/demoTrips'
import { isSupabaseConfigured, supabase } from './supabase'

// Mengikuti alamat API dari .env; fallback dipakai bila variabel belum diatur.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'
const adminNumber = import.meta.env.VITE_WHATSAPP_ADMIN_NUMBER || '6285179557691'

function createBookingCode() {
  return `BTR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

function createWhatsAppUrl(payload, code) {
  const message = [
    '*PESANAN BUSTARA*',
    '',
    `Kode: *${code}*`,
    `Penumpang: ${payload.passenger}`,
    `Rute: ${payload.route}`,
    `Tanggal: ${payload.date}`,
    `Kursi: ${payload.seats.join(', ')}`,
    `Total: Rp${payload.total.toLocaleString('id-ID')}`,
  ].join('\n')

  return `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`
}

// Satu pintu request agar penanganan respons API konsisten.
async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  if (!response.ok) throw new Error('Permintaan API gagal')
  return response.json()
}
function createDemoBooking(payload) {
  const code = createBookingCode()

  return {
    id: `demo-${Date.now()}`,
    code,
    whatsappUrl: createWhatsAppUrl(payload, code),
  }
}

function mapTrip(trip) {
  return {
    id: trip.id,
    operator: trip.operator,
    type: trip.type,
    from: trip.from_city,
    to: trip.to_city,
    depart: trip.depart.slice(0, 5),
    arrive: trip.arrive.slice(0, 5),
    duration: trip.duration,
    price: trip.price,
    rating: String(trip.rating),
    amenities: trip.amenities,
  }
}

export async function getTrips() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('trips')
      .select(
        'id, operator, type, from_city, to_city, depart, arrive, duration, price, rating, amenities',
      )
      .order('id')
    if (error) throw error
    return data.map(mapTrip)
  }

  if (isDemoMode) return demoTrips

  try {
    return await request('/trips')
  } catch {
    return demoTrips
  }
}

export async function createBooking(payload) {
  if (isSupabaseConfigured) {
    const code = createBookingCode()
    const { error } = await supabase.from('bookings').insert({
      code,
      route: payload.route,
      passenger: payload.passenger,
      email: payload.email,
      phone: payload.phone,
      seats: payload.seats,
      travel_date: payload.date,
      total: payload.total,
    })
    if (error) throw error
    return { id: code, code, whatsappUrl: createWhatsAppUrl(payload, code) }
  }

  if (isDemoMode) return createDemoBooking(payload)

  try {
    return await request('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return createDemoBooking(payload)
  }
}
