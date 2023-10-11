import supabase from "@/utils/supabase";

export type Buckets = 'images';

export interface StoreFileParams {
    file: File,
    pathname: string,
    bucket: Buckets
}

export const getStoragePublicUrl = (path: string): string => {
    const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(path);

    return data.publicUrl;
}

export const storeFile = async ({file, pathname, bucket}: StoreFileParams) => {
    const {data, error} = await supabase.storage
        .from(bucket)
        .upload(`${pathname}/${file.name}`, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (error) throw error;

    return data!.path;
}
