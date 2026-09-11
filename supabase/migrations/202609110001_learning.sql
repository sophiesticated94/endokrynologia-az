-- Immutable per-user activity log. Stable client UUIDs make retries idempotent.
create table public.learning_events (
 id uuid primary key,
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 kind text not null check (kind in ('lesson','quiz','exam','case','review','profile')),
 target_id text not null check (length(target_id) between 1 and 120),
 content_version text not null check (length(content_version) between 1 and 80),
 payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload)='object' and octet_length(payload::text)<100000),
 created_at timestamptz not null default clock_timestamp(),
 constraint valid_review check (kind <> 'review' or (payload ? 'remembered' and jsonb_typeof(payload->'remembered')='boolean')),
 constraint valid_profile check (kind <> 'profile' or (payload ? 'level' and payload->>'level' in ('student','doctor')))
);
create index learning_events_user_time on public.learning_events(user_id,created_at,id);
alter table public.learning_events enable row level security;
revoke all on public.learning_events from anon, authenticated;
grant select on public.learning_events to authenticated;
grant insert (id,user_id,kind,target_id,content_version,payload) on public.learning_events to authenticated;
create policy own_events_read on public.learning_events for select to authenticated using ((select auth.uid())=user_id);
create policy own_events_insert on public.learning_events for insert to authenticated with check ((select auth.uid())=user_id);
-- No update/delete grants: history cannot be overwritten by stale devices.
-- Profile, completion and review state are projected from this versioned log.
