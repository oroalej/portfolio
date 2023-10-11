import {CreateDreamFormInterface} from "@/app/admin/daydreams/create/_types";
import toast from "react-hot-toast";
import ImageAPI from "@/api/ImageAPI";
import {storeDaydream} from "@/api/DaydreamAPI";
import {PostgrestError} from "@supabase/supabase-js";

interface StoreDreamParams {
    formData: CreateDreamFormInterface,
    toasterId: string
}

const DaydreamService = {
    store: async (params: StoreDreamParams) => {
        const {formData: {image, ...daydreamData}, toasterId} = params;

        try {
            toast.loading("Saving image to storage...", {id: toasterId});

            const path = await ImageAPI.store(image![0]);

            toast.loading("Saving information to daydreams table...", {id: toasterId});

            return await storeDaydream({image_path: path, ...daydreamData});
        } catch (error) {
            toast.error((error as PostgrestError).message, {id: toasterId})
        }
    }
}

export default DaydreamService;
