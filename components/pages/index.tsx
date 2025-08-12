import React, { Dispatch, SetStateAction } from "react";

import AboutMePage, { AboutMeHeader } from "./about-me/about-me";
import WelcomeHeader from "./welcome/welcome";

import styles from './index.module.scss';

import Rocket from '@/assets/svgs/rocket.svg';
import Person from '@/assets/svgs/person.svg';

import { page } from "@/types";
import SkillsPage, { SkillsHeader } from "./skills/skills";
import { updateNavbarTitles } from "../navbar/navbar";
import { scrollProgress } from "@/scripts/start";

const pagesList: page[] = [
  {
    Element: WelcomeHeader, url: "/welcome", title: "Welcome", Icon: Rocket, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 1");
      })
    }
  },
  {
    Element: AboutMeHeader, url: "/about-me", Page: AboutMePage, title: "About Me", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 2");
      })
    }
  },
  {
    Element: SkillsHeader, url: "/skills", Page: SkillsPage, title: "Skills", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 3");
      })
    }
  }
];

let firstTime: boolean = !0;
function ShowElement(tl: gsap.core.Timeline, item: Element, setActivePage: Dispatch<SetStateAction<page>>, that: page, show: Function) {
  let snapTimeout: NodeJS.Timeout;

  tl.to(item, {
    scrollTrigger: {
      scrub: 1,
      start: "top bottom",
      end: "bottom top",
      onUpdate: () => {
        if (firstTime) {
          if (fullyVisible(item)) {
            show();

            pagesList.map(page => page.visible = !1);
            that.visible = !0;

            setActivePage(that);

            updateNavbarTitles(scrollProgress);

            firstTime = !1;
          };
        } else {
          clearInterval(snapTimeout);

          snapTimeout = setTimeout(() => {
            if (fullyVisible(item)) show();
          }, 500);
        };
      }
    }
  });
};

function UpdateElement(itemPage: page, setActivePage: Dispatch<SetStateAction<page>>) {
    pagesList.map(page => page.visible = !1);
    itemPage.visible = !0;

    setActivePage(itemPage);

    updateNavbarTitles(pagesList.indexOf(itemPage) / (pagesList.length - 1));
};

export { UpdateElement };

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