import { useEffect } from 'react';
import gsap from 'gsap';
import { Registry, page } from '@/types';
import { fixCloneRef } from '@/components/context/ref-context';

let prevShowing: boolean = false;

export function usePageTransitions(
    refs: Registry<any>, 
    pagesList: page[], 
    pageIndex: number, 
    cardsPageIndex: number,
    setCardsPageIndex: (index: number) => void
) {
    useEffect(() => {
        const {
            shadowTitles,
            shadowTitle,
            shadowTitleLine,
            descWords,
            contentCards,
            cardItems,
            seeMoreBtn
        } = fixCloneRef(refs);
        
        const showing = pageIndex !== 0;
        const showingChanges = showing !== prevShowing;

        if (showing) {
            // Animações de entrada quando muda de estado
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
            }

            // Scroll do título para a página atual
            if (shadowTitle && shadowTitles?.[pageIndex]) {
                gsap.to(shadowTitle, {
                    scrollTo: { x: shadowTitles[pageIndex].offsetLeft }
                });
            }

            // Animação das letras da descrição
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

            // Transição entre cards de diferentes páginas
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

                        // Animar cards saindo
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
        } else {
            // Animações de saída quando volta para welcome
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
}
