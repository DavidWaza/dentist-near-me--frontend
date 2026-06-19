-- ============================================================================
-- Migration: US clinic locations → Abuja, Nigeria
-- Run this in the Supabase SQL editor on an EXISTING database.
-- Matches lib/content.ts and the seed in schema.sql (section 6).
-- Timezone for the app: Africa/Lagos (Abuja / Nigeria — WAT, UTC+1).
-- Safe to re-run — updates only rows that still use the old US city names.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Update reference locations
-- ---------------------------------------------------------------------------
update public.locations
set
  city = 'Maitama, Abuja',
  address = '12 Aguiyi Ironsi Street, Maitama',
  phone = '+234 (81) 6567-8901'
where city = 'New York, NY';

update public.locations
set
  city = 'Wuse, Abuja',
  address = '45 Aminu Kano Crescent, Wuse II',
  phone = '+234 (81) 6567-8901'
where city = 'Los Angeles, CA';

update public.locations
set
  city = 'Garki, Abuja',
  address = '8 Julius Nyerere Crescent, Garki',
  phone = '+234 (81) 6567-8901'
where city = 'Chicago, IL';

-- ---------------------------------------------------------------------------
-- 2. Re-link dentists to Abuja clinics (by specialist name)
-- ---------------------------------------------------------------------------
update public.dentists d
set location_id = l.id
from public.locations l
where d.full_name = 'Dr.David Waza' and l.city = 'Maitama, Abuja';

update public.dentists d
set location_id = l.id
from public.locations l
where d.full_name = 'Dr.Excel Bagi' and l.city = 'Wuse, Abuja';

update public.dentists d
set location_id = l.id
from public.locations l
where d.full_name = 'Dr.Bagi' and l.city = 'Garki, Abuja';

-- ---------------------------------------------------------------------------
-- 3. Keep denormalised appointment rows in sync
-- ---------------------------------------------------------------------------
update public.appointments
set location_city = 'Maitama, Abuja'
where location_city = 'New York, NY';

update public.appointments
set location_city = 'Wuse, Abuja'
where location_city = 'Los Angeles, CA';

update public.appointments
set location_city = 'Garki, Abuja'
where location_city = 'Chicago, IL';

update public.appointments a
set location_id = l.id
from public.locations l
where l.city = a.location_city
  and a.location_id is distinct from l.id;

-- ---------------------------------------------------------------------------
-- 4. Verify (optional — inspect results, then comment out if desired)
-- ---------------------------------------------------------------------------
-- select city, address, phone from public.locations order by city;
-- select d.full_name, l.city from public.dentists d left join public.locations l on l.id = d.location_id;
