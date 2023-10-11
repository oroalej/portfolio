import {any, number, object, string, ZodType} from "zod";
import {ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE} from "@/app/admin/daydreams/create/_data";
import {parseInt} from "lodash";

export const createDreamSchema = object({
    image: (any() as ZodType<FileList>)
        .refine((files) => files?.length == 1, "The image field is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `You're file is too large, max file size is 15MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Invalid file type. File type .jpg, .jpeg, .png and .webp files only are accepted."
        ),
    shutter_speed: any().refine(item => !isNaN(parseInt(item)), "The shutter speed field is required."),
    aperture: any().refine(item => !isNaN(parseInt(item)), "The aperture field is required."),
    iso: any().refine(item => !isNaN(parseInt(item)), "The iso field is required."),
    year: number(),
    description: string().trim().min(1, 'The description field is required.')
})
