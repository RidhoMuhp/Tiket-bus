// Mengikuti alamat API dari .env; fallback dipakai bila variabel belum diatur.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Satu pintu request agar penanganan respons API konsisten.
async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  if (!response.ok) throw new Error('Permintaan API gagal')
  return response.json()
}
export const getTrips = () => request('/trips')
export const createBooking = (payload) =>
  request('/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
