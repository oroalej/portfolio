import supabase from "@/utils/supabase";
import {Tables} from "@/types";
import {generatePaginationData, getRange, PaginationProps} from "@/utils/pagination";

interface getAllDaydreamsProps {
    per_page?: number;
    page?: number;
    sort?: keyof Pick<Tables<'daydreams'>, "created_at" | "iso" | "year" | "aperture" | "shutter_speed">,
    asc?: boolean
}

export interface DaydreamAPIDataStructure extends Omit<Tables<'daydreams'>, "file_id"> {
    file: Omit<Tables<'files'>, "bucket_name" | "duration" | "created_at">
}

export const getAllDaydreams = async (props: getAllDaydreamsProps = {}): Promise<{
    data: DaydreamAPIDataStructure[],
    pagination?: PaginationProps
}> => {
    const {page, per_page, sort = 'created_at', asc = false} = props;
    const query = supabase
        .from('daydreams')
        .select("id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)", {count: "exact"})
        .order(sort, {ascending: asc});

    if (Number.isInteger(page) && Number.isInteger(per_page)) {
        const {from, to} = getRange(Number(per_page), Number(page))

        query.range(from, to);
    }

    const {data, count, error} = await query;

    if (error) throw error;

    return {
        data: data as unknown as DaydreamAPIDataStructure[] || [],
        ...(Number.isInteger(page) && Number.isInteger(per_page) && {
            pagination: generatePaginationData(Number(per_page), Number(page), count || 0)
        })
    };
}

export const getDaydream = async (id: string): Promise<DaydreamAPIDataStructure | null> => {
    const {data, error} = await supabase
        .from('daydreams')
        .select("id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)")
        .eq('id', id)
        .limit(1)
        .single();

    if (error) throw error;

    return (data as unknown as DaydreamAPIDataStructure);
}

export const storeDaydream = async (formData: Required<Omit<Tables<'daydreams'>, 'created_at' | 'id'>>): Promise<DaydreamAPIDataStructure> => {
    const {data, error} = await supabase
        .from("daydreams")
        .insert(formData)
        .select("id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)")
        .single();

    if (error) throw error;

    return data as unknown as DaydreamAPIDataStructure;
}

export const updateDaydream = async (id: string, formData: Required<Omit<Tables<'daydreams'>, 'created_at' | 'id'>>): Promise<DaydreamAPIDataStructure> => {
    const {data, error} = await supabase
        .from("daydreams")
        .update(formData)
        .eq('id', id)
        .select("id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)")
        .single();

    if (error) throw error;

    return data as unknown as DaydreamAPIDataStructure;
}
