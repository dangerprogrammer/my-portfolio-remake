import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';
import pageStyles from '@/components/pages/index.module.scss';

import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import pagesList from '@/components/pages';

gsap.registerPlugin(ScrollTrigger);

function renderNav() {
  const preloaders = document.querySelectorAll(`[class*="${loaderStyles.loader}"]`),
    mediaContainers = document.querySelectorAll(`[class*="${navbarStyles.mediaContainer}"]`),
    navbarTitle = document.querySelector(`[class*="${navbarStyles.titleNav}"]`)!;

  navbarTitle.classList.toggle(navbarStyles.noClick, location.pathname == '/');
  preloaders.forEach(preloader => preloader.classList.remove(loaderStyles.notRendered));
  mediaContainers.forEach(mediaContainer => mediaContainer.classList.add(navbarStyles.showItem));
}

function renderScrolling() {
  const pinWrap = document.querySelector(`.${pagesStyles.pagesContent}`)!;
  const items = gsap.utils.toArray<Element>(`.${pageStyles.page}`);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: NodeJS.Timeout;

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: !0,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: () => {
        clearTimeout(snapTimeout);

        snapTimeout = setTimeout(() => snapToClosest(), 500);
      }
    }
  });

  const trigger = mainTimeline.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: "none"
  });

  const itemTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: `.${pageStyles.page}`
    }
  });

  items.forEach((item, i) =>
    pagesList[i].timeline(itemTimeline, item)
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

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  }
}

function renderPage() {
  renderNav();

  renderScrolling();
}

export { renderPage };