import supabase from "@/utils/supabase";
import {Tables, UploadData} from "@/types";

export type Buckets = 'images';

export interface StoreFileParams {
    pathname: string;
    bucket_name: Buckets;
    data: UploadData<File>;
}

interface DeleteFileParams {
    fileId: string;
    bucket_name: string;
    pathname: string;
}

export const getStoragePublicUrl = (path: string): string => {
    const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(path);

    return data.publicUrl;
}

export const storeFile = async ({
    data: {file, ...files},
    pathname,
    bucket_name
}: StoreFileParams): Promise<Tables<'files'>> => {
    const bucketResult = await supabase.storage
        .from(bucket_name)
        .upload(`${pathname}/${files.name}`, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (bucketResult.error) throw bucketResult.error;

    const fileResult = await supabase.from('files')
        .insert({
            ...files,
            bucket_name: bucket_name,
            storage_file_path: bucketResult.data!.path
        })
        .select()
        .single();

    if (fileResult.error) throw fileResult.error;

    return fileResult.data;
}

export const deleteFile = async ({fileId, bucket_name, pathname}: DeleteFileParams): Promise<void> => {
    const fileResult = await supabase.from('files')
        .delete()
        .eq('id', fileId);

    if (fileResult.error) throw fileResult.error;

    const bucketResult = await supabase.storage
        .from(bucket_name)
        .remove([pathname]);

    if (bucketResult.error) throw bucketResult.error;
}
