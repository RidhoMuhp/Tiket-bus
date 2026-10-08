import express from 'express'
import cors from 'cors'
import { PORT, WHATSAPP_ADMIN_NUMBER, databaseConfig } from './config.js'
import { initializeDatabase } from './database.js'
import bookingRoutes from './routes/bookings.js'
import tripRoutes from './routes/trips.js'
const app = express()
app.use(cors())
app.use(express.json())
// Pisahkan endpoint berdasarkan domain agar mudah dikembangkan.
app.use('/api/trips', tripRoutes)
app.use('/api/bookings', bookingRoutes)
await initializeDatabase()

const server = app.listen(PORT, () => {
  console.log('\n=== Bustara API ===')
  console.log(`Alamat      : http://localhost:${PORT}`)
  console.log(`Database    : ${databaseConfig.client}`)
  console.log(`WhatsApp    : ${WHATSAPP_ADMIN_NUMBER}`)
  console.log(`Endpoint    : GET /api/trips, POST /api/bookings\n`)
})

// Hindari stack trace panjang saat port sedang digunakan proses lain.
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} sedang digunakan. Tutup server lama atau gunakan port lain.`)
  } else {
    console.error('API gagal dijalankan:', error.message)
  }
  process.exit(1)
})
