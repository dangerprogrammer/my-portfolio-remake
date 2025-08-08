import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';

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
    const smoother = ScrollSmoother.create({
        smooth: 1,
        normalizeScroll: true,
        ignoreMobileResize: true
    });

    const horizontalSections = gsap.utils.toArray<Element>(pagesStyles.pages);

    horizontalSections.forEach((sec) => {
    const pinWrap = sec.querySelector(".horiz-gallery-strip")!;

    let pinWrapWidth: number;
    let horizontalScrollLength: number;

    function refresh() {
      pinWrapWidth = pinWrap.scrollWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    }

    refresh();
    // Pinning and horizontal scrolling
    gsap.to(pinWrap, {
      scrollTrigger: {
        scrub: true,
        trigger: sec,
        pin: sec,
        start: "center center",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: () => -horizontalScrollLength,
      ease: "none"
    });

    ScrollTrigger.addEventListener("refreshInit", refresh);
  });
}

function renderPage() {
    renderNav();

    renderScrolling();
}

export { renderPage };