import styles from './loader.module.scss';

function Loader(fixedStyles: React.CSSProperties) {
    return <main className={`${styles.loader} ${styles.notRendered}`} style={fixedStyles}></main>
}

export default Loader;