'use client';

import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

const ContextApp = createContext({});

function ContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname(),
        [ history, setHistory ] = useState([pathname]);

    return <ContextApp.Provider value={{ history, setHistory }}>
        {children}
    </ContextApp.Provider>
}

export { ContextApp };

export default ContextProvider;