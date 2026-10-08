import BookingSummary from '../components/BookingSummary'
import PassengerForm from '../components/PassengerForm'
export default function BookingPage({ trip, seats, processing, onSubmit }) {
  return (
    <section className="mx-auto grid max-w-4xl gap-5 px-5 py-10 md:grid-cols-[1fr_330px]">
      <PassengerForm onSubmit={onSubmit} processing={processing} />
      <BookingSummary trip={trip} seats={seats} showButton={false} />
    </section>
  )
}
