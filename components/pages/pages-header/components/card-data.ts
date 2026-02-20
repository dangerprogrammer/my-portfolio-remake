export type CardType = 'counter' | 'text' | 'progress';

export interface CardData {
    icon: string;
    title: string;
    stat: number;
    label: string;
    type: CardType;
}

export function getCardsDataByPage(pageIndex: number): CardData[] {
    const pageCards: CardData[][] = [
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
