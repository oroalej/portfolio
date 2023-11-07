'use client'

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const ReactQueryClientProvider = ({children}: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0
            }
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryClientProvider;
