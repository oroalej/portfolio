import LoginForm from "@/app/login/_components/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Alexander Jeam Oro - Login"
}

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoginForm/>
        </div>
    )
}

export default LoginPage;
