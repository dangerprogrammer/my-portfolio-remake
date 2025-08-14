'use client';

import { Context, headerProps, page } from '@/types';
import indexStyles from '../index.module.scss';
import styles from './pages-header.module.scss';
import { useEffect, useState } from 'react';
import pagesList from '../pages-list';
import Line from '@/components/line/line';

let prevActive: page;
function PagesHeader({ headerProps, shadow, globalContexts }: { headerProps?: headerProps, shadow?: boolean, globalContexts?: Context }) {
    const [title, setTitle] = useState(0);

    useEffect(() => {
        const { activePage, snapping } = globalContexts!;
        if (prevActive == activePage || snapping == !0) return;

        console.log("activePage", activePage);
        setTitle(pagesList.indexOf(activePage));

        

        prevActive = activePage;
    }, [globalContexts?.snapping]);

    return <section className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
        {headerProps ? <>{headerProps.title}</> : <main className={styles.shadowContent}>
            <aside className={styles.sidebarContent}>
                <span className={styles.sideTitle}>
                    <Line />
                    <h1 className={styles.title}>
                        {pagesList.map(({ headerProps }, ind) =>
                            <span key={ind}>{headerProps.title}</span>
                        )}
                    </h1>
                </span>
            </aside>
        </main>}
    </section>
}

export default PagesHeader;