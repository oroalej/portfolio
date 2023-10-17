import {SearchableSelect, SearchableSelectProps, SelectItem} from "@/components";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {getAllCategories, storeCategory} from "@/api/CategoryAPI";

const CategorySearchableSelect = ({
    onChange,
    ...props
}: Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name">) => {
    const [list, setList] = useState<SelectItem<string>[]>([])

    const fetchData = async () => {
        try {
            const data = (await getAllCategories()).map(category => ({
                text: category.name,
                value: category.id
            }));

            setList(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchData().catch(error => console.log(error));
    }, []);

    const onCreateHandler = async (value: string) => {
        try {
            const data = await toast.promise(storeCategory(value), {
                loading: `Creating ${value} category...`,
                success: `Category ${value} has been successfully created!`,
                error: "I'm sorry, something went wrong"
            });

            await fetchData();

            onChange(data.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SearchableSelect
            {...props}
            name="category"
            options={list}
            onChange={onChange}
            onCreate={onCreateHandler}
        />
    )
}

export default CategorySearchableSelect;
