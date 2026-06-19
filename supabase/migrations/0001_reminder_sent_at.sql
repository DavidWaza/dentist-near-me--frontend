-- ============================================================================
-- Migration: add reminder tracking to appointments
-- Run this in the Supabase SQL editor on an EXISTING database (the full
-- schema.sql already includes these changes for fresh installs).
-- ============================================================================

alter table public.appointments
  add column if not exists reminder_sent_at timestamptz;

create index if not exists appointments_reminder_due_idx
  on public.appointments (starts_at)
  where reminder_sent_at is null and status in ('pending', 'confirmed');
