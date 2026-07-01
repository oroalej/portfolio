begin;

create table if not exists public.daydream_images (
  id uuid primary key default gen_random_uuid(),
  daydream_id uuid not null references public.daydreams(id) on delete cascade,
  file_id uuid not null references public.files(id),
  image_order integer not null check (image_order > 0),
  unique (daydream_id, file_id),
  unique (daydream_id, image_order)
);

create index if not exists daydream_images_daydream_id_idx
  on public.daydream_images(daydream_id);

create index if not exists daydream_images_file_id_idx
  on public.daydream_images(file_id);

insert into public.daydream_images (daydream_id, file_id, image_order)
select daydreams.id, daydreams.file_id, 1
from public.daydreams
where daydreams.file_id is not null
  and not exists (
    select 1
    from public.daydream_images
    where daydream_images.daydream_id = daydreams.id
      and daydream_images.file_id = daydreams.file_id
  );

alter table public.daydreams
  drop constraint if exists daydreams_file_id_fkey;

alter table public.daydreams
  drop column if exists file_id;

alter table public.daydreams
  alter column iso drop not null,
  alter column shutter_speed drop not null,
  alter column aperture drop not null;

commit;
