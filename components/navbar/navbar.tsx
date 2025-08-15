'use client';

import social from '@/assets/social';
import Loader from '../loader/loader';
import styles from './navbar.module.scss';
import Link from 'next/link';
import pagesList from '../pages/pages-list';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { useRefs } from '../context/ref-context';
import { JSX } from 'react';

gsap.registerPlugin(ScrollToPlugin);

const embbedList = ["", ...pagesList.map(({ title }) => title), ""];

function Navbar() {
    const { getRef } = useRefs<{
        "loaders": JSX.Element,
        "medias": HTMLLIElement,
        "navTitle": HTMLAnchorElement
    }>();

    return <nav className={styles.navbarStyles}>
        <span className={styles.preloaderContainer}>
            <Loader ref={getRef("loaders", 0)} fixedStyles={{ zIndex: 2 }} />
            <Loader ref={getRef("loaders", 1)} fixedStyles={{ transitionDelay: '.015s', backgroundColor: 'red', zIndex: 1 }} />
            <Loader ref={getRef("loaders", 2)} fixedStyles={{ transitionDelay: '.03s', backgroundColor: 'white', zIndex: 0 }} />
        </span>
        <a ref={getRef("navTitle")} className={styles.titleNav} style={{ cursor: 'pointer' }} href="/"><h1>Portfolio</h1></a>
        <span className={styles.headerPages}>
            <span className={styles.lineBar}></span>
            <ul className={styles.headerList}>
                <li>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
                <li className={styles.mainPageHeader}>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
                <li>{embbedList.map((title, i) => <span key={i}>{title.toUpperCase()}</span>)}</li>
            </ul>
        </span>
        <ul className={styles.socialMedia}>
            {social.map(({ link, Icon }, ind) => <li key={ind} ref={getRef("medias", ind)} className={styles.mediaContainer} style={{ animationDelay: `${9e2 - ind * 1e2}ms` }}>
                <Link href={link} target='_blank'>
                    <Icon />
                </Link>
            </li>)}
        </ul>
    </nav>
}

export { embbedList };

export default Navbar;