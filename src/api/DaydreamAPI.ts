import supabase from "@/utils/supabase";
import {Tables} from "@/types";
import {generatePaginationData, getRange, PaginationProps} from "@/utils/pagination";

interface getAllDaydreamsProps {
    per_page?: number;
    page?: number;
    sort?: keyof Pick<Tables<'daydreams'>, "created_at" | "iso" | "year" | "aperture" | "shutter_speed">,
    asc?: boolean
}

const getAllDaydreams = async (props: getAllDaydreamsProps = {}): Promise<{
    data: Tables<'daydreams'>[],
    pagination?: PaginationProps
}> => {
    const {page, per_page, sort = 'created_at', asc = false} = props;
    const query = supabase
        .from('daydreams')
        .select("id, year, description, iso, shutter_speed, aperture, image_path, created_at", {count: "exact"})
        .order(sort, {ascending: asc});

    if (Number.isInteger(page) && Number.isInteger(per_page)) {
        const {from, to} = getRange(Number(per_page), Number(page))

        query.range(from, to);
    }

    const {data, count, error} = await query;

    if (error) throw error;

    return {
        data: data || [],
        ...(Number.isInteger(page) && Number.isInteger(per_page) && {
            pagination: generatePaginationData(Number(per_page), Number(page), count || 0)
        })
    };
}

const getDaydream = async (id: string) => {
    const {data, error} = await supabase
        .from('daydreams')
        .select("id, year, description, iso, shutter_speed, aperture, image_path")
        .eq('id', id)
        .limit(1)
        .single();

    if (error) throw error;

    return data;
}

const storeDaydream = async (formData: Required<Omit<Tables<'daydreams'>, 'created_at' | 'id'>>) => {
    const {data, error} = await supabase
        .from("daydreams")
        .insert(formData)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export {
    getAllDaydreams,
    getDaydream,
    storeDaydream
}
