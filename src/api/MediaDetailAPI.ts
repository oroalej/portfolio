import supabase from "@/utils/supabase";
import {Tables} from "@/types";
import {titleCase} from "@/utils";

const TABLE_NAME = "media_details";

interface MediaDetailAPIDataStructure extends Omit<Tables<'media_details'>, "created_at"> {

}

export const getAllMediaBySourceId = async (sourceId: string): Promise<MediaDetailAPIDataStructure[]> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .select("id, name, source_id")
        .eq('source_id', sourceId);

    if (error) throw error;

    return data as unknown as MediaDetailAPIDataStructure[]
}

export const getMediaDetail = async (id: string): Promise<MediaDetailAPIDataStructure> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .select("id, name, source_id")
        .eq('id', id);

    if (error) throw error;

    return data as unknown as MediaDetailAPIDataStructure;
}

export const storeMediaDetail = async (
    formData: {
        source_id: string,
        name: string
    }
): Promise<MediaDetailAPIDataStructure> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .insert({
            source_id: formData.source_id,
            name: titleCase(formData.name)
        })
        .select("id, name, source_id")
        .single();

    if (error) throw error;

    return data as unknown as MediaDetailAPIDataStructure;
}
