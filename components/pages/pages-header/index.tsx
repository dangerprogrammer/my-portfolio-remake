'use client';

import { Context, headerProps, page, Registry } from '@/types';
import indexStyles from '../index.module.scss';
import styles from './pages-header.module.scss';
import { useEffect, useState } from 'react';
import pagesList from '../pages-list';
import Line from '@/components/line/line';
import { fixCloneRef, useRefs } from '@/components/context/ref-context';
import gsap from 'gsap';

let prevActive: page, prevShowing: boolean = !1;
function PagesHeader({ headerProps, shadow, globalContexts, ref, refs }: { headerProps?: headerProps, shadow?: boolean, globalContexts?: Context, ref?: React.RefObject<any>, refs: Registry<any> }) {
    const [pageIndex, setPageIndex] = useState(0);
    const { getRef } = useRefs<{
        "shadowTitles": HTMLSpanElement,
        "shadowTitle": HTMLHeadingElement,
        "shadowTitleLine": HTMLSpanElement
    }>();

    useEffect(() => {
        const {
            shadowTitles,
            shadowTitle
        } = fixCloneRef(refs);

        setTimeout(() => {
            gsap.set(shadowTitle, {
                scrollTo: { x: shadowTitles[1].offsetLeft },
                opacity: 0
            });
        }, 1);
    }, []);

    useEffect(() => {
        const { activePage, snapping } = globalContexts!;
        if (prevActive == activePage || snapping == !0) return;

        const indexPage = pagesList.indexOf(activePage);
        setPageIndex(indexPage);

        prevActive = activePage;
    }, [globalContexts?.snapping]);

    useEffect(() => {
        const {
            shadowTitles,
            shadowTitle,
            shadowTitleLine
        } = fixCloneRef(refs), showing = pageIndex != 0, showingChanges = showing != prevShowing;

        if (showing) {
            if (showingChanges) {
                gsap.to(shadowTitleLine, {
                    scaleX: 1,
                    duration: .3
                });

                gsap.to(shadowTitle, {
                    opacity: 1,
                    delay: .3,
                    duration: 1
                });
            };

            gsap.to(shadowTitle, {
                scrollTo: { x: shadowTitles[pageIndex].offsetLeft }
            });
        }

        prevShowing = showing;
    }, [pageIndex]);

    return <section ref={ref} className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
        {headerProps ? <>{headerProps.title}</> : <main className={styles.shadowContent}>
            <aside className={styles.sidebarContent}>
                <span className={styles.sideTitle}>
                    <Line ref={getRef("shadowTitleLine")} origin='left' fixedStyles={{ scale: '0 1' }} />
                    <h1 className={styles.title} ref={getRef("shadowTitle")}>
                        {pagesList.map(({ headerProps }, ind) =>
                            <span key={ind} ref={getRef("shadowTitles", ind)}>{headerProps.title}</span>
                        )}
                    </h1>
                </span>
                <p>lorem20</p>
            </aside>
        </main>}
    </section>
}

export default PagesHeader;