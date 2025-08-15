'use client';

import styles from './loader.module.scss';

function Loader({ ref, fixedStyles }: { ref: React.RefObject<any>, fixedStyles: React.CSSProperties }) {
    return <main ref={ref} className={`${styles.loader} ${styles.notRendered}`} style={fixedStyles}></main>
}

export default Loader;