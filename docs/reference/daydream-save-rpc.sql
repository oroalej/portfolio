create or replace function public.save_daydream(
  p_id uuid,
  p_year integer,
  p_description text,
  p_iso integer,
  p_shutter_speed numeric,
  p_aperture numeric,
  p_image_file_ids uuid[]
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_daydream_id uuid;
  v_result jsonb;
begin
  if coalesce(cardinality(p_image_file_ids), 0) = 0 then
    raise exception 'At least one image is required.'
      using errcode = '23514';
  end if;

  if exists (
    select 1
    from unnest(p_image_file_ids) as image_file_id
    where image_file_id is null
  ) then
    raise exception 'Image ids cannot contain null values.'
      using errcode = '23502';
  end if;

  if p_id is null then
    insert into public.daydreams (
      year,
      description,
      iso,
      shutter_speed,
      aperture
    )
    values (
      p_year,
      p_description,
      p_iso,
      p_shutter_speed,
      p_aperture
    )
    returning id into v_daydream_id;
  else
    update public.daydreams
    set
      year = p_year,
      description = p_description,
      iso = p_iso,
      shutter_speed = p_shutter_speed,
      aperture = p_aperture
    where id = p_id
    returning id into v_daydream_id;

    if v_daydream_id is null then
      raise exception 'Daydream not found.'
        using errcode = 'P0002';
    end if;

    delete from public.daydream_images
    where daydream_id = v_daydream_id;
  end if;

  insert into public.daydream_images (
    daydream_id,
    file_id,
    image_order
  )
  select
    v_daydream_id,
    image_files.file_id,
    image_files.image_order::integer
  from unnest(p_image_file_ids) with ordinality as image_files(file_id, image_order);

  select jsonb_build_object(
    'id', daydreams.id,
    'year', daydreams.year,
    'description', daydreams.description,
    'iso', daydreams.iso,
    'shutter_speed', daydreams.shutter_speed,
    'aperture', daydreams.aperture,
    'created_at', daydreams.created_at,
    'images', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', daydream_images.id,
            'daydream_id', daydream_images.daydream_id,
            'file_id', daydream_images.file_id,
            'image_order', daydream_images.image_order,
            'file', jsonb_build_object(
              'id', files.id,
              'bucket_name', files.bucket_name,
              'name', files.name,
              'width', files.width,
              'height', files.height,
              'size', files.size,
              'storage_file_path', files.storage_file_path,
              'type', files.type
            )
          )
          order by daydream_images.image_order
        )
        from public.daydream_images
        inner join public.files on files.id = daydream_images.file_id
        where daydream_images.daydream_id = daydreams.id
      ),
      '[]'::jsonb
    )
  )
  into v_result
  from public.daydreams
  where daydreams.id = v_daydream_id;

  return v_result;
end;
$$;
