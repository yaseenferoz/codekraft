-- Run once in the existing Supabase project's SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.campuskraft_interests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  work_email text not null,
  phone text not null,
  institution_name text not null,
  institution_type text not null,
  city text not null,
  state text not null,
  student_count text not null,
  current_system text not null default '',
  main_challenge text not null,
  modules_of_interest text[] not null default '{}',
  preferred_contact_method text not null,
  additional_notes text not null default '',
  consent boolean not null default false,
  source text not null default 'campuskraft-product-page',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint campuskraft_interest_status check (status in ('new', 'contacted', 'discovery', 'archived'))
);

alter table public.campuskraft_interests enable row level security;

-- No public insert policy is required: the Next.js route writes with the server-only service-role key.
create index if not exists campuskraft_interests_created_at_idx on public.campuskraft_interests (created_at desc);
create index if not exists campuskraft_interests_status_idx on public.campuskraft_interests (status);

create or replace function public.set_campuskraft_interest_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists campuskraft_interests_updated_at on public.campuskraft_interests;
create trigger campuskraft_interests_updated_at
before update on public.campuskraft_interests
for each row execute function public.set_campuskraft_interest_updated_at();
