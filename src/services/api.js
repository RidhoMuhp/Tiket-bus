import { demoTrips } from '../data/demoTrips'

// Mengikuti alamat API dari .env; fallback dipakai bila variabel belum diatur.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'
const adminNumber = import.meta.env.VITE_WHATSAPP_ADMIN_NUMBER || '6285179557691'

// Satu pintu request agar penanganan respons API konsisten.
async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  if (!response.ok) throw new Error('Permintaan API gagal')
  return response.json()
}
function createDemoBooking(payload) {
  const code = `BTR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const message = [
    '*PESANAN DEMO - BUSTARA*',
    '',
    `Kode: *${code}*`,
    `Penumpang: ${payload.passenger}`,
    `Rute: ${payload.route}`,
    `Tanggal: ${payload.date}`,
    `Kursi: ${payload.seats.join(', ')}`,
    `Total: Rp${payload.total.toLocaleString('id-ID')}`,
  ].join('\n')

  return {
    id: `demo-${Date.now()}`,
    code,
    whatsappUrl: `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`,
  }
}

export async function getTrips() {
  if (isDemoMode) return demoTrips

  try {
    return await request('/trips')
  } catch {
    return demoTrips
  }
}

export async function createBooking(payload) {
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
