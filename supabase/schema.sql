-- ==============================================================================
-- AUTOGROW COMMERCIAL SYSTEMS - ENTERPRISE SUPABASE SCHEMA
-- Multi-Million Enterprise Hydroponic Automation Suite
-- Includes: Authentication Profiles, RBAC, Customer Orders, and Feedback/Inquiries
-- ==============================================================================

-- 1. PROFILES & ROLES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin', 'operator')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. ORDERS TABLE (Customer Store Cart Orders)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  company_name text,
  facility_voltage text default '220-240V',
  shipping_address text not null,
  total_amount numeric(12, 2) not null,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. INQUIRIES & CUSTOMER FEEDBACK TABLE
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  category text not null default 'general' check (category in ('technical_support', 'quote_inquiry', 'feedback', 'general')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'in_progress', 'resolved')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==============================================================================
-- AUTOMATIC PROFILE TRIGGER ON AUTH.USERS SIGNUP
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    -- If email contains admin or matches configured admin, can default or manually assign
    case 
      when new.email ilike '%admin%' then 'admin'
      else 'customer'
    end
  )
  on conflict (id) do update
  set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;

-- PROFILES POLICIES
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ORDERS POLICIES
create policy "Customers can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Customers and guests can insert orders"
  on public.orders for insert
  with check (true);

create policy "Admins can view and manage all orders"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- INQUIRIES POLICIES
create policy "Anyone can submit an inquiry or feedback"
  on public.inquiries for insert
  with check (true);

create policy "Customers can view their own inquiries"
  on public.inquiries for select
  using (auth.uid() = user_id);

create policy "Admins can view and manage all inquiries"
  on public.inquiries for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ==============================================================================
-- INITIAL SAMPLE DATA FOR TESTING & PREVIEW
-- ==============================================================================
insert into public.orders (order_number, customer_name, customer_email, customer_phone, company_name, facility_voltage, shipping_address, total_amount, items, status, notes)
values 
  ('AG-2026-8491', 'Marcus Vance', 'marcus.v@pacifichydro.nz', '+64 21 893 214', 'Pacific Greens Ltd', '220-240V', 'Building 4, Pukekohe Agri-Park, Auckland, NZ', 8450.00, '[{"name": "MultiGrow Commercial Controller (v2.4)", "quantity": 1, "price": 4200}, {"name": "IntelliDose Tri-Pump Skid Assembly", "quantity": 1, "price": 3400}, {"name": "Submersible Glass EC Probe", "quantity": 3, "price": 283.33}]'::jsonb, 'processing', 'Requires NZ 240V 50Hz single phase wiring certifications'),
  ('AG-2026-7729', 'Elena Rostova', 'elena@nordicagri.se', '+46 8 505 1200', 'Nordic AeroFarms AB', '220-240V', 'Västerås Greenhouse Complex 12, Sweden', 4980.00, '[{"name": "IntelliClimate Indoor Controller", "quantity": 1, "price": 3800}, {"name": "Aspiration Fan Aspirated Box", "quantity": 2, "price": 590}]'::jsonb, 'pending', 'Urgent express air courier to Stockholm Arlanda')
on conflict (order_number) do nothing;

insert into public.inquiries (name, email, subject, category, message, status)
values
  ('David Chen', 'david@apexplants.sg', 'Bulk Quote for 10 Hectare Tomato Skids', 'quote_inquiry', 'We are expanding our Singapore rooftop farm by 10 hectares and require a complete commercial fertigation schedule with Modbus TCP integration.', 'new'),
  ('Dr. Sarah Jenkins', 's.jenkins@botanylab.org', 'EC Mini Calibration Drift Guidance', 'technical_support', 'Our EC Mini probe shows +/- 0.15 mS drift after 4 months in high salt calcium nitrate tanks. Need re-calibration procedure.', 'in_progress')
on conflict do nothing;
