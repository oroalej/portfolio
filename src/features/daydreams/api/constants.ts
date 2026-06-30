export const DAYDREAM_SELECT =
  "id, year, description, iso, shutter_speed, aperture, created_at, images:daydream_images(id, daydream_id, file_id, image_order, file:file_id(id, bucket_name, name, width, height, size, storage_file_path, type))";
