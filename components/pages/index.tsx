import React from "react";

import AboutMePage, { AboutMeHeader } from "./about-me/about-me";
import WelcomeHeader from "./welcome/welcome";

import styles from './index.module.scss';

import Rocket from '@/assets/svgs/rocket.svg';
import Person from '@/assets/svgs/person.svg';

import { page } from "@/types";

let pagesList: page[] = [
  {
    Element: WelcomeHeader, url: "/welcome", title: "Welcome", Icon: Rocket, timeline: function (tl, item) {
      ShowElement(tl, item, this, () => {
        console.log(item);
      })
    }
  },
  {
    Element: AboutMeHeader, url: "/about-me", Page: AboutMePage, title: "About Me", Icon: Person, timeline: function (tl, item) {
      ShowElement(tl, item, this, () => {
        console.log("item full visible 2");
      })
    }
  }
];

function ShowElement(tl: gsap.core.Timeline, item: Element, that: page, show: Function) {
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

            that.visible = !0;
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