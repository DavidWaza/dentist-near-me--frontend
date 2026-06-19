-- ============================================================================
-- DentistNearMe — Supabase schema for the appointment-booking system
-- Run this file in the Supabase SQL editor (or `supabase db push`).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Enums
-- ---------------------------------------------------------------------------
create type appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

-- ---------------------------------------------------------------------------
-- 2. Reference tables
-- ---------------------------------------------------------------------------
create table public.locations (
  id         uuid primary key default gen_random_uuid(),
  city       text not null unique,
  address    text not null,
  phone      text,
  created_at timestamptz not null default now()
);

create table public.services (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  description      text,
  duration_minutes int  not null default 45 check (duration_minutes between 15 and 240),
  price_cents      int  check (price_cents >= 0),
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

create table public.dentists (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null unique,
  role        text not null default 'Dentist',
  bio         text,
  photo_url   text,
  location_id uuid references public.locations (id) on delete set null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Which dentist performs which service
create table public.dentist_services (
  dentist_id uuid not null references public.dentists (id) on delete cascade,
  service_id uuid not null references public.services (id) on delete cascade,
  primary key (dentist_id, service_id)
);

-- Weekly working hours per dentist (0 = Sunday … 6 = Saturday)
create table public.dentist_availability (
  id          uuid primary key default gen_random_uuid(),
  dentist_id  uuid not null references public.dentists (id) on delete cascade,
  day_of_week int  not null check (day_of_week between 0 and 6),
  start_time  time not null,
  end_time    time not null,
  check (start_time < end_time),
  unique (dentist_id, day_of_week, start_time)
);

-- ---------------------------------------------------------------------------
-- 3. Appointments
--    Denormalised text columns (service_slug / dentist_name / location_city)
--    keep public booking simple; FK ids are resolved by trigger when present.
-- ---------------------------------------------------------------------------
create table public.appointments (
  id            uuid primary key default gen_random_uuid(),
  service_id    uuid references public.services (id),
  dentist_id    uuid references public.dentists (id),
  location_id   uuid references public.locations (id),
  service_slug  text not null,
  dentist_name  text not null,
  location_city text not null,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  status        appointment_status not null default 'pending',
  patient_name  text not null check (char_length(patient_name) between 2 and 120),
  patient_email text not null check (patient_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  patient_phone text not null check (char_length(patient_phone) between 7 and 32),
  notes         text check (char_length(notes) <= 1000),
  -- set by the reminder cron once a reminder email has been sent
  reminder_sent_at timestamptz,
  created_at    timestamptz not null default now(),
  -- bookings must be in the future
  constraint appointments_future check (starts_at > now())
);

-- Speeds up the reminder cron's "upcoming & not-yet-reminded" lookup.
create index appointments_reminder_due_idx
  on public.appointments (starts_at)
  where reminder_sent_at is null and status in ('pending', 'confirmed');

-- Double-booking guard: one active appointment per dentist per slot.
create unique index appointments_dentist_slot_uniq
  on public.appointments (dentist_name, starts_at)
  where status in ('pending', 'confirmed');

create index appointments_starts_at_idx on public.appointments (starts_at);
create index appointments_patient_email_idx on public.appointments (patient_email);

-- ---------------------------------------------------------------------------
-- 4. Trigger: resolve FK ids + compute ends_at from service duration
-- ---------------------------------------------------------------------------
create or replace function public.resolve_appointment_refs()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_duration int;
begin
  select s.id, s.duration_minutes into new.service_id, v_duration
  from public.services s where s.slug = new.service_slug;

  select d.id into new.dentist_id
  from public.dentists d where d.full_name = new.dentist_name;

  select l.id into new.location_id
  from public.locations l where l.city = new.location_city;

  new.ends_at := new.starts_at + make_interval(mins => coalesce(v_duration, 45));
  return new;
end;
$$;

create trigger appointments_resolve_refs
  before insert on public.appointments
  for each row execute function public.resolve_appointment_refs();

-- ---------------------------------------------------------------------------
-- 5. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.locations            enable row level security;
alter table public.services             enable row level security;
alter table public.dentists             enable row level security;
alter table public.dentist_services     enable row level security;
alter table public.dentist_availability enable row level security;
alter table public.appointments         enable row level security;

-- Public catalogue: anyone may read
create policy "public read locations"    on public.locations            for select using (true);
create policy "public read services"     on public.services             for select using (is_active);
create policy "public read dentists"     on public.dentists             for select using (is_active);
create policy "public read d-services"   on public.dentist_services     for select using (true);
create policy "public read availability" on public.dentist_availability for select using (true);

-- Visitors may create bookings, but cannot read, edit or delete them.
-- Staff (authenticated dashboard users) get full visibility.
create policy "anon can book" on public.appointments
  for insert to anon, authenticated
  with check (status = 'pending');

create policy "staff read appointments" on public.appointments
  for select to authenticated using (true);

create policy "staff update appointments" on public.appointments
  for update to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- 6. Seed data (matches the website content)
-- ---------------------------------------------------------------------------
insert into public.locations (city, address, phone) values
  ('Maitama, Abuja', '12 Aguiyi Ironsi Street, Maitama',    '+234 (81) 6567-8901'),
  ('Wuse, Abuja',    '45 Aminu Kano Crescent, Wuse II',     '+234 (81) 6567-8901'),
  ('Garki, Abuja',   '8 Julius Nyerere Crescent, Garki',     '+234 (81) 6567-8901');

insert into public.services (slug, title, description, duration_minutes, price_cents) values
  ('preventive-dentistry',  'Preventive dentistry',  'Checkups, cleanings, oral health and whitening.',           45,  9500),
  ('cosmetic-dentistry',    'Cosmetic dentistry',    'Whitening, veneers, bonding and smile design.',             60, 18500),
  ('restorative-dentistry', 'Restorative dentistry', 'Fillings, crowns, implants and bridges.',                   75, 22000),
  ('pediatric-dentistry',   'Pediatric dentistry',   'Gentle checkups, sealants, fluoride and education for kids.', 40,  8500);

insert into public.dentists (full_name, role, location_id)
select d.full_name, d.role, l.id
from (values
  ('Dr.David Waza',  'Pediatric Dentist', 'Maitama, Abuja'),
  ('Dr.Excel Bagi',  'Pediatric Dentist', 'Wuse, Abuja'),
  ('Dr.Bagi',        'Pediatric Dentist', 'Garki, Abuja')
) as d(full_name, role, city)
join public.locations l on l.city = d.city;

-- Each specialist handles specific services (matches lib/content.ts)
insert into public.dentist_services (dentist_id, service_id)
select d.id, s.id
from public.dentists d
join public.services s on (
  (d.full_name = 'Dr.David Waza'  and s.slug in ('preventive-dentistry', 'pediatric-dentistry')) or
  (d.full_name = 'Dr.Excel Bagi'  and s.slug = 'cosmetic-dentistry') or
  (d.full_name = 'Dr.Bagi'        and s.slug = 'restorative-dentistry')
);

-- Mon–Fri 09:00–17:00, Sat–Sun 05:00–17:30 (matches site opening hours)
insert into public.dentist_availability (dentist_id, day_of_week, start_time, end_time)
select d.id, dow, case when dow in (0, 6) then time '05:00' else time '09:00' end,
              case when dow in (0, 6) then time '17:30' else time '17:00' end
from public.dentists d, generate_series(0, 6) as dow;

-- ---------------------------------------------------------------------------
-- 7. Migrations for existing databases
-- Fresh installs: sections 1–6 above are enough.
-- If the database was created from an older schema (spaced dentist names like
-- "Dr. David Waza", or every dentist linked to every service), run:
--   supabase/migrations/0002_dentist_names_and_specialist_services.sql
-- If locations still use US cities, run:
--   supabase/migrations/0003_abuja_locations.sql
-- in the Supabase SQL editor after the initial setup.
-- ---------------------------------------------------------------------------
