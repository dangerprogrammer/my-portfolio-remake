'use client';

import { usePathname } from "next/navigation";
import { createContext, useState } from "react";
import pagesList from "../pages/pages-list";
import { Context } from "@/types";

const ContextApp = createContext<Context>({} as Context);

function ContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname(),
        [history, setHistory] = useState([pathname]),
        [activePage, setActivePage] = useState(pagesList[0]),
        [snapping, setSnapping] = useState(false);

    return <ContextApp.Provider value={{
        history, setHistory,
        activePage, setActivePage,
        snapping, setSnapping
        }}>
        {children}
    </ContextApp.Provider>
}

export { ContextApp };

export default ContextProvider;