-- ===========================================================================
-- SILA — Supabase schema
--
-- Run this ONCE against a fresh Supabase project (SQL Editor or `supabase db`).
-- It is idempotent-ish: safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE),
-- but DROP-and-recreate the enums manually if you change their values.
--
-- After running this, seed the placeholder content with:  npm run db:seed
-- ===========================================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- --------------------------------------------------------------------------
-- Enums
-- --------------------------------------------------------------------------
do $$ begin
  create type currency_code as enum ('USD', 'TZS');
exception when duplicate_object then null; end $$;

do $$ begin
  create type listing_type as enum ('sale', 'rent');
exception when duplicate_object then null; end $$;

do $$ begin
  create type rent_period as enum ('month', 'night');
exception when duplicate_object then null; end $$;

do $$ begin
  create type furnished_status as enum ('Furnished', 'Unfurnished', 'Optional');
exception when duplicate_object then null; end $$;

do $$ begin
  create type project_status as enum ('Planning', 'Under Construction', 'Nearing Completion', 'Ready');
exception when duplicate_object then null; end $$;

do $$ begin
  create type team_base as enum ('Zanzibar', 'Mainland Tanzania');
exception when duplicate_object then null; end $$;

-- --------------------------------------------------------------------------
-- updated_at trigger helper
-- --------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- --------------------------------------------------------------------------
-- properties
-- --------------------------------------------------------------------------
create table if not exists properties (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  location          text not null,
  reference         text,
  listing_type      listing_type not null,
  property_type     text not null,
  price             numeric not null,
  currency          currency_code not null default 'USD',
  rent_period       rent_period,
  bedrooms          integer,
  bathrooms         integer,
  size              integer,
  land_size         integer,
  furnished         furnished_status not null default 'Optional',
  verified          boolean not null default false,
  featured          boolean not null default false,
  beachfront        boolean not null default false,
  new_development    boolean not null default false,
  image             text,
  gallery           text[] not null default '{}',
  short_description text,
  description       text,
  amenities         text[] not null default '{}',
  lat               double precision,
  lng               double precision,
  published         boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists properties_published_idx on properties (published);
create index if not exists properties_featured_idx on properties (featured) where featured;
create index if not exists properties_listing_type_idx on properties (listing_type);
create index if not exists properties_location_idx on properties (location);
drop trigger if exists properties_set_updated_at on properties;
create trigger properties_set_updated_at before update on properties
  for each row execute function set_updated_at();

-- --------------------------------------------------------------------------
-- projects (build-to-own developments)
-- --------------------------------------------------------------------------
create table if not exists projects (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  location           text not null,
  status             project_status not null default 'Planning',
  completion_percent integer not null default 0 check (completion_percent between 0 and 100),
  est_completion     text,
  starting_price     numeric not null,
  currency           currency_code not null default 'USD',
  unit_types         text[] not null default '{}',
  image              text,
  gallery            text[] not null default '{}',
  short_description  text,
  description        text,
  amenities          text[] not null default '{}',
  payment_plan       text,
  published          boolean not null default true,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index if not exists projects_published_idx on projects (published);
drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();

-- --------------------------------------------------------------------------
-- plots
-- --------------------------------------------------------------------------
create table if not exists plots (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  location            text not null,
  size                integer not null,
  price               numeric not null,
  currency            currency_code not null default 'USD',
  price_per_sqm       numeric,
  use                 text,
  road_access         boolean not null default false,
  electricity         boolean not null default false,
  water               boolean not null default false,
  doc_status          text,
  distance_from_road  text,
  distance_from_beach text,
  image               text,
  description         text,
  lat                 double precision,
  lng                 double precision,
  published           boolean not null default true,
  sort_order          integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists plots_published_idx on plots (published);
drop trigger if exists plots_set_updated_at on plots;
create trigger plots_set_updated_at before update on plots
  for each row execute function set_updated_at();

-- --------------------------------------------------------------------------
-- team_members
-- --------------------------------------------------------------------------
create table if not exists team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  title       text not null,
  base        team_base not null,
  image       text,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists team_members_published_idx on team_members (published);
drop trigger if exists team_members_set_updated_at on team_members;
create trigger team_members_set_updated_at before update on team_members
  for each row execute function set_updated_at();

-- --------------------------------------------------------------------------
-- enquiries — leads from the Contact + Enquiry forms
-- --------------------------------------------------------------------------
create table if not exists enquiries (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  phone             text,
  email             text,
  country           text,
  service           text,
  location          text,
  budget            text,
  currency          text,
  preferred_date    date,
  preferred_contact text,
  message           text,
  context           text,          -- what the enquiry is about (property/project name)
  source            text not null default 'contact', -- contact | property_enquiry | project_enquiry
  status            text not null default 'new',      -- new | contacted | closed
  created_at        timestamptz not null default now()
);
create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
create index if not exists enquiries_status_idx on enquiries (status);

-- --------------------------------------------------------------------------
-- property_submissions — "List Your Property" form
-- --------------------------------------------------------------------------
create table if not exists property_submissions (
  id                uuid primary key default gen_random_uuid(),
  owner_name        text not null,
  owner_phone       text,
  owner_whatsapp    text,
  owner_email       text,
  property_title    text,
  property_type     text,
  listing_type      text,          -- For Sale | For Rent
  location          text,
  price             text,
  currency          text,
  bedrooms          text,
  bathrooms         text,
  size              text,
  land_size         text,
  furnished         text,
  maps_link         text,
  description       text,
  preferred_contact text,
  status            text not null default 'pending_review', -- pending_review | approved | rejected
  created_at        timestamptz not null default now()
);
create index if not exists property_submissions_created_at_idx on property_submissions (created_at desc);
create index if not exists property_submissions_status_idx on property_submissions (status);

-- ===========================================================================
-- Row Level Security
--
-- Public (anon) role:
--   * may READ published rows of the content tables
--   * may INSERT into the two lead tables (write-only; cannot read them back)
-- The service-role key (used by the seed script + any admin backend) bypasses
-- RLS entirely, so no explicit admin policies are needed here.
-- ===========================================================================

alter table properties           enable row level security;
alter table projects             enable row level security;
alter table plots                enable row level security;
alter table team_members         enable row level security;
alter table enquiries            enable row level security;
alter table property_submissions enable row level security;

-- Public read of published content
drop policy if exists "public read published properties" on properties;
create policy "public read published properties" on properties
  for select to anon, authenticated using (published = true);

drop policy if exists "public read published projects" on projects;
create policy "public read published projects" on projects
  for select to anon, authenticated using (published = true);

drop policy if exists "public read published plots" on plots;
create policy "public read published plots" on plots
  for select to anon, authenticated using (published = true);

drop policy if exists "public read published team" on team_members;
create policy "public read published team" on team_members
  for select to anon, authenticated using (published = true);

-- Public insert of leads (no read-back)
drop policy if exists "public insert enquiries" on enquiries;
create policy "public insert enquiries" on enquiries
  for insert to anon, authenticated with check (true);

drop policy if exists "public insert property submissions" on property_submissions;
create policy "public insert property submissions" on property_submissions
  for insert to anon, authenticated with check (true);
