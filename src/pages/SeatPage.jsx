import { useEffect, useState } from 'react'
import BookingSummary from '../components/BookingSummary'
import SeatPicker from '../components/SeatPicker'
import { getOccupiedSeats, subscribeToOccupiedSeats } from '../services/api'

export default function SeatPage({ trip, seats, travelDate, onSeatsChange, onContinue, onBack  }) {
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [loadingSeats, setLoadingSeats] = useState(true)

  useEffect(() => {
    let active = true
    setLoadingSeats(true)
    setOccupiedSeats([])

    getOccupiedSeats(trip.id, travelDate)
      .then((reserved) => {
        if (active) setOccupiedSeats(reserved)
      })
      .catch((error) => console.error('Gagal memuat status kursi:', error))
      .finally(() => {
        if (active) setLoadingSeats(false)
      })

    const unsubscribe = subscribeToOccupiedSeats(trip.id, travelDate, (seatNumber) => {
      if (!active) return
      setOccupiedSeats((current) =>
        current.includes(seatNumber) ? current : [...current, seatNumber],
      )
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [trip.id, travelDate])

  useEffect(() => {
    onSeatsChange((current) => current.filter((seat) => !occupiedSeats.includes(seat)))
  }, [occupiedSeats, onSeatsChange])

  return (
    <section className="mx-auto grid max-w-5xl gap-5 px-5 py-10 md:grid-cols-[1fr_330px]">
      <SeatPicker
        selectedSeats={seats}
        occupiedSeats={occupiedSeats}
        loading={loadingSeats}
        onChange={onSeatsChange}
      />
      <BookingSummary trip={trip} seats={seats} onContinue={onContinue} onBack={onBack} backLabel="Kembali ke cari Tiket" />
    </section>
  )
}
