import {
  DaydreamAPIDataStructure,
  DreamFormParams,
} from "@/features/daydreams/types";
import { supabase } from "@/utils/supabase";

interface SaveDaydreamParams {
  formData: DreamFormParams;
  id?: string | null;
}

export const createSaveDaydreamRpcParams = ({
  formData,
  id = null,
}: SaveDaydreamParams) => ({
  p_aperture: formData.aperture,
  p_description: formData.description,
  p_id: id,
  p_image_file_ids: formData.images.map((image) => image.file_id),
  p_iso: formData.iso,
  p_shutter_speed: formData.shutter_speed,
  p_year: formData.year,
});

export const saveDaydream = async ({
  formData,
  id = null,
}: SaveDaydreamParams): Promise<DaydreamAPIDataStructure> => {
  const { data } = await supabase
    .rpc(
      "save_daydream",
      createSaveDaydreamRpcParams({
        formData,
        id,
      })
    )
    .throwOnError();

  if (data === null) throw new Error("Data not found.");

  return data as unknown as DaydreamAPIDataStructure;
};
