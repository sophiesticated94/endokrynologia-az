-- Run against a disposable Supabase test database AFTER the migration.
-- Every test record is rolled back. Failure raises an exception.
begin;
insert into auth.users(id,aud,role,email,encrypted_password,created_at,updated_at)
values ('10000000-0000-4000-8000-000000000001','authenticated','authenticated','endo-test-a@example.invalid','',now(),now()),
       ('10000000-0000-4000-8000-000000000002','authenticated','authenticated','endo-test-b@example.invalid','',now(),now());
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
insert into public.learning_events(id,user_id,kind,target_id,content_version)
values ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','lesson','fizjologia','test');
do $$ begin
 if (select count(*) from public.learning_events) <> 1 then raise exception 'Own record unreadable'; end if;
 begin
  insert into public.learning_events(id,user_id,kind,target_id,content_version)
  values ('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002','lesson','fizjologia','test');
  raise exception 'Cross-user insert succeeded';
 exception when insufficient_privilege then null; end;
 begin
  insert into public.learning_events(id,user_id,kind,target_id,content_version)
  values ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','lesson','fizjologia','test');
  raise exception 'Duplicate accepted';
 exception when unique_violation then null; end;
 begin
  update public.learning_events set target_id='modified';
  raise exception 'History is mutable';
 exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
do $$ begin
 if (select count(*) from public.learning_events) <> 0 then raise exception 'Cross-user read succeeded'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
 begin
  perform * from public.learning_events;
  raise exception 'Anonymous read succeeded';
 exception when insufficient_privilege then null; end;
end $$;
rollback;
