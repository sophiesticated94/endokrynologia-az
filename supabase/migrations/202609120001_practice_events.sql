-- Add the Lesson v2 practice event without rewriting immutable historical rows.
alter table public.learning_events drop constraint if exists learning_events_kind_check;
alter table public.learning_events add constraint learning_events_kind_check
  check (kind in ('lesson','quiz','exam','case','review','profile','practice'));

alter table public.learning_events add constraint valid_practice
  check (
    kind <> 'practice' or (
      payload ? 'objectiveIds' and jsonb_typeof(payload->'objectiveIds') = 'array'
      and payload ? 'correct' and jsonb_typeof(payload->'correct') = 'boolean'
      and payload ? 'activityType' and jsonb_typeof(payload->'activityType') = 'string'
    )
  );
