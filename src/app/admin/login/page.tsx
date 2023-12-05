import LoginForm from "@/app/admin/login/_components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Login",
};

const LoginPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoginForm />
  </div>
);

export default LoginPage;
