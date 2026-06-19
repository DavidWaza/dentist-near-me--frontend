-- ============================================================================
-- Migration: align dentist names + per-service specialist mapping
-- Run this in the Supabase SQL editor on an EXISTING database.
-- Matches lib/content.ts and the seed in schema.sql (sections 6).
-- Safe to re-run — updates only rows that still use the old names.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Rename dentists (old spaced "Dr. Name" → current "Dr.Name")
-- ---------------------------------------------------------------------------
update public.dentists
set full_name = 'Dr.David Waza'
where full_name in ('Dr. David Waza');

update public.dentists
set full_name = 'Dr.Excel Bagi'
where full_name in ('Dr. Excel Bagi');

update public.dentists
set full_name = 'Dr.Bagi'
where full_name in ('Dr. Bagi');

-- ---------------------------------------------------------------------------
-- 2. Keep denormalised appointment rows in sync
-- ---------------------------------------------------------------------------
update public.appointments
set dentist_name = 'Dr.David Waza'
where dentist_name in ('Dr. David Waza');

update public.appointments
set dentist_name = 'Dr.Excel Bagi'
where dentist_name in ('Dr. Excel Bagi');

update public.appointments
set dentist_name = 'Dr.Bagi'
where dentist_name in ('Dr. Bagi');

-- Re-link dentist_id after renames (trigger only runs on insert)
update public.appointments a
set dentist_id = d.id
from public.dentists d
where d.full_name = a.dentist_name
  and a.dentist_id is distinct from d.id;

-- ---------------------------------------------------------------------------
-- 3. Replace "every dentist × every service" with specialist mapping
-- ---------------------------------------------------------------------------
delete from public.dentist_services;

insert into public.dentist_services (dentist_id, service_id)
select d.id, s.id
from public.dentists d
join public.services s on (
  (d.full_name = 'Dr.David Waza' and s.slug in ('preventive-dentistry', 'pediatric-dentistry')) or
  (d.full_name = 'Dr.Excel Bagi' and s.slug = 'cosmetic-dentistry') or
  (d.full_name = 'Dr.Bagi'       and s.slug = 'restorative-dentistry')
);

-- ---------------------------------------------------------------------------
-- 4. Verify (optional — inspect results, then comment out if desired)
-- ---------------------------------------------------------------------------
-- select full_name, role from public.dentists order by full_name;
-- select d.full_name, s.slug
-- from public.dentist_services ds
-- join public.dentists d on d.id = ds.dentist_id
-- join public.services s on s.id = ds.service_id
-- order by d.full_name, s.slug;
