import styles from './pages.module.scss';

function Pages({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className={styles.pages}>
        <section className={styles.pagesContent}>
            <ul className={styles.pagesList}>
                {children}
            </ul>
        </section>
    </main>
}

export default Pages;