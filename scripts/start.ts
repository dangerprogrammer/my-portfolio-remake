import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';
import pageStyles from '@/components/pages/index.module.scss';

import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function renderNav() {
  const preloaders = document.querySelectorAll(`[class*="${loaderStyles.loader}"]`),
    mediaContainers = document.querySelectorAll(`[class*="${navbarStyles.mediaContainer}"]`),
    navbarTitle = document.querySelector(`[class*="${navbarStyles.titleNav}"]`)!,
    { pathname } = location;

  navbarTitle.classList.toggle(navbarStyles.noClick, pathname == '/');
  preloaders.forEach(preloader => preloader.classList.remove(loaderStyles.notRendered));
  mediaContainers.forEach(mediaContainer => mediaContainer.classList.add(navbarStyles.showItem));
}

function renderScrolling() {
  ScrollSmoother.create({
    content: `.${pagesStyles.pages}`,
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true
  });

  const pinWrap = document.querySelector(`.${pagesStyles.pagesContent}`)!;
  const items = gsap.utils.toArray<Element>(`.${pageStyles}`);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: any;

  // Pinning and horizontal scrolling
  const trigger = gsap.to(pinWrap, {
    scrollTrigger: {
      scrub: true,
      trigger: pinWrap,
      pin: pinWrap,
      end: () => `+=${pinWrapWidth}`,
      onUpdate: () => {
        clearTimeout(snapTimeout);

        snapTimeout = setTimeout(() => snapToClosest(), 150);
      }
    },
    x: () => -horizontalScrollLength,
    ease: "none"
  });

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