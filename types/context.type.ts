import { Dispatch, SetStateAction } from "react";
import { page } from ".";

export type Context = {
    history: string[];
    setHistory: Dispatch<SetStateAction<string[]>>;
    activePage: page;
    setActivePage: Dispatch<SetStateAction<page>>;
};