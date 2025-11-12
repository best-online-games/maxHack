-- Создание основных таблиц для волонтерского приложения

-- Таблица профилей пользователей
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  city text,
  country text default 'Россия',
  coins integer default 0,
  total_points integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Таблица категорий активностей
create table if not exists public.activity_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null,
  created_at timestamptz default now()
);

-- Таблица активностей
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category_id uuid references public.activity_categories(id),
  duration_minutes integer not null,
  points integer not null,
  bonus_description text,
  bonus_multiplier decimal default 1.0,
  image_url text,
  location text,
  max_participants integer,
  current_participants integer default 0,
  event_date timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  is_active boolean default true
);

-- Таблица участия пользователей в активностях
create table if not exists public.user_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  activity_id uuid references public.activities(id) on delete cascade,
  status text default 'pending', -- pending, accepted, completed, cancelled
  points_earned integer,
  coins_earned integer,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, activity_id)
);

-- Таблица челленджей
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text,
  target_count integer not null,
  points_reward integer not null,
  xp_reward integer not null,
  created_at timestamptz default now()
);

-- Таблица прогресса челленджей пользователей
create table if not exists public.user_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  challenge_id uuid references public.challenges(id) on delete cascade,
  current_count integer default 0,
  is_completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, challenge_id)
);

-- Таблица подарков
create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  coins_cost integer not null,
  image_url text,
  stock_quantity integer,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Таблица купленных подарков
create table if not exists public.user_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  reward_id uuid references public.rewards(id),
  purchased_at timestamptz default now(),
  status text default 'pending' -- pending, shipped, delivered
);

-- Таблица флешмобов
create table if not exists public.flashmobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_time text not null,
  points integer not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Таблица участия во флешмобах
create table if not exists public.flashmob_participants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  flashmob_id uuid references public.flashmobs(id) on delete cascade,
  joined_at timestamptz default now(),
  unique(user_id, flashmob_id)
);

-- Таблица локальных заявок (помощь соседям)
create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  requester_name text not null,
  requester_age integer,
  location text not null,
  distance_meters integer,
  points integer default 0,
  status text default 'open', -- open, accepted, completed, cancelled
  created_by uuid references public.profiles(id),
  accepted_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Таблица донатов
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  amount integer not null,
  fund_name text default 'VK Добро',
  created_at timestamptz default now()
);

-- Включаем Row Level Security на всех таблицах
alter table public.profiles enable row level security;
alter table public.activity_categories enable row level security;
alter table public.activities enable row level security;
alter table public.user_activities enable row level security;
alter table public.challenges enable row level security;
alter table public.user_challenges enable row level security;
alter table public.rewards enable row level security;
alter table public.user_rewards enable row level security;
alter table public.flashmobs enable row level security;
alter table public.flashmob_participants enable row level security;
alter table public.help_requests enable row level security;
alter table public.donations enable row level security;

-- RLS политики для profiles
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- RLS политики для activity_categories
create policy "Categories are viewable by everyone"
  on public.activity_categories for select
  using (true);

-- RLS политики для activities
create policy "Activities are viewable by everyone"
  on public.activities for select
  using (true);

create policy "Users can create activities"
  on public.activities for insert
  with check (auth.uid() = created_by);

-- RLS политики для user_activities
create policy "Users can view their own activity participation"
  on public.user_activities for select
  using (auth.uid() = user_id);

create policy "Users can join activities"
  on public.user_activities for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own activity participation"
  on public.user_activities for update
  using (auth.uid() = user_id);

-- RLS политики для challenges
create policy "Challenges are viewable by everyone"
  on public.challenges for select
  using (true);

-- RLS политики для user_challenges
create policy "Users can view their own challenges"
  on public.user_challenges for select
  using (auth.uid() = user_id);

create policy "Users can update their own challenges"
  on public.user_challenges for update
  using (auth.uid() = user_id);

create policy "Users can create their own challenge progress"
  on public.user_challenges for insert
  with check (auth.uid() = user_id);

-- RLS политики для rewards
create policy "Rewards are viewable by everyone"
  on public.rewards for select
  using (true);

-- RLS политики для user_rewards
create policy "Users can view their own rewards"
  on public.user_rewards for select
  using (auth.uid() = user_id);

create policy "Users can purchase rewards"
  on public.user_rewards for insert
  with check (auth.uid() = user_id);

-- RLS политики для flashmobs
create policy "Flashmobs are viewable by everyone"
  on public.flashmobs for select
  using (true);

-- RLS политики для flashmob_participants
create policy "Users can view flashmob participants"
  on public.flashmob_participants for select
  using (true);

create policy "Users can join flashmobs"
  on public.flashmob_participants for insert
  with check (auth.uid() = user_id);

-- RLS политики для help_requests
create policy "Help requests are viewable by everyone"
  on public.help_requests for select
  using (true);

create policy "Users can create help requests"
  on public.help_requests for insert
  with check (auth.uid() = created_by);

create policy "Users can update their help requests"
  on public.help_requests for update
  using (auth.uid() = created_by or auth.uid() = accepted_by);

-- RLS политики для donations
create policy "Users can view their own donations"
  on public.donations for select
  using (auth.uid() = user_id);

create policy "Users can create donations"
  on public.donations for insert
  with check (auth.uid() = user_id);
