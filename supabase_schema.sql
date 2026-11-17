-- Run this in the Supabase SQL Editor, then copy your project URL and
-- anon key into .env (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).

-- ─────────────────────────────────────────────
-- Payments (Paystack)
-- ─────────────────────────────────────────────
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  reference text unique not null,
  amount integer not null,            -- kobo (smallest currency unit)
  currency text default 'NGN',
  donor_name text,
  email text,
  designation text,
  anonymous boolean default false,
  status text default 'paid',
  paid_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table payments enable row level security;
grant select, insert on public.payments to authenticated;
grant select, insert on public.payments to anon;
create policy "anon can insert payments" on payments
  for insert to anon with check (true);
create policy "anon can view payments" on payments
  for select to anon using (true);

-- ─────────────────────────────────────────────
-- Blog posts
-- ─────────────────────────────────────────────
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  author_name text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table blog_posts enable row level security;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant select on public.blog_posts to anon;
create policy "anon can insert blog posts" on blog_posts
  for insert to anon with check (true);
create policy "anon can view blog posts" on blog_posts
  for select to anon using (true);
create policy "anon can update blog posts" on blog_posts
  for update to anon using (true);
create policy "anon can delete blog posts" on blog_posts
  for delete to anon using (true);

-- ─────────────────────────────────────────────
-- Contact us submissions
-- ─────────────────────────────────────────────
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

alter table contacts enable row level security;
grant select on public.contacts to authenticated;
grant insert on public.contacts to anon;
create policy "anon can insert contacts" on contacts
  for insert to anon with check (true);
create policy "anon can view contacts" on contacts
  for select to anon using (true);

-- ─────────────────────────────────────────────
-- Volunteer applications
-- ─────────────────────────────────────────────
create table if not exists volunteers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  location text,
  interest text,
  availability text,
  experience text,
  message text,
  created_at timestamptz default now()
);

alter table volunteers enable row level security;
grant select on public.volunteers to authenticated;
grant insert on public.volunteers to anon;
create policy "anon can insert volunteers" on volunteers
  for insert to anon with check (true);
create policy "anon can view volunteers" on volunteers
  for select to anon using (true);

-- ─────────────────────────────────────────────
-- Admin users (restrict dashboard access)
-- ─────────────────────────────────────────────
create table if not exists admins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid unique not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

alter table admins enable row level security;
grant select on public.admins to authenticated;
create policy "authenticated can view admins" on admins
  for select to authenticated using (true);

-- Add your admin user
insert into admins (user_id)
values ('e5d7c460-d5e7-4065-abfd-be004382e52c')
on conflict (user_id) do nothing;

-- ─────────────────────────────────────────────
-- Storage bucket for blog cover images
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy if not exists "Public read access for blog covers" on storage.objects
  for select to public
  using (bucket_id = 'blog-covers');

create policy if not exists "Authenticated users can upload blog covers" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-covers');

create policy if not exists "Authenticated users can update blog covers" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog-covers');

create policy if not exists "Authenticated users can delete blog covers" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog-covers');
