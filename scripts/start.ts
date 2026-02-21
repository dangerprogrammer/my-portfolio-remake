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

const bgStops = [
  {
    from: [7, 11, 25],
    to: [17, 24, 47],
    accent: [99, 102, 241]
  },
  {
    from: [8, 23, 43],
    to: [12, 54, 96],
    accent: [79, 172, 254]
  },
  {
    from: [10, 34, 34],
    to: [14, 64, 52],
    accent: [67, 233, 123]
  },
  {
    from: [36, 14, 49],
    to: [60, 18, 41],
    accent: [245, 87, 108]
  }
] as const;

function mixColor(a: number[], b: number[], progress: number) {
  return a.map((value, index) => Math.round(value + (b[index] - value) * progress));
}

function getGradientPalette(progress: number) {
  const totalTransitions = bgStops.length - 1;
  const scaled = Math.max(0, Math.min(1, progress)) * totalTransitions;
  const index = Math.min(totalTransitions - 1, Math.floor(scaled));
  const localProgress = scaled - index;

  const current = bgStops[index];
  const next = bgStops[index + 1] ?? bgStops[index];

  return {
    from: mixColor([...current.from], [...next.from], localProgress),
    to: mixColor([...current.to], [...next.to], localProgress),
    accent: mixColor([...current.accent], [...next.accent], localProgress)
  };
}

function updateBodyScrollBackground(progress: number, surface?: HTMLElement) {
  const body = document.body;
  if (!body) return;

  const normalized = Math.max(0, Math.min(1, progress));
  const palette = getGradientPalette(normalized);
  const glowX = 18 + normalized * 64;
  const glowY = 20 + Math.sin(normalized * Math.PI) * 20;

  const background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(${palette.accent[0]}, ${palette.accent[1]}, ${palette.accent[2]}, 0.28) 0%, rgba(${palette.accent[0]}, ${palette.accent[1]}, ${palette.accent[2]}, 0) 48%), linear-gradient(135deg, rgb(${palette.from[0]}, ${palette.from[1]}, ${palette.from[2]}) 0%, rgb(${palette.to[0]}, ${palette.to[1]}, ${palette.to[2]}) 100%)`;

  body.style.background = background;
  document.documentElement.style.background = background;

  if (surface) {
    surface.style.background = background;
  }
}

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
  updateBodyScrollBackground(0, pinWrap);

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: pinWrap,
      pin: true,
      end: () => `+=${pinWrap.clientWidth}`,
      onUpdate: ev => {
        pct = Math.min(ev.progress * (items.length - 1), 1);
        updateBodyScrollBackground(ev.progress, pinWrap);

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