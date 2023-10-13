"use client";

import {omit} from "lodash";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {EditDreamSchema} from "@/app/admin/daydreams/[daydreamId]/_validations";
import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import {CreateDreamFormInterface} from "@/app/admin/daydreams/_types";
import {DaydreamAPIDataStructure, getDaydream} from "@/api/DaydreamAPI";
import toast from "react-hot-toast";
import DaydreamService from "@/services/DaydreamService";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/DaydreamFormLoading";

const EditDaydreamWrapper = () => {
    const {daydreamId} = useParams();
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

    if (item) {
        return <DaydreamForm
            item={{
                ...omit(item, ['id', 'file', 'created_at']),
                image: {
                    ...omit(item.file, ['storage_file_path', 'id']),
                    file: null
                }
            }}
            onSubmit={onSubmitHandler}
            defaultImage={getStoragePublicUrl(item.file.storage_file_path)}
            schema={EditDreamSchema}
            title={`Edit Daydream`}
            submitButtonText="Update"
            cancelButtonText="Reset"
        />
    }

    return <DaydreamFormLoading/>
}

export default EditDaydreamWrapper;
