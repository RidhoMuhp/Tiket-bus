import { WHATSAPP_ADMIN_NUMBER } from '../config.js'
const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
export function createAdminWhatsAppUrl(booking) {
  // Susun pesan yang akan diisi otomatis ke chat WhatsApp admin.
  const message = [
    '*PESANAN BARU - BUSTARA*',
    '',
    `Kode: *${booking.code}*`,
    `Penumpang: ${booking.passenger}`,
    `WhatsApp penumpang: ${booking.phone}`,
    `Email: ${booking.email}`,
    `Rute: ${booking.route}`,
    `Tanggal: ${booking.date}`,
    `Kursi: ${booking.seats.join(', ')}`,
    `Total: *${formatRupiah(booking.total)}*`,
  ].join('\n')
  return `https://wa.me/${WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`
}
