import { useEffect, useState } from 'react'
import { Footer, Header } from './components/layout'
import { BookingPage, HomePage, SeatPage, SuccessPage } from './pages'
import { createBooking, getTrips } from './services/api'
export default function App() {
  // State pusat untuk menjaga data antar langkah pemesanan.
  const [step, setStep] = useState(0),
    [trips, setTrips] = useState([]),
    [trip, setTrip] = useState(null),
    [seats, setSeats] = useState([]),
    [booking, setBooking] = useState(null),
    [travelDate, setTravelDate] = useState(() => new Date().toISOString().slice(0, 10)),
    [processing, setProcessing] = useState(false)
  useEffect(() => {
    // Ambil daftar perjalanan saat aplikasi pertama kali dibuka.
    getTrips().then(setTrips).catch(console.error)
  }, [])
  const selectTrip = (selected) => {
    // Simpan perjalanan lalu pindah ke pemilihan kursi.
    setTrip(selected)
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const submitBooking = async (passenger) => {
    // Kunci tombol selama request agar pesanan tidak terkirim dua kali.
    setProcessing(true)
    try {
      const saved = await createBooking({
        route: `${trip.from} - ${trip.to}`,
        passenger: passenger.name,
        email: passenger.email,
        phone: passenger.phone,
        seats,
        date: travelDate,
        total: trip.price * seats.length,
      })
      setBooking(saved)
      setStep(3)
    } catch (error) {
      alert('Pesanan belum dapat dibuat. Silakan coba lagi.')
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }
  const resetBooking = () => {
    // Bersihkan seluruh data untuk memulai pemesanan baru.
    setStep(0)
    setTrip(null)
    setSeats([])
    setBooking(null)
  }
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header currentStep={step} />
      <main>
        {step === 0 && (
          <HomePage trips={trips} onSelectTrip={selectTrip} onSearch={setTravelDate} />
        )}
        {step === 1 && (
          <SeatPage
            trip={trip}
            seats={seats}
            onSeatsChange={setSeats}
            onContinue={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <BookingPage trip={trip} seats={seats} processing={processing} onSubmit={submitBooking} />
        )}
        {step === 3 && (
          <SuccessPage trip={trip} seats={seats} booking={booking} onReset={resetBooking} />
        )}
      </main>
      <Footer />
    </div>
  )
}
