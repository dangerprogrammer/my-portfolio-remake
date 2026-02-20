import { CardData } from './card-data';
import styles from '../pages-header.module.scss';
import { RefObject } from 'react';

interface ContentCardProps {
    card: CardData;
    cardIndex: number;
    getRef: <K extends string>(key: K, index?: number) => RefObject<any> | React.RefCallback<any>;
}

function ContentCard({ card, cardIndex, getRef }: ContentCardProps) {
    return (
        <div 
            className={styles.contentItem}
            ref={getRef("cardItems", cardIndex)}
        >
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.cardStat}>
                    {card.type === 'text' ? (
                        <span 
                            className={styles.statText}
                            ref={getRef("statNumbers", cardIndex)}
                        >
                            {card.label}
                        </span>
                    ) : (
                        <>
                            <span 
                                className={styles.statNumber}
                                ref={getRef("statNumbers", cardIndex)}
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
                            ref={getRef("progressBars", cardIndex)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContentCard;
