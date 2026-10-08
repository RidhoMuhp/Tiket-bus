-- Jalankan setelah schema.sql untuk memastikan tabel, RLS, dan data awal tersedia.

select id, from_city, to_city, type, price
from public.trips
order by id;

select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('trips', 'bookings');

select tablename, policyname, roles, cmd
from pg_policies
where schemaname = 'public'
  and tablename in ('trips', 'bookings', 'booking_seats')
order by tablename, policyname;

select trip_id, travel_date, seat_number
from public.booking_seats
order by travel_date, trip_id, seat_number;
