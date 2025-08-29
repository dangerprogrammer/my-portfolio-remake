import { useRefs } from '../context/ref-context';
import styles from './pages.module.scss';

function Pages({ children }: Readonly<{ children: React.ReactNode }>) {
    const { getRef } = useRefs<{
        "pinWrap": HTMLElement
    }>();
    
    return <main className={styles.pages}>
        <section ref={getRef("pinWrap")} className={styles.pagesContent}>
            <ul className={styles.pagesList}>
                {children}
            </ul>
        </section>
    </main>
}

export default Pages;