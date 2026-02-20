'use client';

import { Context, headerProps, page, Registry } from '@/types';
import indexStyles from '../index.module.scss';
import styles from './pages-header.module.scss';
import { useEffect, useState } from 'react';
import pagesList from '../pages-list';
import Line from '@/components/line/line';
import { useRefs } from '@/components/context/ref-context';
import { getCardsDataByPage } from './components/card-data';
import ContentCard from './components/ContentCard';
import SeeMoreButton from './components/SeeMoreButton';
import PageDescription from './components/PageDescription';
import { useInitialSetup } from './components/use-initial-setup';
import { usePageTransitions } from './components/use-page-transitions';
import { useCardAnimations } from './components/use-card-animations';

let prevActive: page;

function PagesHeader({ headerProps, shadow, globalContexts, ref, refs }: { 
    headerProps?: headerProps, 
    shadow?: boolean, 
    globalContexts?: Context, 
    ref?: React.RefObject<any>, 
    refs: Registry<any> 
}) {
    const [pageIndex, setPageIndex] = useState(0);
    const [cardsPageIndex, setCardsPageIndex] = useState(0);
    
    const { getRef } = useRefs<{
        "shadowTitles": HTMLSpanElement,
        "shadowTitle": HTMLHeadingElement,
        "shadowTitleLine": HTMLSpanElement,
        "shadowDesc": HTMLParagraphElement,
        "shadowDescs": HTMLSpanElement,
        "descWords": HTMLSpanElement,
        "contentCards": HTMLDivElement,
        "cardItems": HTMLDivElement,
        "statNumbers": HTMLSpanElement,
        "progressBars": HTMLDivElement,
        "cardOrbs": HTMLDivElement,
        "seeMoreBtn": HTMLButtonElement
    }>();

    // Setup inicial dos elementos
    useInitialSetup(refs);

    // Transições de página
    usePageTransitions(refs, pagesList, pageIndex, cardsPageIndex, setCardsPageIndex);

    // Animações dos cards
    useCardAnimations(refs, cardsPageIndex);

    // Atualiza índice da página baseado no contexto global
    useEffect(() => {
        const { activePage, snapping } = globalContexts!;
        if (prevActive == activePage || snapping == true) return;

        const indexPage = pagesList.indexOf(activePage);
        setPageIndex(indexPage);

        prevActive = activePage;
    }, [globalContexts?.snapping]);

    return (
        <section ref={ref} className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
            {headerProps ? (
                <>{headerProps.title}</>
            ) : (
                <main className={styles.shadowContent}>
                    <div className={styles.mainContent}>
                        <aside className={styles.sidebarContent}>
                            <span className={styles.sideTitle}>
                                <Line ref={getRef("shadowTitleLine")} origin='left' fixedStyles={{ scale: '0 1' }} />
                                <h1 className={styles.title} ref={getRef("shadowTitle")}>
                                    {pagesList.map(({ headerProps }, ind) =>
                                        <span key={ind} ref={getRef("shadowTitles", ind)}>
                                            {headerProps.title}
                                        </span>
                                    )}
                                </h1>
                            </span>
                            <PageDescription pagesList={pagesList} getRef={getRef as any} />
                        </aside>
                        
                        <div className={styles.contentBox} ref={getRef("contentCards")}>
                            <div className={styles.orbsContainer}>
                                <div className={styles.orb} ref={getRef("cardOrbs", 0)} />
                                <div className={styles.orb} ref={getRef("cardOrbs", 1)} />
                                <div className={styles.orb} ref={getRef("cardOrbs", 2)} />
                            </div>
                            {getCardsDataByPage(cardsPageIndex).map((card, cardIdx) => (
                                <ContentCard 
                                    key={`${cardsPageIndex}-${cardIdx}`}
                                    card={card}
                                    cardIndex={cardIdx}
                                    getRef={getRef as any}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <SeeMoreButton 
                        pageUrl={pagesList[pageIndex]?.url} 
                        getRef={getRef as any} 
                    />
                </main>
            )}
        </section>
    );
}

export default PagesHeader;
