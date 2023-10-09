"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {BaseComponent} from "@/types";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {AuthError, User, UserResponse} from "@supabase/supabase-js";
import supabase from "@/utils/supabase";

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthContextInterface {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string;
    onLogin: (formData: LoginCredentials) => void;
    onLogout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
    isAuthenticated: false,
    user: null,
    error: "",
    onLogin: () => {
    },
    onLogout: () => {
    },
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: BaseComponent) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const getAuthenticatedSession = async () => {
            try {
                setIsLoading(true);
                const {data} = await supabase.auth.getSession();

                if (data.session?.user) {
                    setUser(data.session.user as User);
                }
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        getAuthenticatedSession();
    }, []);

    const onLogin = async (formData: LoginCredentials): Promise<UserResponse | void> => {
        try {
            setIsLoading(true);

            const {data} = await supabase.auth.signInWithPassword(
                formData
            );

            setUser(data.user as User);
            setError("");

            router.push(params.get('from') || "/admin");

            toast.success("You have successfully logged in!");
        } catch (error) {
            setError((error as AuthError).message);
        } finally {
            setIsLoading(false);
        }
    };

    const onLogout = async () => {
        try {
            setIsLoading(true);

            await supabase.auth.signOut();

            setUser(null);

            router.push("/");

            toast.success("Thank you for visiting!");
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                onLogin,
                onLogout,
                isLoading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};
