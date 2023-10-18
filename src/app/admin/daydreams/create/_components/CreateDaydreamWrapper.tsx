"use client";

import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import {CreateDreamFormInterface} from "@/app/admin/daydreams/_types";
import toast from "react-hot-toast";
import DaydreamService from "@/services/DaydreamService";
import {ACCEPTED_IMAGE_TYPES, DEFAULT_FORM_VALUES, MAX_FILE_SIZE} from "@/app/admin/daydreams/_data";
import {useRouter} from "next/navigation";
import {any, number, object, string, ZodType} from "zod";
import {parseInt} from "lodash";
import {Fragment, useState} from "react";
import {DaydreamAPIDataStructure} from "@/api/DaydreamAPI";
import {AlertDialog} from "@/components";
import {useOpenable} from "@/hooks";

export const createDreamSchema = object({
    shutter_speed: any().refine(item => !isNaN(parseInt(item)), "The shutter speed field is required."),
    aperture: any().refine(item => !isNaN(parseInt(item)), "The aperture field is required."),
    iso: any().refine(item => !isNaN(parseInt(item)), "The iso field is required."),
    year: number(),
    description: string().trim().min(1, 'The description field is required.'),
    image: object({
        file: (any() as ZodType<FileList>)
            .refine((files) => files?.length === 1, "The image field is required.")
            .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "Invalid file type. File type .jpg, .jpeg, .png and .webp files only are accepted."
            )
            .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `You're file is too large, max file size is 15MB.`),
        width: number(),
        height: number(),
        name: string().trim(),
        type: string().trim(),
        size: number()
    })
})

const CreateDaydreamWrapper = () => {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useOpenable();
    const [daydream, setDaydream] = useState<DaydreamAPIDataStructure | null>(null)

    const onSubmitHandler = async (value: CreateDreamFormInterface) => {
        const id = crypto.randomUUID();

        const data = await toast.promise(DaydreamService.store({
            formData: value,
            toasterId: id,
        }), {
            loading: `Creating your dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        if (data) setDaydream(data);
        onOpen();
    }

    const onAlertConfirmHandler = () => {
        setDaydream(null);
        onClose();
    }

    const onAlertCancelHandler = () => {
        if (!!daydream) {
            router.push(`/admin/daydreams/${daydream.id}`)
        }
    }

    return (
        <Fragment>
            <DaydreamForm
                item={DEFAULT_FORM_VALUES}
                onSubmit={onSubmitHandler}
                defaultImage={""}
                schema={createDreamSchema}
                title={`Create Daydream`}
            />

            {daydream && (
                <AlertDialog
                    title="Do you want to create another dream?"
                    cancelButtonText="No"
                    isOpen={isOpen}
                    onConfirm={onAlertConfirmHandler}
                    onClose={onAlertCancelHandler}
                />
            )}
        </Fragment>
    )
}

export default CreateDaydreamWrapper
