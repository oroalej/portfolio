"use client";

import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import {CreateDreamFormInterface} from "@/app/admin/daydreams/_types";
import toast from "react-hot-toast";
import DaydreamService from "@/services/DaydreamService";
import {DEFAULT_FORM_VALUES} from "@/app/admin/daydreams/_data";
import {useRouter} from "next/navigation";
import {createDreamSchema} from "@/app/admin/daydreams/create/_validations";

const CreateDaydreamWrapper = () => {
    const router = useRouter();

    const onSubmitHandler = async (value: CreateDreamFormInterface) => {
        const id = crypto.randomUUID();

        const data = await toast.promise(DaydreamService.store({
            formData: value,
            toasterId: id,
        }), {
            loading: `Updating your dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        router.push(`/admin/daydreams/${data!.id}`)
    }

    return (
        <DaydreamForm
            item={DEFAULT_FORM_VALUES}
            onSubmit={onSubmitHandler}
            defaultImage={""}
            schema={createDreamSchema}
            title={`Create Daydream`}
        />
    )
}

export default CreateDaydreamWrapper
