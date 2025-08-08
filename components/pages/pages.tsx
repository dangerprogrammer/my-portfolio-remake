import styles from './pages.module.scss';

function Pages({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className={styles.pages}>
            <ul className={styles.pagesContent}>
                {children}
            </ul>
    </main>
}

export default Pages;