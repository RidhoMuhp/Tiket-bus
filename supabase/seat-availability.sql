-- Jalankan file ini SEKALI di SQL Editor bila schema.sql sudah pernah dijalankan.
-- File ini menambah kursi per perjalanan/tanggal tanpa menghapus booking yang ada.

alter table public.bookings
  add column if not exists trip_id bigint references public.trips(id);

create table if not exists public.booking_seats (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  trip_id bigint not null references public.trips(id),
  travel_date date not null,
  seat_number text not null check (seat_number = any (array[
    'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'
  ])),
  created_at timestamptz not null default now(),
  primary key (trip_id, travel_date, seat_number)
);

create index if not exists booking_seats_booking_id_idx on public.booking_seats (booking_id);
alter table public.booking_seats enable row level security;

revoke all on table public.bookings from anon, authenticated;
drop policy if exists "Pengunjung dapat membuat booking" on public.bookings;

revoke all on table public.booking_seats from anon, authenticated;
grant select on table public.booking_seats to anon, authenticated;
drop policy if exists "Status kursi dapat dibaca publik" on public.booking_seats;
create policy "Status kursi dapat dibaca publik"
on public.booking_seats for select
to anon, authenticated
using (true);

create or replace function public.create_booking(
  p_code text,
  p_trip_id bigint,
  p_passenger text,
  p_email text,
  p_phone text,
  p_seats text[],
  p_travel_date date
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_booking_id uuid;
  v_route text;
  v_total integer;
  v_seat text;
begin
  if p_travel_date < current_date - 1
    or cardinality(p_seats) is null
    or cardinality(p_seats) < 1
    or cardinality(p_seats) > 10
    or cardinality(p_seats) <> (select count(distinct seat)::integer from unnest(p_seats) as seat)
  then
    raise exception 'Data kursi atau tanggal tidak valid' using errcode = '22023';
  end if;

  select from_city || ' - ' || to_city, price * cardinality(p_seats)
  into v_route, v_total
  from public.trips
  where id = p_trip_id;

  if v_route is null then
    raise exception 'Perjalanan tidak ditemukan' using errcode = '22023';
  end if;

  insert into public.bookings (code, trip_id, route, passenger, email, phone, seats, travel_date, total)
  values (p_code, p_trip_id, v_route, p_passenger, p_email, p_phone, p_seats, p_travel_date, v_total)
  returning id into v_booking_id;

  foreach v_seat in array p_seats loop
    insert into public.booking_seats (booking_id, trip_id, travel_date, seat_number)
    values (v_booking_id, p_trip_id, p_travel_date, v_seat);
  end loop;

  return v_booking_id;
end;
$$;

revoke execute on function public.create_booking(text, bigint, text, text, text, text[], date) from public;
grant execute on function public.create_booking(text, bigint, text, text, text, text[], date) to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'booking_seats'
  ) then
    alter publication supabase_realtime add table public.booking_seats;
  end if;
end;
$$;
