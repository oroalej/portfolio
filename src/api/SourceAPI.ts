import supabase from "@/utils/supabase";
import {Tables} from "@/types";

const TABLE_NAME = "sources";

interface SourceAPIDataStructure extends Omit<Tables<'sources'>, "created_at"> {
}

export const getSourceByCategoryId = async (categoryId: string): Promise<SourceAPIDataStructure[]> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .select("id, name, category_id")
        .eq("category_id", categoryId);

    if (error) throw error;

    return data as unknown as SourceAPIDataStructure[];
}


export const storeSource = async (formData: { name: string, category_id: string }): Promise<SourceAPIDataStructure> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .insert(formData)
        .select("id, name, category_id")
        .single();

    if (error) throw error;

    return data as unknown as SourceAPIDataStructure;
}
