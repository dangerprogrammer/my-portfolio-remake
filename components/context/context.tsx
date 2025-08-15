'use client';

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";
import pagesList from "../pages/pages-list";
import { Context } from "@/types";

const ContextApp = createContext<Context>({} as Context);

function GlobalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
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

function GlobalContext() {
    const contexts = useContext(ContextApp);

    return { ...contexts };
}

export { GlobalProvider, GlobalContext };