'use client';

import { usePathname } from "next/navigation";
import { createContext, useState } from "react";
import pagesList from "../pages";

const ContextApp = createContext({});

function ContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname(),
        [history, setHistory] = useState([pathname]),
        [activePage, setActivePage] = useState(pagesList[0].title);

    return <ContextApp.Provider value={{ history, setHistory, activePage, setActivePage }}>
        {children}
    </ContextApp.Provider>
}

export { ContextApp };

export default ContextProvider;