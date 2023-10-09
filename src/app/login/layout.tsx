import {BaseComponent} from "@/types";
import {AuthProvider} from "@/context/SupabaseContext";

const LoginLayout = ({children}: Pick<BaseComponent, 'children'>) => {
    return (
        <main>
            <AuthProvider>{children}</AuthProvider>
        </main>
    )
}

export default LoginLayout;
