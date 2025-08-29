'use client';

import { Registry, RegistryAll, Store } from '@/types';
import { createContext, createRef, ReactNode, useContext, useRef } from 'react';

const Context = createContext<Registry<any> | undefined>(undefined);

function RefProvider<T extends Record<string, any>>({ children }: { children: ReactNode; }) {
    const store = useRef<Store<T>>({});

    const values: Registry<T> = {
        getRef: <K extends keyof T>(key: K, index?: number): React.RefObject<T[K]> => {
            if (store.current[key] === undefined)
                store.current[key] = (index !== undefined ? ([] as React.RefObject<T[K]>[]) : createRef<T[K]>()) as Store<T>[K];

            if (Array.isArray(store.current[key])) {
                const arr = store.current[key] as React.RefObject<T[K]>[];
                const idx = index ?? arr.length;

                if (!arr[idx])
                    arr[idx] = createRef<T[K]>() as React.RefObject<T[K]>;

                return arr[idx];
            }

            return store.current[key] as React.RefObject<T[K]>;
        },
        all: ((key?: keyof T) => key ? store.current[key] : store.current) as RegistryAll<T>
    };

    return <Context.Provider value={values}>{children}</Context.Provider>;
}

function useRefs<T extends Record<string, any>>(): Registry<T> {
    const context = useContext(Context)!;

    return context;
}

function fixCloneRef({ all }: Registry<any>): { [key: string]: any } {
  const refs: any = all(), cloneRefs: { [key: string]: any } = {};

    Object.keys(refs).map(ref => (
    cloneRefs[ref] = Array.isArray(refs[ref]) ? [] : refs[ref].current,
    Array.isArray(refs[ref]) && refs[ref].map((r, i) => cloneRefs[ref][i] = r.current)
  ));

  return cloneRefs;
}

export { RefProvider, useRefs, fixCloneRef };