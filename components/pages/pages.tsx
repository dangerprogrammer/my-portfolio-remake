import styles from './pages.module.scss';
import indexStyles from './index.module.scss';

function Pages({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className={styles.pages}>
        <section className={styles.pagesContent}>
            <ul className={styles.pagesList}>
                {children}
            </ul>
        </section>
    </main>
}

function PagesHeader() {
    return <section className={indexStyles.page}>Header</section>
}

export { PagesHeader };

export default Pages;