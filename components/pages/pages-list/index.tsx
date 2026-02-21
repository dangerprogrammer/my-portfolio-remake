import { page } from "@/types";
import WelcomeHeader from "../welcome/welcome";
import AboutMePage from "../about-me/about-me";
import SkillsPage from "../skills/skills";
import ProjectsPage from "../projects/projects";

import styles from '../index.module.scss';

import Rocket from '@/assets/svgs/rocket.svg';
import Person from '@/assets/svgs/person.svg';
import Desktop from '@/assets/svgs/desktop-outline.svg';
import { Dispatch, SetStateAction } from "react";

const pagesList: page[] = [
  {
    Element: WelcomeHeader, url: "/welcome", title: "Welcome", Icon: Rocket, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 1");
      })
    }, headerProps: {
      title: "Welcome Title",
      desc: "Welcome to my portfolio! Explore my work and get to know me better."
    }
  },
  {
    url: "/about-me", Element: ({ globalContexts, ref }) => <AboutMePage />, Page: AboutMePage, title: "About Me", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 2");
      })
    }, headerProps: {
      title: "About Me Title",
      desc: "Learn more about my journey, background, and what drives me as a developer."
    }
  },
  {
    url: "/skills", Element: ({ globalContexts, ref }) => <SkillsPage />, Page: SkillsPage, title: "Skills", Icon: Person, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 3");
      })
    }, headerProps: {
      title: "Skills Title",
      desc: "Discover the technologies and tools I work with to build amazing projects."
    }
  },
  {
    url: "/projects", Element: ({ globalContexts, ref }) => <ProjectsPage />, Page: ProjectsPage, title: "Projects", Icon: Desktop, timeline: function (tl, item, setActivePage) {
      ShowElement(tl, item, setActivePage, this, () => {
        // console.log("item full visible 4");
      })
    }, headerProps: {
      title: "Projects Title",
      desc: "Check out my latest work and creative solutions I've built over time."
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

function fullyVisible(el: Element) {
  const rect = el.getBoundingClientRect();

  return rect.left >= -100 && rect.right <= window.innerWidth + 100;
}

pagesList.filter(({ Element }) => Element).forEach(({ Element }, i) => {
  Element = Element!;
  
  pagesList[i].Element = ({ globalContexts, ref }) => <section ref={ref} className={styles.page}>
    <Element ref={undefined} globalContexts={globalContexts} />
  </section>
});

export default pagesList;