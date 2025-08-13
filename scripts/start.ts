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
  const items = gsap.utils.toArray<Element>(`.${pageStyles.page}`);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: NodeJS.Timeout;

  let firstUpdate = true;
  let isSnapping = false;

  const fixedIndex = 1;
  const fixedItem = items[fixedIndex];
  const movingItems = items.filter((_, i) => i !== fixedIndex);

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: true,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: () => {
        if (isSnapping) return;
        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          // isSnapping = true;
          // snapToClosest()?.then(() => {
          //   isSnapping = false;
          // });
        }, firstUpdate ? 0 : 500);
        if (firstUpdate) firstUpdate = false;
      }
    }
  });

  // Anima apenas os outros itens
  mainTimeline.to(movingItems, {
    xPercent: -100 * (items.length - 1),
    ease: "none"
  }, 0);

  // ===== FIXO ENTRE DOIS PONTOS =====
  const itemWidth = fixedItem.clientWidth;
  const startScroll = (itemWidth * fixedIndex) / horizontalScrollLength * mainTimeline.scrollTrigger!.end;
  const endScroll = startScroll + 500; // 500px de scroll vertical (ajuste aqui)

  ScrollTrigger.create({
    trigger: pinWrap,
    start: startScroll,
    end: endScroll,
    onEnter: () => {
      gsap.set(fixedItem, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 10
      });
    },
    onLeave: () => {
      gsap.set(fixedItem, {
        position: "absolute",
        left: `${fixedIndex * 100}%`,
        top: "0%",
        xPercent: 0,
        yPercent: 0,
        zIndex: ""
      });
    },
    onEnterBack: () => {
      gsap.set(fixedItem, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 10
      });
    },
    onLeaveBack: () => {
      gsap.set(fixedItem, {
        position: "absolute",
        left: `${fixedIndex * 100}%`,
        top: "0%",
        xPercent: 0,
        yPercent: 0,
        zIndex: ""
      });
    }
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
}

function renderPage(setActivePage: Dispatch<SetStateAction<page>>) {
  renderNav();

  renderScrolling(setActivePage);
}

export { renderPage };