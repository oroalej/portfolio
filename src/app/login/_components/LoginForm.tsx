"use client";

import {FormEvent} from "react";
import {CardBody, CardFooter, CardHeader, CardRoot, CardTitle, FormGroup, Input, Label} from "@/components";
import {Controller, useForm} from "react-hook-form";
import {isEmpty} from "lodash";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string} from "zod";
import {useAuth} from "@/context/SupabaseContext";

const schema = object({
    email: string().email('The email field must be a valid email address.').trim().min(1, 'The email field is required.'),
    password: string().trim().min(1, 'The password field is required.')
})

const defaultValues = {
    email: "",
    password: ""
}

const LoginForm = () => {
    const {
        handleSubmit,
        formState,
        control,
        getValues
    } = useForm({
        mode: "onChange",
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
    })

    const {isLoading, onLogin, error} = useAuth()

    const onSubmitHandler = async () => {
        try {
            await onLogin(getValues())
            // reset(defaultValues);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form method="post" onSubmit={(event: FormEvent) =>
            handleSubmit(onSubmitHandler)(event)
        }>
            <CardRoot className="max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="uppercase">Welcome Back 🥳</CardTitle>
                </CardHeader>
                <CardBody>
                    {error && (
                        <div className="bg-red-200 text-red-800 p-4 mb-4 text-sm">{error}</div>
                    )}

                    <FormGroup>
                        <Label htmlFor="inputEmail">Email:</Label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: true}}
                            defaultValue={defaultValues.email}
                            render={({field: {onChange, value}, fieldState}) => (
                                <Input
                                    type="email"
                                    id="inputEmail"
                                    placeholder="juandelacruz@gmail.com"
                                    name="email"
                                    spellCheck={false}
                                    value={value}
                                    onChange={onChange}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="inputPassword">Password:</Label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: true}}
                            defaultValue={defaultValues.password}
                            render={({field: {onChange, value}, fieldState}) => (
                                <Input
                                    type="password"
                                    id="inputPassword"
                                    name="password"
                                    autoCorrect="off"
                                    value={value}
                                    onChange={onChange}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                    </FormGroup>
                </CardBody>
                <CardFooter className="justify-center">
                    <button
                        type="submit"
                        disabled={
                            !isEmpty(formState.errors) ||
                            !formState.isValid ||
                            isLoading ||
                            formState.isSubmitting
                        }
                        className="text-neutral-200 bg-neutral-800 block w-full px-4 py-2 hover:bg-opacity-90 transition-colors active:bg-opacity-100 cursor-pointer disabled:cursor-default disabled:bg-opacity-75">
                        Login
                    </button>
                </CardFooter>
            </CardRoot>
        </form>
    )
}

export default LoginForm;
