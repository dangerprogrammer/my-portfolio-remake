import React, { Dispatch, SetStateAction } from "react";

import AboutMePage, { AboutMeHeader } from "./about-me/about-me";
import WelcomeHeader from "./welcome/welcome";

import styles from './index.module.scss';

import Rocket from '@/assets/svgs/rocket.svg';
import Person from '@/assets/svgs/person.svg';

import { page } from "@/types";

const pagesList: page[] = [
  {
    Element: WelcomeHeader, url: "/welcome", title: "Welcome", Icon: Rocket, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        console.log(pagesList);
      })
    }
  },
  {
    Element: AboutMeHeader, url: "/about-me", Page: AboutMePage, title: "About Me", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        console.log("item full visible 2");
      })
    }
  }
];

function ShowElement(tl: gsap.core.Timeline, item: Element, setActivePage: Dispatch<SetStateAction<page>>, that: page, show: Function) {
  let snapTimeout: NodeJS.Timeout;

  tl.to(item, {
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      onUpdate: () => {
        clearInterval(snapTimeout);

        snapTimeout = setTimeout(() => {
          if (fullyVisible(item)) snapTimeout = setTimeout(() => {
            show();

            pagesList.map(page => page.visible = !1);
            that.visible = !0;

            setActivePage(that);
          }, pagesList.find(({ visible }) => visible) ? 0 : 1000);
        }, 500);
      }
    }
  });
};

function fullyVisible(el: Element) {
  const rect = el.getBoundingClientRect();

  return rect.left >= -100 && rect.right <= window.innerWidth + 100;
}

pagesList.forEach(({ Element }, i) => {
  pagesList[i].Element = () => <section className={styles.page}>
    <Element />
  </section>
});

export default pagesList;