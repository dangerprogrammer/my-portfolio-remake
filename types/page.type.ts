import { Dispatch, JSX, SetStateAction } from "react";

export type page = {
    Element?: () => JSX.Element;
    url: string;
    Page?: () => JSX.Element;
    title: string;
    timeline: (tl: gsap.core.Timeline, elem: Element, setActivePage: Dispatch<SetStateAction<page>>) => void;
    Icon: any;
    visible?: boolean;
}