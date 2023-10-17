import supabase from "@/utils/supabase";
import {Tables} from "@/types";
import {kebabCase} from "lodash";
import {titleCase} from "@/utils";

const TABLE_NAME = "categories";

export interface CategoryAPIDataStructure extends Pick<Tables<'categories'>, 'id' | 'name' | "slug"> {
}

export const getAllCategories = async (): Promise<CategoryAPIDataStructure[]> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .select("id, name, slug");

    if (error) throw error

    return data as unknown as CategoryAPIDataStructure[];
}

export const getCategory = async (categoryId: string): Promise<CategoryAPIDataStructure> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .select("id, name, slug")
        .eq('id', categoryId)
        .maybeSingle();

    if (error) throw error;

    if (data === null) throw 'Not found';

    return data as unknown as CategoryAPIDataStructure;
}

export const storeCategory = async (value: string): Promise<CategoryAPIDataStructure> => {
    const {data, error} = await supabase.from(TABLE_NAME)
        .insert({
            name: titleCase(value),
            slug: kebabCase(value.toLowerCase())
        })
        .select("id, name, slug")
        .single();

    if (error) throw error;

    return data as unknown as CategoryAPIDataStructure;
}
