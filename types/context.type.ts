import { page } from ".";

export type Context = {
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
    activePage: page;
    setActivePage: React.Dispatch<React.SetStateAction<page>>;
    snapping: boolean;
    setSnapping: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Registry<T extends Record<string, any>> = {
  getRef: <K extends keyof T>(key: K) => React.RefObject<T[K]>;
  logRef: () => void;
};