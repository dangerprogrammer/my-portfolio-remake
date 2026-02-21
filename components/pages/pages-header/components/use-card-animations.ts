import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Registry } from '@/types';
import { fixCloneRef } from '@/components/context/ref-context';
import { getCardsDataByPage } from './card-data';

export function useCardAnimations(refs: Registry<any>, cardsPageIndex: number) {
    const prevCardsPageIndex = useRef(0);

    useLayoutEffect(() => {
        if (cardsPageIndex === 0) {
            prevCardsPageIndex.current = 0;
            return;
        }

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

                // Animação de entrada específica por página
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
                } else if (cardsPageIndex === 2) {
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
                } else if (cardsPageIndex === 3) {
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

                // Animação de estatísticas
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

        // Botão fixo entre trocas de tópico; anima apenas na entrada vindo do welcome
        if (seeMoreBtn) {
            if (prevCardsPageIndex.current === 0) {
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
            } else {
                gsap.set(seeMoreBtn, {
                    opacity: 1,
                    yPercent: 0,
                    scale: 1
                });
            }
        }

        prevCardsPageIndex.current = cardsPageIndex;
    }, [cardsPageIndex]);
}
