import { Dispatch, SetStateAction } from "react";

import navbarStyles from '../navbar/navbar.module.scss';

import { page } from "@/types";
import { embbedList } from "../navbar/navbar";
import pagesList from "./pages-list";
import gsap from "gsap";

let firstRender: boolean = !0;
function updateNavbarTitles(progress: number) {
  const scrollList = gsap.utils.toArray<Element>(`.${navbarStyles.headerList} > li`);

  scrollList.forEach((scroll, i) => gsap.to(scroll, {
    scrollTo: {
      x: (scroll.scrollWidth - scroll.clientWidth) * (progress * (pagesList.length - 1) / (embbedList.length - 1) + i / (embbedList.length - 1))
    },
    duration: .5,
    delay: .3
  }));

  if (firstRender) firstRender = !1;
};

function UpdateElement(itemPage: page, setActivePage: Dispatch<SetStateAction<page>>) {
  pagesList.map(page => page.visible = !1);
  itemPage.visible = !0;

  setActivePage(itemPage);

  updateNavbarTitles(pagesList.indexOf(itemPage) / (pagesList.length - 1));
};

export { UpdateElement };