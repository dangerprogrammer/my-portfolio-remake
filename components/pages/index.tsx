import React, { Dispatch, SetStateAction } from "react";

import AboutMePage from "./about-me/about-me";
import SkillsPage from "./skills/skills";
import WelcomeHeader from "./welcome/welcome";

import styles from './index.module.scss';

import Rocket from '@/assets/svgs/rocket.svg';
import Person from '@/assets/svgs/person.svg';

import { page } from "@/types";
import { embbedList } from "../navbar/navbar";

const pagesList: page[] = [
  {
    Element: WelcomeHeader, url: "/welcome", title: "Welcome", Icon: Rocket, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 1");
      })
    }, headerProps: {
      title: "",
      desc: ""
    }
  },
  {
    url: "/about-me", Page: AboutMePage, title: "About Me", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 2");
      })
    }, headerProps: {
      title: "",
      desc: ""
    }
  },
  {
    url: "/skills", Page: SkillsPage, title: "Skills", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 3");
      })
    }, headerProps: {
      title: "",
      desc: ""
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

let firstRender: boolean = !0;
function updateNavbarTitles(progress: number) {
    const scrollList = gsap.utils.toArray<Element>(`.${styles.headerList} > li`);

    scrollList.forEach((scroll, i) => {
        gsap.to(scroll, {
            scrollTo: {
                x: (scroll.scrollWidth - scroll.clientWidth) * (progress * (pagesList.length - 1) / (embbedList.length - 1) + i / (embbedList.length - 1))
            },
            duration: .5,
            delay: .3
        });
    });

    if (firstRender) firstRender = !1;
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

pagesList.filter(({ Element }) => Element).forEach(({ Element }, i) => {
  Element = Element!;
  
  pagesList[i].Element = () => <section className={styles.page}>
    <Element />
  </section>
});

export default pagesList;