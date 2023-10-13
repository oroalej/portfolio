import {CreateDreamFormInterface} from "@/app/admin/daydreams/_types";
import toast from "react-hot-toast";
import {deleteFile, storeFile} from "@/api/ImageAPI";
import {PostgrestError} from "@supabase/supabase-js";
import {DaydreamAPIDataStructure, deleteDaydream, storeDaydream, updateDaydream} from "@/api/DaydreamAPI";

export interface StoreDreamParams {
    formData: CreateDreamFormInterface,
    toasterId: string
}

export interface UpdateDreamParams extends StoreDreamParams {
    item: DaydreamAPIDataStructure
}

const DaydreamService = {
    store: async ({formData: {image, ...daydreamData}, toasterId}: StoreDreamParams) => {
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
    },

    update: async ({formData: {image, ...daydreamData}, toasterId, item}: UpdateDreamParams) => {
        let id = item.file.id;

        try {
            if (image.file) {
                toast.loading(`Deleting ${item.file.name} image to storage...`, {id: toasterId});

                await deleteFile({
                    fileId: item.file.id,
                    pathname: item.file.storage_file_path,
                    bucket_name: "images"
                })

                toast.loading(`Saving ${image.name} image to storage...`, {id: toasterId});

                const result = await storeFile({
                    data: {
                        ...image,
                        file: image.file![0],
                    },
                    pathname: "daydreams",
                    bucket_name: "images"
                });

                id = result.id
            }

            toast.loading("Updating information to daydreams table...", {id: toasterId});

            return await updateDaydream(item.id, {...daydreamData, file_id: id});
        } catch (error) {
            toast.error((error as PostgrestError).message, {id: toasterId})
        }
    },

    delete: async ({item, toasterId}: { item: DaydreamAPIDataStructure, toasterId: string }) => {
        try {
            toast.loading("Deleting information in daydreams table...", {id: toasterId});

            await deleteDaydream(item.id);

            toast.loading(`Deleting ${item.file.name} image to storage...`, {id: toasterId});

            await deleteFile({
                fileId: item.file.id,
                pathname: item.file.storage_file_path,
                bucket_name: "images"
            })
        } catch (error) {
            toast.error((error as PostgrestError).message, {id: toasterId})
        }
    }
}

export default DaydreamService;
