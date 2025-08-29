import loaderStyles from '@/components/loader/loader.module.scss';
import navbarStyles from '@/components/navbar/navbar.module.scss';
import pagesStyles from '@/components/pages/pages.module.scss';
import pageStyles from '@/components/pages/index.module.scss';

import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { UpdateElement } from '@/components/pages';
import { Context, Registry } from '@/types';
import pagesList from '@/components/pages/pages-list';
import { fixCloneRef } from '@/components/context/ref-context';

gsap.registerPlugin(ScrollTrigger);

function renderNav(refs: Registry<any>) {
  const {
    loaders,
    medias,
    navTitle,
    headerLinebar,
    headerPages
  } = fixCloneRef(refs);

  navTitle.classList.toggle(navbarStyles.noClick, location.pathname == '/');
  loaders.map((l: HTMLElement) => l.classList.remove(loaderStyles.notRendered));
  medias.forEach((mediaContainer: HTMLLIElement) => mediaContainer.classList.add(navbarStyles.showItem));

  gsap.fromTo(headerLinebar, {
    scaleY: 0
  }, {
    scaleY: 1,
    delay: 1.2,
    duration: .3
  });

  headerPages.forEach((h: Element, i: number) => {
    const spans = h.querySelectorAll<Element>('span');

    gsap.to(spans, {
      translateY: 0,
      delay: i == 1 ? 1.4 : 1.6
    });
  });
}

function renderScrolling(contexts: Context, refs: Registry<any>) {
  const {
    pinWrap,
    items,
    shadow
  } = fixCloneRef(refs);

  let pinWrapWidth = pinWrap.scrollWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;
  let snapTimeout: NodeJS.Timeout;

  let firstUpdate = true;

  let pct = 0;
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: true,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: ev => {
        pct = Math.min(ev.progress * (items.length - 1), 1);

        gsap.to(shadow, {
          x: shadow.clientWidth - shadow.clientWidth * pct,
          duration: 0
        });

        if (contexts.snapping) return;

        clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          contexts.setSnapping(true);

          snapToClosest()?.then(() =>
            setTimeout(() => contexts.setSnapping(false), 500)
          );
        }, firstUpdate ? 0 : 500);

        if (firstUpdate) firstUpdate = false;
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

  (items as Array<any>).forEach((item, i) =>
    pagesList[i].timeline(itemTimeline, item, contexts.setActivePage)
  );

  function snapToClosest() {
    const center = window.innerWidth / 2;
    let closestItem: any = null;
    let closestDistance = Infinity;

    (items as Array<any>).forEach(item => {
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

      UpdateElement(pagesList[index], contexts.setActivePage);

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

function renderPage(contexts: Context, refs: Registry<any>) {
  renderNav(refs);

  renderScrolling(contexts, refs);
}

export { renderPage };