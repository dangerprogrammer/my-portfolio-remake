'use client';

import social from '@/assets/social';
import Loader from '../loader/loader';
import styles from './navbar.module.scss';
import Link from 'next/link';

function Navbar() {
    return <nav className={styles.navbarStyles}>
        <span className={styles.preloaderContainer}>
            <Loader zIndex='2' />
            <Loader transitionDelay='.015s' backgroundColor='red' zIndex='1' />
            <Loader transitionDelay='.03s' backgroundColor='white' zIndex='0' />
        </span>
        <a className={styles.titleNav} style={{ cursor: 'pointer' }} href="/"><h1>Portfolio</h1></a>
        <ul className={styles.socialMedia}>
            {social.map(({ link, Icon }, ind) => <li key={ind} className={styles.mediaContainer} style={{ animationDelay: `${9e2 - ind * 1e2}ms` }}>
                <Link href={link} target='_blank'>
                    <Icon />
                </Link>
            </li>)}
        </ul>
    </nav>
}

export default Navbar;