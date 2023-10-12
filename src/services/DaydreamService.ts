import {CreateDreamFormInterface} from "@/app/admin/daydreams/create/_types";
import toast from "react-hot-toast";
import {storeFile} from "@/api/ImageAPI";
import {PostgrestError} from "@supabase/supabase-js";
import {storeDaydream} from "@/api/DaydreamAPI";

export interface StoreDreamParams {
    formData: CreateDreamFormInterface,
    toasterId: string
}

const DaydreamService = {
    store: async (params: StoreDreamParams) => {
        const {formData: {image, ...daydreamData}, toasterId} = params;

        try {
            toast.loading("Saving image to storage...", {id: toasterId});

            const result = await storeFile({
                data: {
                    ...image,
                    file: image.file![0],
                },
                pathname: "daydreams",
                bucket_name: "images"
            });

            toast.loading("Saving information to daydreams table...", {id: toasterId});

            return await storeDaydream({...daydreamData, file_id: result.id});
        } catch (error) {
            toast.error((error as PostgrestError).message, {id: toasterId})
        }
    }
}

export default DaydreamService;
