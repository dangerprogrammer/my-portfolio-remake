import styles from './pages.module.scss';
import indexStyles from './index.module.scss';
import { headerProps } from '@/types';

function Pages({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className={styles.pages}>
        <section className={styles.pagesContent}>
            <ul className={styles.pagesList}>
                {children}
            </ul>
        </section>
    </main>
}

function PagesHeader({ ...headerProps }: headerProps) {
    return <section className={indexStyles.page}>{headerProps.title}</section>
}

export { PagesHeader };

export default Pages;