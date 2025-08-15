import { page } from ".";

export type Context = {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  activePage: page;
  setActivePage: React.Dispatch<React.SetStateAction<page>>;
  snapping: boolean;
  setSnapping: React.Dispatch<React.SetStateAction<boolean>>;
};

type StoreValue<T> = React.RefObject<T> | React.RefObject<T>[];
export type Store<T> = Partial<{ [K in keyof T]: StoreValue<T[K]> }>;

export type Registry<T> = {
  getRef: <K extends keyof T>(key: K, index?: number) => React.RefObject<T[K]>;
  all: <K extends keyof T>(key?: K) => 
    K extends undefined 
      ? Partial<{ [P in keyof T]: React.RefObject<T[P]> | React.RefObject<T[P]>[] }>
      : React.RefObject<T[K]> | React.RefObject<T[K]>[];
};

export type RegistryAll<T> = {
  (): Partial<{ [K in keyof T]: React.RefObject<T[K]>[] }>;
  <K extends keyof T>(key: K): React.RefObject<T[K]>[];
};