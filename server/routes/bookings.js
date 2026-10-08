import { Router } from 'express'
import { saveBooking } from '../database.js'
import { createAdminWhatsAppUrl } from '../utils/whatsapp.js'
const router = Router()
router.post('/', async (req, res) => {
  const { route, passenger, email, phone, seats, date, total } = req.body
  // Hentikan request jika informasi penting belum dikirim frontend.
  if (
    !route ||
    !passenger ||
    !email ||
    !phone ||
    !Array.isArray(seats) ||
    !seats.length ||
    !date ||
    !total
  )
    return res.status(400).json({ message: 'Data booking belum lengkap.' })
  const code = `BTR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const booking = { code, route, passenger, email, phone, seats, date, total }
  try {
    // Array kursi disimpan sebagai JSON agar tetap mudah dibaca kembali.
    const id = await saveBooking(booking)
    res.status(201).json({
      id,
      code,
      // Frontend memakai URL ini untuk membuka chat admin dengan pesan siap kirim.
      whatsappUrl: createAdminWhatsAppUrl(booking),
    })
  } catch (error) {
    console.error('Gagal menyimpan booking:', error.message)
    res.status(500).json({ message: 'Booking gagal disimpan.' })
  }
})
export default router
