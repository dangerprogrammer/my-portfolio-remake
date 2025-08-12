import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';
import pageStyles from '@/components/pages/index.module.scss';

import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import pagesList, { UpdateElement } from '@/components/pages';
import { Dispatch, SetStateAction } from 'react';
import { page } from '@/types';
import { updateNavbarTitles } from '@/components/navbar/navbar';

gsap.registerPlugin(ScrollTrigger);

function renderNav() {
  const preloaders = document.querySelectorAll(`[class*="${loaderStyles.loader}"]`),
    mediaContainers = document.querySelectorAll(`[class*="${navbarStyles.mediaContainer}"]`),
    navbarTitle = document.querySelector(`[class*="${navbarStyles.titleNav}"]`)!;

  navbarTitle.classList.toggle(navbarStyles.noClick, location.pathname == '/');
  preloaders.forEach(preloader => preloader.classList.remove(loaderStyles.notRendered));
  mediaContainers.forEach(mediaContainer => mediaContainer.classList.add(navbarStyles.showItem));
}

let scrollProgress: number = 0;

function renderScrolling(setActivePage: Dispatch<SetStateAction<page>>) {
  const pinWrap = document.querySelector(`.${pagesStyles.pagesContent}`)!;
  const items = gsap.utils.toArray<Element>(`.${pageStyles.page}`);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: NodeJS.Timeout;

  let firstUpdate: boolean = !0;
  let isSnapping: boolean = !1;
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: !0,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: ev => {
        if (isSnapping) return;
        
        clearTimeout(snapTimeout);

        snapTimeout = setTimeout(() => {
          isSnapping = !0;

          snapToClosest()!.then(() => {
            isSnapping = !1;
          });
        }, firstUpdate ? 0 : 500);

        scrollProgress = ev.progress;
        if (firstUpdate) firstUpdate = !1;
      }
    },
  });

  const trigger = mainTimeline.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: "none"
  });

  gsap.to(pinWrap, {
    backgroundColor: 'inherit',
    duration: 0
  });

  gsap.to(pinWrap, {
    backgroundColor: '#080c1a',
    delay: 1,
    duration: 1
  });

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
      const targetScrollY = progress * trigger.scrollTrigger!.end;

      UpdateElement(pagesList[index], setActivePage);

      return new Promise(resolve => {
        gsap.to(window, {
        scrollTo: { y: targetScrollY },
        duration: firstUpdate ? 0 : .5,
        onComplete: resolve
      });
      })
    }
  }
}

function renderPage(setActivePage: Dispatch<SetStateAction<page>>) {
  renderNav();

  renderScrolling(setActivePage);
}

export { renderPage };

export { scrollProgress };