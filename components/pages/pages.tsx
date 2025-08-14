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

function PagesHeader({ headerProps, shadow }: { headerProps?: headerProps, shadow?: boolean }) {
    return <section className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
        {headerProps ? <>{headerProps.title}</> : <>Shadow</>}
    </section>
}

export { PagesHeader };

export default Pages;