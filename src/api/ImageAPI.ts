import supabase from "@/utils/supabase";
import {UploadData} from "@/app/admin/daydreams/create/_types";
import {Tables} from "@/types";

export type Buckets = 'images';

export interface StoreFileParams {
    pathname: string;
    bucket_name: Buckets;
    data: UploadData<File>;
}

export const getStoragePublicUrl = (path: string): string => {
    const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(path);

    return data.publicUrl;
}

export const storeFile = async (props: StoreFileParams): Promise<Tables<'files'>> => {
    const {data, pathname, bucket_name} = props;
    const {file, ...files} = data;

    const storageResult = await supabase.storage
        .from(bucket_name)
        .upload(`${pathname}/${data.name}`, file , {
            cacheControl: "3600",
            upsert: true,
        });

    if (storageResult.error) throw storageResult.error;

    const fileResult = await supabase.from('files')
        .insert({
            ...files,
            bucket_name: bucket_name,
            storage_file_path: storageResult.data!.path
        })
        .select()
        .single();

    if (fileResult.error) throw fileResult.error;

    return fileResult.data;
}
