'use client';

import social from '@/assets/social';
import Loader from '../loader/loader';
import styles from './navbar.module.scss';
import Link from 'next/link';
import pagesList from '../pages/pages-list';
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
        <span className={styles.headerPages}>
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

export { embbedList };

export default Navbar;