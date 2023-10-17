import {SearchableSelect, SearchableSelectProps, SelectItem} from "@/components";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {getAllMediaBySourceId, storeMediaDetail} from "@/api/MediaDetailAPI";
import {titleCase} from "@/utils";

interface SelectProps extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
    sourceId: string
}

const MediaDetailSearchableSelect = ({sourceId, onChange, ...props}: SelectProps) => {
    const [list, setList] = useState<SelectItem<string>[]>([])

    const fetchData = useCallback(async () => {
        if (sourceId) {
            try {
                const data = (await getAllMediaBySourceId(sourceId)).map(media => ({
                    text: media.name,
                    value: media.id
                })) || [];

                setList(data);
            } catch (error) {
                console.log(error)
            }
        }
    }, [sourceId])

    const onCreateHandler = async (value: string) => {
        try {
            const name = titleCase(value);
            const data = await toast.promise(storeMediaDetail({
                source_id: sourceId,
                name
            }), {
                loading: `Creating ${name} media detail...`,
                success: `${name} has been successfully created!`,
                error: "I'm sorry, something went wrong"
            });

            await fetchData();

            onChange(data.id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [fetchData])

    return (
        <SearchableSelect
            name="media_detail"
            {...props}
            options={list}
            onChange={onChange}
            onCreate={onCreateHandler}
        />
    )
}

export default MediaDetailSearchableSelect;
