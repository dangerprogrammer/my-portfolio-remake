'use client';

import { Registry } from "@/types";
import { createContext, createRef, ReactNode, useContext, useRef } from "react";

function createRefContext<T extends Record<string, any>>() {
    const Context = createContext<Registry<T> | null>(null);

    function Provider({ children }: { children: ReactNode }) {
        const store = useRef<Partial<{ [K in keyof T]: React.RefObject<T[K]> }>>({});

        const api: Registry<T> = {
            getRef: key => {
                let r = store.current[key];

                if (!r) {
                    r = createRef<T[typeof key]>() as React.RefObject<T[typeof key]>;
                    store.current[key] = r;
                }

                return r;
            },
            logRef: () => {
                console.log(store.current);
            },
        };

        return <Context.Provider value={api}>{children}</Context.Provider>;
    }

    function refContext(): Registry<T> {
        const contexts = useContext(Context)!;

        return contexts;
    }

    return { Provider, refContext };
}

export const { Provider: RefProvider, refContext } = createRefContext();