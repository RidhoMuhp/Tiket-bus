const amenitiesByType = {
  'Bus Biasa': ['AC', 'USB', 'Recliner'],
  Sleeper: ['AC', 'WiFi', 'Bed Seat'],
}

function createTrip({ id, from, to, type, basePrice, depart, arrive, duration, rating }) {
  const sleeperExtra = type === 'Sleeper' ? 50000 : 0

  return {
    id,
    operator: type === 'Sleeper' ? 'Bintang Timur' : 'Litha & Co',
    type,
    from,
    to,
    depart,
    arrive,
    duration,
    price: basePrice + sleeperExtra,
    rating,
    amenities: amenitiesByType[type],
  }
}

// Harga dasar adalah tarif Bus Biasa; Sleeper ditambah Rp50.000.
const routes = [
  { from: 'Makassar', to: 'Selayar', basePrice: 250000, duration: '5j 30m' },
  { from: 'Selayar', to: 'Makassar', basePrice: 250000, duration: '5j 30m' },
  { from: 'Makassar', to: 'Toraja', basePrice: 200000, duration: '8j 00m' },
  { from: 'Toraja', to: 'Makassar', basePrice: 200000, duration: '8j 00m' },
  { from: 'Makassar', to: 'Palopo', basePrice: 350000, duration: '9j 15m' },
  { from: 'Palopo', to: 'Makassar', basePrice: 350000, duration: '9j 15m' },
]

const schedules = {
  'Bus Biasa': { depart: '08:00', arrive: '13:30' },
  Sleeper: { depart: '20:00', arrive: '01:30' },
}

export const trips = routes.flatMap((route, index) =>
  ['Bus Biasa', 'Sleeper'].map((type, typeIndex) =>
    createTrip({
      id: index * 2 + typeIndex + 1,
      ...route,
      type,
      ...schedules[type],
      rating: type === 'Sleeper' ? '4.9' : '4.7',
    }),
  ),
)
