'use client';

import { Context, headerProps, page, Registry } from '@/types';
import indexStyles from '../index.module.scss';
import styles from './pages-header.module.scss';
import { useEffect, useState } from 'react';
import pagesList from '../pages-list';
import Line from '@/components/line/line';
import { fixCloneRef, useRefs } from '@/components/context/ref-context';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

function getCardsDataByPage(pageIndex: number) {
    const pageCards = [
        // Welcome Page (index 0) - não mostra conteúdo
        [],
        // About Me Page (index 1)
        [
            { icon: '👨‍💻', title: 'Experience', stat: 3, label: 'Years Coding', type: 'counter' },
            { icon: '📍', title: 'Location', stat: 0, label: 'Brazil', type: 'text' },
            { icon: '☕', title: 'Coffee', stat: 999, label: 'Cups/Year', type: 'counter' },
            { icon: '🎓', title: 'Learning', stat: 100, label: '% Curious', type: 'progress' }
        ],
        // Skills Page (index 2)
        [
            { icon: '⚛️', title: 'React', stat: 90, label: '% Proficiency', type: 'progress' },
            { icon: '🎨', title: 'GSAP', stat: 85, label: '% Mastery', type: 'progress' },
            { icon: '📱', title: 'Next.js', stat: 88, label: '% Expertise', type: 'progress' },
            { icon: '🎯', title: 'TypeScript', stat: 92, label: '% Fluency', type: 'progress' }
        ],
        // Projects Page (index 3)
        [
            { icon: '🚀', title: 'Completed', stat: 24, label: 'Projects', type: 'counter' },
            { icon: '⭐', title: 'GitHub', stat: 150, label: 'Stars', type: 'counter' },
            { icon: '🔥', title: 'Streak', stat: 120, label: 'Days', type: 'counter' },
            { icon: '💡', title: 'Ideas', stat: 42, label: 'In Progress', type: 'counter' }
        ]
    ];

    return pageCards[pageIndex] || [];
}

let prevActive: page, prevShowing: boolean = !1;
function PagesHeader({ headerProps, shadow, globalContexts, ref, refs }: { headerProps?: headerProps, shadow?: boolean, globalContexts?: Context, ref?: React.RefObject<any>, refs: Registry<any> }) {
    const router = useRouter();
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

    useEffect(() => {
        const {
            shadowTitles,
            shadowTitle,
            descWords,
            contentCards,
            cardItems,
            cardOrbs,
            seeMoreBtn
        } = fixCloneRef(refs);

        setTimeout(() => {
            if (shadowTitle && shadowTitles?.[1]) {
                gsap.set(shadowTitle, {
                    scrollTo: { x: shadowTitles[1].offsetLeft },
                    opacity: 0
                });
            }

            if (descWords?.length) {
                const validDescWords = descWords.filter(Boolean);
                if (validDescWords.length > 0) {
                    gsap.set(validDescWords, {
                        y: '100%'
                    });
                }
            }

            if (contentCards) {
                gsap.set(contentCards, {
                    opacity: 0
                });
            }

            if (seeMoreBtn) {
                gsap.set(seeMoreBtn, {
                    opacity: 0,
                    yPercent: 200,
                    scale: 0.9
                });
            }

            if (cardItems?.length) {
                const validCardItems = cardItems.filter(Boolean);
                if (validCardItems.length > 0) {
                    gsap.set(validCardItems, {
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                    });
                }
            }

            // Animação contínua dos orbs
            if (cardOrbs && cardOrbs.length) {
                cardOrbs.forEach((orb: HTMLDivElement, index: number) => {
                    if (orb) {
                        gsap.to(orb, {
                            y: '+=20',
                            x: '+=10',
                            duration: 3 + index * 0.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });
                    }
                });
            }
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
            descWords,
            contentCards,
            cardItems,
            statNumbers,
            progressBars,
            seeMoreBtn
        } = fixCloneRef(refs), showing = pageIndex != 0, showingChanges = showing != prevShowing;

        if (showing) {
            if (showingChanges) {
                if (shadowTitleLine) {
                    gsap.to(shadowTitleLine, {
                        scaleX: 1,
                        duration: .3
                    });
                }

                if (shadowTitle) {
                    gsap.to(shadowTitle, {
                        opacity: 1,
                        delay: .3,
                        duration: 1
                    });
                }

                if (contentCards) {
                    gsap.to(contentCards, {
                        opacity: 1,
                        duration: .45,
                        ease: 'power2.out'
                    });
                }
            };

            if (shadowTitle && shadowTitles?.[pageIndex]) {
                gsap.to(shadowTitle, {
                    scrollTo: { x: shadowTitles[pageIndex].offsetLeft }
                });
            }

            pagesList.forEach((page, descIndex) => {
                const text = page.headerProps.desc;
                const letters = text.split('');

                letters.forEach((_, letterIndex) => {
                    const letterRef = descWords[descIndex * 10000 + letterIndex];

                    if (letterRef) {
                        if (descIndex === pageIndex) {
                            gsap.to(letterRef, {
                                y: 0,
                                duration: 0.4,
                                delay: letterIndex * 0.02,
                                ease: 'power2.out'
                            });
                        } else {
                            gsap.to(letterRef, {
                                y: '100%',
                                duration: 0.25
                            });
                        }
                    }
                });
            });

            if (cardsPageIndex !== pageIndex) {
                if (!cardItems?.length) {
                    setCardsPageIndex(pageIndex);
                } else {
                    const validCards = cardItems.filter(Boolean);
                    if (validCards.length > 0) {
                        // Animar botão saindo
                        if (seeMoreBtn) {
                            gsap.to(seeMoreBtn, {
                                opacity: 0,
                                yPercent: 50,
                                scale: 0.95,
                                duration: 0.2,
                                ease: 'power1.out'
                            });
                        }

                        gsap.to(validCards, {
                            opacity: 0,
                            y: 20,
                            scale: 0.97,
                            duration: 0.25,
                            ease: 'power1.out',
                            stagger: 0.04,
                            onComplete: () => setCardsPageIndex(pageIndex)
                        });
                    } else {
                        setCardsPageIndex(pageIndex);
                    }
                }
            }
        }
        else {
            if (contentCards) {
                gsap.to(contentCards, {
                    opacity: 0,
                    duration: .25,
                    ease: 'power1.out'
                });
            }

            if (seeMoreBtn) {
                gsap.to(seeMoreBtn, {
                    opacity: 0,
                    yPercent: 200,
                    scale: 0.9,
                    duration: 0.25,
                    ease: 'power1.out'
                });
            }

            if (cardsPageIndex !== 0) {
                setCardsPageIndex(0);
            }
        }

        prevShowing = showing;
    }, [pageIndex, cardsPageIndex]);

    useEffect(() => {
        if (cardsPageIndex === 0) return;

        const {
            cardItems,
            statNumbers,
            progressBars,
            seeMoreBtn
        } = fixCloneRef(refs);

        if (!cardItems?.length) return;

        const currentCards = getCardsDataByPage(cardsPageIndex);
        const validCards = cardItems.filter(Boolean);

        validCards.forEach((card: HTMLDivElement, cardIndex: number) => {
            const cardData = currentCards[cardIndex];

            if (cardIndex < currentCards.length && card) {
                const baseDelay = cardIndex * 0.1 + 0.1;

                if (cardsPageIndex === 1) {
                    gsap.fromTo(card,
                        { opacity: 0, y: 24, scale: 0.96 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.55,
                            delay: baseDelay,
                            ease: 'back.out(1.5)'
                        }
                    );
                }
                else if (cardsPageIndex === 2) {
                    gsap.fromTo(card,
                        { x: -35, opacity: 0, rotateY: -10 },
                        {
                            x: 0,
                            opacity: 1,
                            rotateY: 0,
                            duration: 0.6,
                            delay: baseDelay,
                            ease: 'power2.out'
                        }
                    );
                }
                else if (cardsPageIndex === 3) {
                    gsap.fromTo(card,
                        { rotateX: 55, opacity: 0, y: 20 },
                        {
                            rotateX: 0,
                            opacity: 1,
                            y: 0,
                            duration: 0.65,
                            delay: baseDelay,
                            ease: 'power2.out'
                        }
                    );
                }

                if (cardData) {
                    const statNum = statNumbers?.[cardIndex];
                    const progressBar = progressBars?.[cardIndex];

                    if (cardData.type === 'counter' && statNum) {
                        gsap.to({ value: 0 }, {
                            value: cardData.stat,
                            duration: 1.2,
                            delay: baseDelay + 0.15,
                            ease: 'power2.out',
                            onUpdate: function() {
                                if (statNum) {
                                    statNum.textContent = Math.floor(this.targets()[0].value).toString();
                                }
                            }
                        });
                    } else if (cardData.type === 'progress' && progressBar) {
                        gsap.fromTo(progressBar,
                            { width: '0%' },
                            {
                                width: `${cardData.stat}%`,
                                duration: 1.2,
                                delay: baseDelay + 0.2,
                                ease: 'power2.out'
                            }
                        );

                        if (statNum) {
                            gsap.to({ value: 0 }, {
                                value: cardData.stat,
                                duration: 1.2,
                                delay: baseDelay + 0.2,
                                ease: 'power2.out',
                                onUpdate: function() {
                                    if (statNum) {
                                        statNum.textContent = Math.floor(this.targets()[0].value).toString();
                                    }
                                }
                            });
                        }
                    } else if (cardData.type === 'text' && statNum) {
                        gsap.fromTo(statNum,
                            { opacity: 0, y: 8 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.45,
                                delay: baseDelay + 0.15
                            }
                        );
                    }
                }
            } else if (card) {
                gsap.set(card, {
                    opacity: 0,
                    y: 30,
                    scale: 0.95
                });
            }
        });

        // Animar botão entrando
        if (seeMoreBtn) {
            gsap.fromTo(seeMoreBtn,
                { opacity: 0, yPercent: 200, scale: 0.9 },
                {
                    opacity: 1,
                    yPercent: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: 0.5,
                    ease: 'back.out(1.5)'
                }
            );
        }
    }, [cardsPageIndex]);

    return <section ref={ref} className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
        {headerProps ? <>{headerProps.title}</> : <main className={styles.shadowContent}>
            <div className={styles.mainContent}>
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
                                {headerProps.desc.split('').map((letter, letterInd) => (
                                    <span 
                                        key={letterInd} 
                                        className={`${styles.letterWrapper}${letter === ' ' ? ` ${styles.space}` : ''}`}
                                    >
                                        <span ref={getRef("descWords", ind * 10000 + letterInd)} className={styles.letter}>{letter}</span>
                                    </span>
                                ))}
                            </span>
                        )}
                    </p>
                </aside>
                <div className={styles.contentBox} ref={getRef("contentCards")}>
                    <div className={styles.orbsContainer}>
                        <div className={styles.orb} ref={getRef("cardOrbs", 0)} />
                        <div className={styles.orb} ref={getRef("cardOrbs", 1)} />
                        <div className={styles.orb} ref={getRef("cardOrbs", 2)} />
                    </div>
                    {getCardsDataByPage(cardsPageIndex).map((card, cardIdx) => (
                        <div 
                            key={`${cardsPageIndex}-${cardIdx}`} 
                            className={styles.contentItem}
                            ref={getRef("cardItems", cardIdx)}
                        >
                            <div className={styles.cardIcon}>{card.icon}</div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <div className={styles.cardStat}>
                                    {card.type === 'text' ? (
                                        <span 
                                            className={styles.statText}
                                            ref={getRef("statNumbers", cardIdx)}
                                        >
                                            {card.label}
                                        </span>
                                    ) : (
                                        <>
                                            <span 
                                                className={styles.statNumber}
                                                ref={getRef("statNumbers", cardIdx)}
                                                data-value={card.stat}
                                            >
                                                0
                                            </span>
                                            <span className={styles.statLabel}>{card.label}</span>
                                        </>
                                    )}
                                </div>
                                {card.type === 'progress' && (
                                    <div className={styles.progressBarContainer}>
                                        <div 
                                            className={styles.progressBar}
                                            ref={getRef("progressBars", cardIdx)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button 
                ref={getRef("seeMoreBtn")}
                className={styles.seeMoreBtn}
                style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 9999, position: 'relative' }}
                onClick={(e) => {
                    e.stopPropagation();
                    const currentPage = pagesList[pageIndex];
                    if (currentPage?.url) {
                        router.push(currentPage.url);
                    }
                }}
            >
                <span className={styles.btnText}>See More</span>
                <span className={styles.btnIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </span>
            </button>
        </main>}
    </section>
}

export default PagesHeader;