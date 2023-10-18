"use client";

import {omit, parseInt} from "lodash";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import {CreateDreamFormInterface} from "@/app/admin/daydreams/_types";
import {DaydreamAPIDataStructure, getDaydream} from "@/api/DaydreamAPI";
import toast from "react-hot-toast";
import DaydreamService from "@/services/DaydreamService";
import {Fragment, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";
import {any, number, object, string, ZodType} from "zod";
import {ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE} from "@/app/admin/daydreams/_data";
import {AlertDialog} from "@/components";
import {useLoadable, useOpenable} from "@/hooks";

export const EditDreamSchema = object({
    shutter_speed: any().refine(item => !isNaN(parseInt(item)), "The shutter speed field is required."),
    aperture: any().refine(item => !isNaN(parseInt(item)), "The aperture field is required."),
    iso: any().refine(item => !isNaN(parseInt(item)), "The iso field is required."),
    year: number(),
    description: string().trim().min(1, 'The description field is required.'),
    image: object({
        file: (any() as ZodType<FileList>)
            .optional()
            .refine(
                (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "Invalid file type. File type .jpg, .jpeg, .png and .webp files only are accepted."
            )
            .refine((files) => !files || files?.[0]?.size <= MAX_FILE_SIZE, `You're file is too large, max file size is 15MB.`),
        width: number(),
        height: number(),
        name: string().trim(),
        type: string().trim(),
        size: number()
    })
});

const EditDaydreamWrapper = () => {
    const router = useRouter();
    const {daydreamId} = useParams();

    const {isOpen, onClose, onOpen} = useOpenable();
    const {isLoading, startLoading, endLoading} = useLoadable();

    const [item, setItem] = useState<DaydreamAPIDataStructure | null>(null);

    useEffect(() => {
        getDaydream(daydreamId as string).then(response => setItem(response))
    }, [daydreamId])

    const onSubmitHandler = async (value: CreateDreamFormInterface) => {
        const id = crypto.randomUUID();

        const data = await toast.promise(DaydreamService.update({
            formData: value,
            toasterId: id,
            item: item as DaydreamAPIDataStructure
        }), {
            loading: `Updating your dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        setItem(data as DaydreamAPIDataStructure);
    }

    const onDeleteHandler = async () => {
        startLoading();
        const id = crypto.randomUUID();

        await toast.promise(DaydreamService.delete({
            toasterId: id,
            item: item as DaydreamAPIDataStructure
        }), {
            loading: `Deleting ${item!.id} dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        endLoading();

        router.push("/admin/daydreams")
    }

    if (item === null) {
        return <DaydreamFormLoading
            title="Update Daydream"
            cancelButtonText="Reset"
            submitButtonText="Update"
        />
    }

    return (
        <Fragment>
            <DaydreamForm
                item={{
                    ...omit(item, ['id', 'file', 'created_at']),
                    image: {
                        ...omit(item.file, ['storage_file_path', 'id']),
                        file: null
                    }
                }}
                onSubmit={onSubmitHandler}
                onDelete={onOpen}
                defaultImage={getStoragePublicUrl(item.file.storage_file_path)}
                schema={EditDreamSchema}
                title={`Edit Daydream`}
                submitButtonText="Update"
                cancelButtonText="Reset"
            />

            <AlertDialog
                onConfirm={onDeleteHandler}
                isOpen={isOpen}
                onClose={onClose}
                confirmButtonText="Yes, delete"
                confirmButtonColor="danger"
                title="Delete Dream"
                isLoading={isLoading}
            >
                Are you sure you want to delete this dream? This action cannot be undone.
            </AlertDialog>
        </Fragment>

    )
}

export default EditDaydreamWrapper;
