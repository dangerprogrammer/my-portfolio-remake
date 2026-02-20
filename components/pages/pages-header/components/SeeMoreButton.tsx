import { useRouter } from 'next/navigation';
import styles from '../pages-header.module.scss';
import { RefObject } from 'react';

interface SeeMoreButtonProps {
    pageUrl?: string;
    getRef: <K extends string>(key: K) => RefObject<any> | React.RefCallback<any>;
}

function SeeMoreButton({ pageUrl, getRef }: SeeMoreButtonProps) {
    const router = useRouter();

    return (
        <button 
            ref={getRef("seeMoreBtn")}
            className={styles.seeMoreBtn}
            style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 9999, position: 'relative' }}
            onClick={(e) => {
                e.stopPropagation();
                if (pageUrl) {
                    router.push(pageUrl);
                }
            }}
        >
            <span className={styles.btnText}>See More</span>
            <span className={styles.btnIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
            </span>
        </button>
    );
}

export default SeeMoreButton;
