import supabase from "@/utils/supabase";

const ImageAPI = {
    get: (path: string): string => {
        const {data} = supabase
            .storage
            .from('images')
            .getPublicUrl(path);

        return data.publicUrl;
    },

    store: async (file: File) => {
        const {data, error} = await supabase.storage
            .from("images")
            .upload(`daydreams/${file.name}`, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (error) throw error;

        return data!.path;
    }
}


export default ImageAPI;
