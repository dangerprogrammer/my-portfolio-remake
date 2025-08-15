'use client';

import { useEffect } from 'react';
import { refContext } from '../context/ref-context';
import styles from './loader.module.scss';

function Loader(fixedStyles: React.CSSProperties) {
    const { getRef, logRef } = refContext();

    useEffect(() => {
        logRef();
    }, []);

    return <main className={`${styles.loader} ${styles.notRendered}`} style={fixedStyles}></main>
}

export default Loader;