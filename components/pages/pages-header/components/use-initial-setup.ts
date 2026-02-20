import { useEffect } from 'react';
import gsap from 'gsap';
import { Registry } from '@/types';
import { fixCloneRef } from '@/components/context/ref-context';

export function useInitialSetup(refs: Registry<any>) {
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
            // Setup inicial do título
            if (shadowTitle && shadowTitles?.[1]) {
                gsap.set(shadowTitle, {
                    scrollTo: { x: shadowTitles[1].offsetLeft },
                    opacity: 0
                });
            }

            // Setup inicial das letras da descrição
            if (descWords?.length) {
                const validDescWords = descWords.filter(Boolean);
                if (validDescWords.length > 0) {
                    gsap.set(validDescWords, {
                        y: '100%'
                    });
                }
            }

            // Setup inicial do content box
            if (contentCards) {
                gsap.set(contentCards, {
                    opacity: 0
                });
            }

            // Setup inicial do botão
            if (seeMoreBtn) {
                gsap.set(seeMoreBtn, {
                    opacity: 0,
                    yPercent: 200,
                    scale: 0.9
                });
            }

            // Setup inicial dos cards
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
}
