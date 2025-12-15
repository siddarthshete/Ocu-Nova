-- Create detection_history table to store eye disease detection results
create table if not exists public.detection_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text not null,
  detected_condition text not null,
  models_used text[] not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.detection_history enable row level security;

-- RLS Policies for detection_history
create policy "Users can view their own detection history"
  on public.detection_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own detection history"
  on public.detection_history for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own detection history"
  on public.detection_history for delete
  using (auth.uid() = user_id);
