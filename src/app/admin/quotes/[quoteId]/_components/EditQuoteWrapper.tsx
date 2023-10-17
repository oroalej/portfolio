"use client";

import QuoteForm, {QuoteFormStructure} from "@/app/admin/quotes/_components/QuoteForm";
import {any, object} from "zod";
import {Tables} from "@/types";
import {omit} from "lodash";
import {Fragment, useEffect, useState} from "react";
import {AlertDialog} from "@/components";
import {useLoadable, useOpenable} from "@/hooks";
import toast from "react-hot-toast";
import {deleteQuote, getQuote, updateQuote} from "@/api/QuoteAPI";
import {useParams, useRouter} from "next/navigation";
import QuoteFormLoading from "@/app/admin/quotes/_components/QuoteFormLoading";

const EditQuoteSchema = object({
    content: any().refine(data => data.length !== 0, "The content field is required"),
    category_id: any().refine(data => data !== null, "The category field is required"),
    source_id: any().refine(data => data !== null, "The source field is required"),
    media_detail_id: any().refine(data => data !== null, "The media detail field is required"),
})

const EditQuoteWrapper = () => {
    const router = useRouter();
    const {quoteId} = useParams();
    const {isOpen, onClose, onOpen} = useOpenable();
    const {isLoading, startLoading, endLoading} = useLoadable();
    const [item, setItem] = useState<Omit<Tables<'quotes'>, 'created_at'> | null>(null);

    useEffect(() => {
        if (!!quoteId) {
            getQuote(quoteId as string).then(response => setItem(response))
        }
    }, [quoteId])

    const onSubmitHandler = async (value: QuoteFormStructure) => {
        try {
            const data = await toast.promise(updateQuote({
                id: item!.id,
                formData: value
            }), {
                loading: `Deleting ${item!.id} dream...`,
                success: "Your data has been successfully updated!",
                error: "I'm sorry, something went wrong"
            });

            setItem(data)
        } catch (error) {
            console.log(error)
        }
    }

    const onDeleteHandler = async () => {
        startLoading();

        await toast.promise(deleteQuote(item!.id), {
            loading: `Deleting ${item!.id} dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        });

        endLoading();

        router.push("/admin/quotes")
    }

    if (!item) {
        return (
            <QuoteFormLoading
                cancelButtonText="Reset"
                submitButtonText="Update"
                title="Edit Quote"
            />
        )
    }

    return (
        <Fragment>
            <QuoteForm
                onSubmit={onSubmitHandler}
                onDelete={onOpen}
                schema={EditQuoteSchema}
                title="Edit Quote"
                item={{
                    ...omit(item, 'id')
                }}
                cancelButtonText="Reset"
                submitButtonText="Update"
            />

            <AlertDialog
                onConfirm={onDeleteHandler}
                isOpen={isOpen}
                onClose={onClose}
                confirmButtonText="Yes, delete"
                confirmButtonColor="danger"
                title="Delete Quote"
                isLoading={isLoading}
            >
                Are you sure you want to delete this quote? This action cannot be undone.
            </AlertDialog>
        </Fragment>
    )
}

export default EditQuoteWrapper;
