import {SearchableSelect, SearchableSelectProps, SelectItem} from "@/components";
import {useCallback, useEffect, useState} from "react";
import {getSourceByCategoryId, storeSource} from "@/api/SourceAPI";
import toast from "react-hot-toast";

interface SelectProps extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
    categoryId: string
}

const SourceSearchableSelect = ({categoryId, onChange, ...props}: SelectProps) => {
    const [list, setList] = useState<SelectItem<string>[]>([]);

    const fetchData = useCallback(async () => {
        if (categoryId) {
            try {
                const data = (await getSourceByCategoryId(categoryId)).map(source => ({
                    text: source.name,
                    value: source.id
                })) || [];

                setList(data);
            } catch (error) {
                console.log(error)
            }
        }
    }, [categoryId])

    const onCreateHandler = async (value: string) => {
        try {
            const data = await toast.promise(storeSource({
                category_id: categoryId,
                name: value
            }), {
                loading: `Creating ${value} source...`,
                success: `Source ${value} has been successfully created!`,
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
            {...props}
            name="source"
            options={list}
            onChange={onChange}
            onCreate={onCreateHandler}
        />
    )
}

export default SourceSearchableSelect;
