import {Tables} from "@/types";
import supabase from "@/utils/supabase";
import {generatePaginationData, getRange, PaginationProps} from "@/utils/pagination";

const TABLE_NAME = "quotes";

interface getAllQuotesProps {
    per_page?: number;
    page?: number;
    sort?: {
        column: keyof Pick<Tables<"quotes">, "created_at" | "source_id">,
        order: "asc" | "desc"
    }[];
    filter?: Partial<Record<keyof Pick<Tables<"quotes">, "category_id" | "source_id" | "media_detail_id">, string>>
}

export interface QuoteAPIDataStructure extends Tables<"quotes"> {
    category: Pick<Tables<"categories">, "id" | "name">
}

export interface GetAllQuotesAPIDataStructure extends Pick<Tables<"quotes">, "content" | "id" | "created_at"> {
    category: Pick<Tables<"categories">, "id" | "name">;
    source: Pick<Tables<"sources">, "id" | "name">;
    media_detail: Pick<Tables<"media_details">, "id" | "name">
}

export const getAllQuotes = async ({
    page,
    per_page,
    sort = [{column: "created_at", order: "desc"}],
    filter = {}
}: getAllQuotesProps = {}): Promise<{
    data: GetAllQuotesAPIDataStructure[];
    pagination?: PaginationProps;
}> => {
    const query = supabase
        .from(TABLE_NAME)
        .select("id, content, created_at, category:categories(id, name), source:sources(id, name), media_detail:media_details(id, name)", {count: "exact"});

    if (!!Object.keys(filter).length) {
        Object.keys(filter).forEach(key => {
            query.eq(key, filter[key as "category_id" | "source_id" | "media_detail_id"])
        })
    }

    sort.forEach(item => {
        query.order(item.column, {ascending: item.order === "asc"})
    })

    if (Number.isInteger(page) && Number.isInteger(per_page)) {
        const {from, to} = getRange(Number(per_page), Number(page))

        query.range(from, to);
    }

    const {data, count, error} = await query;

    if (error) throw error;

    return {
        data: data as unknown as GetAllQuotesAPIDataStructure[] || [],
        ...(Number.isInteger(page) && Number.isInteger(per_page) && {
            pagination: generatePaginationData(Number(per_page), Number(page), count || 0)
        })
    };
}

export const getQuote = async (id: string): Promise<Omit<Tables<"quotes">, "created_at"> | null> => {
    const {data, error} = await supabase
        .from(TABLE_NAME)
        .select("id, category_id, source_id, media_detail_id, content")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;

    return data;
}

interface storeQuoteParams {
    category_id: string;
    source_id: string;
    media_detail_id: string;
    content: string;
}

export const storeQuote = async (formData: storeQuoteParams): Promise<QuoteAPIDataStructure> => {
    const {data, error} = await supabase
        .from(TABLE_NAME)
        .insert(formData)
        .select("*, category:categories(id, name)")
        .single();

    if (error) throw error;

    return data as unknown as QuoteAPIDataStructure;
}

export const updateQuote = async ({
    id,
    formData
}: { id: string, formData: storeQuoteParams }): Promise<Omit<Tables<"quotes">, "created_at">> => {
    const {data, error} = await supabase
        .from(TABLE_NAME)
        .update(formData)
        .eq("id", id)
        .select("id, category_id, source_id, media_detail_id, content")
        .single();

    if (error) throw error;

    return data as unknown as QuoteAPIDataStructure;
}

export const deleteQuote = async (id: string): Promise<void> => {
    const {error} = await supabase.from(TABLE_NAME)
        .delete()
        .eq("id", id);

    if (error) throw error;
}
