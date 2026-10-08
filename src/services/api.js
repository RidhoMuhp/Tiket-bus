import { demoTrips } from '../data/demoTrips'
import { isSupabaseConfigured, supabase } from './supabase'

// Mengikuti alamat API dari .env; fallback dipakai bila variabel belum diatur.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
// Demo hanya diizinkan pada development lokal agar deployment tidak pernah
// menampilkan booking sukses tanpa menyimpannya ke database.
const isDemoMode = import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE === 'true'
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

export async function getOccupiedSeats(tripId, travelDate) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('booking_seats')
      .select('seat_number')
      .eq('trip_id', tripId)
      .eq('travel_date', travelDate)
    if (error) throw error
    return data.map(({ seat_number: seatNumber }) => seatNumber)
  }

  return isDemoMode ? ['A2', 'B4', 'C2', 'D3'] : []
}

export function subscribeToOccupiedSeats(tripId, travelDate, onSeatBooked) {
  if (!isSupabaseConfigured) return () => {}

  const channel = supabase
    .channel(`booking-seats:${tripId}:${travelDate}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'booking_seats',
        filter: `trip_id=eq.${tripId},travel_date=eq.${travelDate}`,
      },
      ({ new: bookingSeat }) => onSeatBooked(bookingSeat.seat_number),
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

export async function createBooking(payload) {
  if (isSupabaseConfigured) {
    const code = createBookingCode()
    const { data: bookingId, error } = await supabase.rpc('create_booking', {
      p_code: code,
      p_trip_id: payload.tripId,
      p_passenger: payload.passenger,
      p_email: payload.email,
      p_phone: payload.phone,
      p_seats: payload.seats,
      p_travel_date: payload.date,
    })
    if (error) throw error
    return { id: bookingId, code, whatsappUrl: createWhatsAppUrl(payload, code) }
  }

  if (isDemoMode) return createDemoBooking(payload)

  throw new Error(
    'Supabase belum terhubung. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY di environment variables Netlify, lalu deploy ulang.',
  )
}
