import { Dispatch, JSX, SetStateAction } from "react";
import { Context } from ".";

export type page = {
    Element?: ({ globalContexts }: { globalContexts: Context }) => JSX.Element;
    url: string;
    Page?: () => JSX.Element;
    title: string;
    timeline: (tl: gsap.core.Timeline, elem: Element, setActivePage: Dispatch<SetStateAction<page>>) => void;
    headerProps: headerProps;
    Icon: any;
    visible?: boolean;
}

export type headerProps = {
    title: string;
    desc: string;
};