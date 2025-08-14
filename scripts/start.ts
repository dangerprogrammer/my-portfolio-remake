import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';
import pageStyles from '@/components/pages/index.module.scss';

import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { UpdateElement } from '@/components/pages';
import { Dispatch, SetStateAction } from 'react';
import { page } from '@/types';
import pagesList from '@/components/pages/pagesList';

gsap.registerPlugin(ScrollTrigger);

function renderNav() {
  const preloaders = document.querySelectorAll(`[class*="${loaderStyles.loader}"]`),
    mediaContainers = document.querySelectorAll(`[class*="${navbarStyles.mediaContainer}"]`),
    navbarTitle = document.querySelector(`[class*="${navbarStyles.titleNav}"]`)!;

  navbarTitle.classList.toggle(navbarStyles.noClick, location.pathname == '/');
  preloaders.forEach(preloader => preloader.classList.remove(loaderStyles.notRendered));
  mediaContainers.forEach(mediaContainer => mediaContainer.classList.add(navbarStyles.showItem));

  const headerLine = document.querySelector(`.${navbarStyles.lineBar}`)!;
  gsap.to(headerLine, {
    scaleY: 1,
    delay: 1.2,
    duration: .3
  });

  const headerPages = gsap.utils.toArray<Element>(`.${navbarStyles.headerList} > li`);

  headerPages.forEach((h, i) => {
    const spans = h.querySelectorAll<Element>('span');

    gsap.to(spans, {
      translateY: 0,
      delay: i == 1 ? 1.4 : 1.6
    });
  });
}

function renderScrolling(setActivePage: Dispatch<SetStateAction<page>>) {
  const pinWrap = document.querySelector(`.${pagesStyles.pagesContent}`)!;
  const items = gsap.utils.toArray<Element>(`.${pageStyles.page}:not(.${pageStyles.shadowPage})`);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: NodeJS.Timeout;

  let firstUpdate = true;
  let isSnapping = false;

  const fixedItem = document.querySelector(`.${pageStyles.shadowPage}`)!;

  let oldProgress = 0, pct = 0;
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: true,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: ev => {
        pct = Math.min(ev.progress * (items.length - 1), 1);

        gsap.to(fixedItem, {
          x: fixedItem.clientWidth - fixedItem.clientWidth * pct,
          delay: .05,
          duration: Math.abs(ev.progress - oldProgress) ** 10 * 5
        });

        if (isSnapping) return;

        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          isSnapping = true;
          snapToClosest()?.then(() => {
            isSnapping = false;

            onFinishSnap(+pct.toFixed(3));
          });
        }, firstUpdate ? 0 : 500);

        if (firstUpdate) firstUpdate = false;

        oldProgress = ev.progress;
      }
    }
  });

  mainTimeline.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: "none"
  });

  gsap.to(pinWrap, { backgroundColor: 'inherit', duration: 0 });
  gsap.to(pinWrap, { backgroundColor: '#080c1a', delay: 1, duration: 1 });

  const itemTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: `.${pageStyles.page}`
    }
  });

  items.forEach((item, i) =>
    pagesList[i].timeline(itemTimeline, item, setActivePage)
  );

  function snapToClosest() {
    const center = window.innerWidth / 2;
    let closestItem: any = null;
    let closestDistance = Infinity;

    items.forEach(item => {
      const bounds = item.getBoundingClientRect();
      const itemCenter = bounds.left + bounds.width / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestItem = item;
      }
    });

    if (closestItem) {
      const index = items.indexOf(closestItem);
      const targetX = index * closestItem.offsetWidth - (window.innerWidth / 2 - closestItem.offsetWidth / 2);

      const progress = targetX / horizontalScrollLength;
      const targetScrollY = progress * mainTimeline.scrollTrigger!.end;

      UpdateElement(pagesList[index], setActivePage);

      return new Promise(resolve => {
        gsap.to(window, {
          scrollTo: { y: targetScrollY },
          duration: firstUpdate ? 0 : 0.5,
          onComplete: resolve
        });
      });
    }
  }

  function onFinishSnap(pct: number) {
    console.log(pct ? "show!" : "hide!");
  }
}

function renderPage(setActivePage: Dispatch<SetStateAction<page>>) {
  renderNav();

  renderScrolling(setActivePage);
}

export { renderPage };