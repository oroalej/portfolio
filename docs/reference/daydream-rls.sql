begin;

alter table public.daydreams enable row level security;
alter table public.daydream_images enable row level security;

drop policy if exists "Public can read daydreams" on public.daydreams;
create policy "Public can read daydreams"
on public.daydreams
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can insert daydreams" on public.daydreams;
create policy "Authenticated users can insert daydreams"
on public.daydreams
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update daydreams" on public.daydreams;
create policy "Authenticated users can update daydreams"
on public.daydreams
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete daydreams" on public.daydreams;
create policy "Authenticated users can delete daydreams"
on public.daydreams
for delete
to authenticated
using (true);

drop policy if exists "Public can read daydream images" on public.daydream_images;
create policy "Public can read daydream images"
on public.daydream_images
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can insert daydream images" on public.daydream_images;
create policy "Authenticated users can insert daydream images"
on public.daydream_images
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update daydream images" on public.daydream_images;
create policy "Authenticated users can update daydream images"
on public.daydream_images
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete daydream images" on public.daydream_images;
create policy "Authenticated users can delete daydream images"
on public.daydream_images
for delete
to authenticated
using (true);

revoke execute on function public.save_daydream(
  uuid,
  integer,
  text,
  integer,
  numeric,
  numeric,
  uuid[]
) from public;

grant execute on function public.save_daydream(
  uuid,
  integer,
  text,
  integer,
  numeric,
  numeric,
  uuid[]
) to authenticated;

commit;

/*
Run this optional block only if public.files does not already have a public
read policy for image metadata. If public.files has RLS enabled, /daydreams
needs anon select access to rows in the images bucket through nested joins.

begin;

alter table public.files enable row level security;

drop policy if exists "Public can read image files" on public.files;
create policy "Public can read image files"
on public.files
for select
to anon, authenticated
using (bucket_name = 'images');

commit;
*/
