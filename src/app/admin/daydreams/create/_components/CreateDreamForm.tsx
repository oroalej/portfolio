"use client";

import {
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    CardRoot,
    CardTitle,
    FormErrorMessage,
    FormGroup,
    Label,
    SearchableSelect,
    SingleSimpleSelect,
    Textarea
} from "@/components";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {APERTURE, DEFAULT_FORM_VALUES, ISO, SHUTTER_SPEED, YEARS} from "@/app/admin/daydreams/create/_data";
import {FormEvent, useRef, useState} from "react";
import {PiImageLight, PiX} from "react-icons/pi";
import Image from "next/image";
import classNames from "classnames";
import {createDreamSchema} from "@/app/admin/daydreams/create/_validations";
import {isEmpty} from "lodash";
import {SelectDataFormatter} from "@/utils";
import {CreateDreamFormInterface} from "@/app/admin/daydreams/create/_types";
import toast from "react-hot-toast";
import DaydreamService from "@/services/DaydreamService";

const CreateDreamForm = () => {
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [localImage, setLocalImage] = useState({
        blob: "",
        filename: ""
    })

    const {
        handleSubmit,
        formState,
        control,
        getValues,
        register,
        reset,
        resetField
    } = useForm<CreateDreamFormInterface>({
        mode: "onChange",
        defaultValues: DEFAULT_FORM_VALUES,
        resolver: zodResolver(createDreamSchema),
    })

    const {ref: imageRegisterRef, onChange: imageRegisterChange, ...imageRegister} = register("image");

    const onSubmitHandler = async () => {
        const id = crypto.randomUUID();

        await toast.promise(DaydreamService.store({
            formData: getValues(),
            toasterId: id
        }), {
            loading: `Saving your dream...`,
            success: "Your data has been saved successfully!",
            error: "I'm sorry, something went wrong"
        }, {
            id
        });

        onResetFormHandler();
    }

    const onImageInputHandler = async (event: FormEvent<HTMLInputElement>) => {
        const files = event.currentTarget?.files || [];

        await imageRegisterChange(event);

        if (files.length) {
            const imageFile = files[0];

            setLocalImage({
                blob: URL.createObjectURL(imageFile),
                filename: imageFile.name
            });
        } else onResetImageInputHandler()
    }

    const onResetImageInputHandler = () => {
        resetField('image', {keepDirty: false})

        setLocalImage({
            blob: "",
            filename: ""
        })

        if (imageInputRef?.current) {
            imageInputRef.current.value = "";
        }
    }

    const onResetFormHandler = () => {
        onResetImageInputHandler();
        reset(DEFAULT_FORM_VALUES)
    }

    return (
        <form method="post" onSubmit={(event: FormEvent) =>
            handleSubmit(onSubmitHandler)(event)
        }>
            <fieldset className="disabled:opacity-95" disabled={formState.isSubmitting}>
                <CardRoot>
                    <CardHeader>
                        <CardTitle>Create Dream</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="grid gap-6 grid-cols-2">
                            <FormGroup className="flex flex-col">
                                <Label>Image: </Label>

                                <small className="leading-snug block text-neutral-500 text-xs mb-2">
                                    File types supported: JPG, JPEG, PNG, and WEBP. Max size: 15 MB
                                </small>

                                <div
                                    className={classNames("relative grow group border cursor-pointer", [
                                        !!formState.errors?.image ? "border-red-700" : "border-neutral-200"
                                    ])}>
                                    <div className="h-full w-full"
                                         onClick={() => imageInputRef && imageInputRef.current?.click()}>
                                        {!!localImage.blob ? (
                                            <div className="relative w-full h-full bg-neutral-200">
                                                <Image
                                                    src={localImage.blob}
                                                    alt={localImage.filename}
                                                    className="w-full h-full object-contain pointer-events-none group-hover:opacity-90"
                                                    fill
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={classNames("absolute inset-0 flex items-center justify-center z-10", [
                                                    !!formState.errors?.image ? "bg-red-100 text-red-700" : "hover:bg-neutral-200 hover:bg-opacity-25 text-neutral-600"
                                                ])}>
                                                <span
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    <PiImageLight size={28}/>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {!!localImage.blob && (
                                        <button
                                            className="absolute top-1 right-2 p-2 text-neutral-700 transition-all opacity-0 group-hover:opacity-100 z-10"
                                            onClick={onResetImageInputHandler}
                                        >
                                            <PiX size={24}/>
                                        </button>
                                    )}

                                    <input
                                        accept="image/jpg,.jpg,image/jpeg,.jpeg,image/png,.png,image/webp,.webp"
                                        type="file"
                                        className="hidden"
                                        tabIndex={-1}
                                        ref={(ref) => {
                                            imageRegisterRef(ref);
                                            imageInputRef.current = ref;
                                        }}
                                        onChange={onImageInputHandler}
                                        {...imageRegister}
                                    />
                                </div>

                                {formState.errors?.image && (
                                    <div className="mt-1.5">
                                        <FormErrorMessage>{formState.errors.image.message}</FormErrorMessage>
                                    </div>
                                )}
                            </FormGroup>

                            <div>
                                <h3 className="text-lg font-bold text-neutral-600 mb-3">Details: </h3>

                                <FormGroup>
                                    <Label required htmlFor="input-year">Year</Label>

                                    <Controller
                                        name="year"
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={DEFAULT_FORM_VALUES.year}
                                        render={({field: {onChange, value}, fieldState}) => (
                                            <SingleSimpleSelect<number>
                                                options={YEARS}
                                                value={value}
                                                onChange={onChange}
                                                defaultValue={DEFAULT_FORM_VALUES.year}
                                                error={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label required htmlFor="input-description">Description</Label>

                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={DEFAULT_FORM_VALUES.description}
                                        render={({field: {onChange, value}, fieldState}) => (
                                            <Textarea
                                                id="input-description"
                                                rows={3}
                                                className="resize-none"
                                                onChange={onChange}
                                                value={value}
                                                error={fieldState.error?.message}
                                                maxLength={1000}
                                            />
                                        )}
                                    />
                                </FormGroup>

                                <h3 className="text-lg font-bold text-neutral-600 mb-3">Camera Setting: </h3>

                                <FormGroup>
                                    <Label required htmlFor="input-iso">ISO</Label>

                                    <Controller
                                        name="iso"
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={DEFAULT_FORM_VALUES.iso as any}
                                        render={({field: {onChange, value}, fieldState}) => (
                                            <SearchableSelect
                                                value={value}
                                                options={SelectDataFormatter<number>(ISO)}
                                                onChange={onChange}
                                                defaultValue={DEFAULT_FORM_VALUES.iso}
                                                error={fieldState.error?.message}
                                                clearable
                                            />
                                        )}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label required htmlFor="input-shutter-speed">Shutter Speed</Label>

                                    <Controller
                                        name="shutter_speed"
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                                        render={({field: {onChange, value}, fieldState}) => (
                                            <SearchableSelect
                                                options={SelectDataFormatter<number>(SHUTTER_SPEED)}
                                                value={value}
                                                onChange={onChange}
                                                defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                                                error={fieldState.error?.message}
                                                clearable
                                            />
                                        )}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label required htmlFor="input-aperture">Aperture</Label>

                                    <Controller
                                        name="aperture"
                                        control={control}
                                        rules={{required: true}}
                                        defaultValue={DEFAULT_FORM_VALUES.aperture}
                                        render={({field: {onChange, value}, fieldState}) => (
                                            <SearchableSelect
                                                options={SelectDataFormatter<number>(APERTURE)}
                                                value={value}
                                                onChange={onChange}
                                                defaultValue={DEFAULT_FORM_VALUES.aperture}
                                                error={fieldState.error?.message}
                                                clearable
                                            />
                                        )}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="justify-end gap-3">
                        <Button
                            type="button"
                            disabled={formState.isDirty || formState.isSubmitting}
                            onClick={onResetFormHandler}
                            variant="plain"
                            color="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!isEmpty(formState.errors) || !formState.isValid}
                            isLoading={formState.isSubmitting}
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </CardRoot>
            </fieldset>
        </form>
    )
};

export default CreateDreamForm;
