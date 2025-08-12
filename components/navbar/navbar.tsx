'use client';

import social from '@/assets/social';
import Loader from '../loader/loader';
import styles from './navbar.module.scss';
import Link from 'next/link';
import pagesList from '../pages';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollToPlugin);

const embbedList = ["", ...pagesList.map(({ title }) => title), ""];
function Navbar() {
    return <nav className={styles.navbarStyles}>
        <span className={styles.preloaderContainer}>
            <Loader zIndex='2' />
            <Loader transitionDelay='.015s' backgroundColor='red' zIndex='1' />
            <Loader transitionDelay='.03s' backgroundColor='white' zIndex='0' />
        </span>
        <a className={styles.titleNav} style={{ cursor: 'pointer' }} href="/"><h1>Portfolio</h1></a>
        <span className={styles.pagesHeader}>
            <span className={styles.lineBar}></span>
            <ul className={styles.headerList}>
                <li>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
                <li className={styles.mainPageHeader}>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
                <li>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
            </ul>
        </span>
        <ul className={styles.socialMedia}>
            {social.map(({ link, Icon }, ind) => <li key={ind} className={styles.mediaContainer} style={{ animationDelay: `${9e2 - ind * 1e2}ms` }}>
                <Link href={link} target='_blank'>
                    <Icon />
                </Link>
            </li>)}
        </ul>
    </nav>
}

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

export { updateNavbarTitles };

export default Navbar;