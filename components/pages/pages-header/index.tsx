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
        "shadowTitleLine": HTMLSpanElement,
        "shadowDesc": HTMLParagraphElement,
        "shadowDescs": HTMLSpanElement,
        "descWords": HTMLSpanElement
    }>();

    useEffect(() => {
        const {
            shadowTitles,
            shadowTitle,

            descWords
        } = fixCloneRef(refs);

        setTimeout(() => {
            gsap.set(shadowTitle, {
                scrollTo: { x: shadowTitles[1].offsetLeft },
                opacity: 0
            });

            gsap.set(descWords, {
                y: '100%'
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
            shadowTitleLine,

            descWords
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

            pagesList.forEach((page, descIndex) => {
                const words = page.headerProps.desc.split(' ');

                words.forEach((_, wordIndex) => {
                    const wordRef = descWords[descIndex * 1000 + wordIndex];

                    if (wordRef) {
                        if (descIndex === pageIndex) {
                            gsap.to(wordRef, {
                                y: 0,
                                duration: 0.35,
                                delay: wordIndex * 0.15,
                                ease: 'power2.out'
                            });
                        } else {
                            gsap.to(wordRef, {
                                y: '100%',
                                duration: 0.3
                            });
                        }
                    }
                });
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
                <p className={styles.desc} ref={getRef("shadowDesc")}>
                    {pagesList.map(({ headerProps }, ind) =>
                        <span key={ind} ref={getRef("shadowDescs", ind)}>
                            {headerProps.desc.split(' ').map((word, wordInd) => (
                                <span key={wordInd} className={styles.wordWrapper}>
                                    <span ref={getRef("descWords", ind * 1000 + wordInd)} className={styles.word}>{word}</span>
                                    {wordInd < headerProps.desc.split(' ').length - 1 ? ' ' : ''}
                                </span>
                            ))}
                        </span>
                    )}
                </p>
            </aside>
            <div className={styles.contentBox}>
                {pagesList.map(({ title }, index) => (
                    <div key={index} className={styles.contentItem}>
                        {/* Adicione aqui o conteúdo futuro de cada página */}
                        <h3>{title}</h3>
                    </div>
                ))}
            </div>
        </main>}
    </section>
}

export default PagesHeader;