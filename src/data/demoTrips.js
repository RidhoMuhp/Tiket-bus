const amenitiesByType = {
  'Bus Biasa': ['AC', 'USB', 'Recliner'],
  Sleeper: ['AC', 'WiFi', 'Bed Seat'],
}

const routes = [
  { from: 'Makassar', to: 'Selayar', price: 250000, duration: '5j 30m' },
  { from: 'Selayar', to: 'Makassar', price: 250000, duration: '5j 30m' },
  { from: 'Makassar', to: 'Toraja', price: 200000, duration: '8j 00m' },
  { from: 'Toraja', to: 'Makassar', price: 200000, duration: '8j 00m' },
  { from: 'Makassar', to: 'Palopo', price: 350000, duration: '9j 15m' },
  { from: 'Palopo', to: 'Makassar', price: 350000, duration: '9j 15m' },
]

// Data lokal agar frontend tetap dapat didemokan tanpa API atau database.
export const demoTrips = routes.flatMap((route, routeIndex) =>
  ['Bus Biasa', 'Sleeper'].map((type, typeIndex) => ({
    id: routeIndex * 2 + typeIndex + 1,
    operator: type === 'Sleeper' ? 'Aneka Sleeper' : 'Sejahtera Bus',
    type,
    ...route,
    price: route.price + (type === 'Sleeper' ? 50000 : 0),
    depart: type === 'Sleeper' ? '20:00' : '08:00',
    arrive: type === 'Sleeper' ? '01:30' : '13:30',
    rating: type === 'Sleeper' ? '4.9' : '4.7',
    amenities: amenitiesByType[type],
  })),
)
