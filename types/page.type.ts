import { JSX } from "react";

export type page = {
    Element: () => JSX.Element;
    url: string;
    Page?: () => JSX.Element;
    title: string;
    timeline: (tl: gsap.core.Timeline, elem: Element) => void;
    Icon: any;
    visible?: boolean;
}