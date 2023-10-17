"use client";

import {any, object} from "zod";
import QuoteForm, {QuoteFormStructure} from "@/app/admin/quotes/_components/QuoteForm";
import {QuoteAPIDataStructure, storeQuote} from "@/api/QuoteAPI";
import {useOpenable} from "@/hooks";
import {Fragment, useState} from "react";
import {AlertDialog} from "@/components";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export const CreateQuoteSchema = object({
    content: any().refine(data => data.length !== 0, "The content field is required"),
    category_id: any().refine(data => data !== null, "The category field is required"),
    source_id: any().refine(data => data !== null, "The source field is required"),
    media_detail_id: any().refine(data => data !== null, "The media detail field is required"),
});

const CreateQuoteWrapper = () => {
    const router = useRouter();
    const {isOpen, onOpen, onClose} = useOpenable();
    const [quote, setQuote] = useState<QuoteAPIDataStructure | null>(null);

    const onSubmitHandler = async (value: QuoteFormStructure) => {
        try {
            const data = await toast.promise(storeQuote(value), {
                loading: `Creating your quote...`,
                success: "Your data has been successfully created!",
                error: "I'm sorry, something went wrong"
            });

            onOpen();
            setQuote(data);
        } catch (error) {
            console.log(error)
        }
    }

    const onAlertConfirmHandler = () => {
        setQuote(null);
        onClose();
    }

    const onAlertCancelHandler = () => {
        if (!!quote) {
            router.push(`/admin/quotes/${quote.id}`)
        }
    }

    return (
        <Fragment>
            <QuoteForm
                onSubmit={onSubmitHandler}
                schema={CreateQuoteSchema}
                title="Create Quote"
            />

            {quote && (
                <AlertDialog
                    title="Do you want to create another quote?"
                    cancelButtonText="No"
                    onConfirm={onAlertConfirmHandler}
                    isOpen={isOpen}
                    onClose={onAlertCancelHandler}
                />
            )}
        </Fragment>
    )
}

export default CreateQuoteWrapper;
