import BookingSummary from '../components/BookingSummary'
import SeatPicker from '../components/SeatPicker'
export default function SeatPage({ trip, seats, onSeatsChange, onContinue }) {
  return (
    <section className="mx-auto grid max-w-5xl gap-5 px-5 py-10 md:grid-cols-[1fr_330px]">
      <SeatPicker selectedSeats={seats} onChange={onSeatsChange} />
      <BookingSummary trip={trip} seats={seats} onContinue={onContinue} />
    </section>
  )
}
