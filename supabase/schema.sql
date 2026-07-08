-- AI 360 WORK FORCE landing page setup
-- Run this in Supabase SQL Editor if you want to track purchase button clicks later.
-- Do not paste service role keys into frontend code.

create table if not exists public.landing_page_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  page_path text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.landing_page_events enable row level security;

drop policy if exists "Allow anonymous insert landing page events" on public.landing_page_events;

create policy "Allow anonymous insert landing page events"
on public.landing_page_events
for insert
to anon
with check (event_name in ('purchase_click'));

drop policy if exists "Block anonymous read landing page events" on public.landing_page_events;

create policy "Block anonymous read landing page events"
on public.landing_page_events
for select
to anon
using (false);
