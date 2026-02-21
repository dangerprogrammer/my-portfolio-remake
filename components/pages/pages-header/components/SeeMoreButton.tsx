import styles from '../pages-header.module.scss';
import { RefObject } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface SeeMoreButtonProps {
    onSeeMore: () => void;
    getRef: <K extends string>(key: K) => RefObject<any> | React.RefCallback<any>;
}

function SeeMoreButton({ onSeeMore, getRef }: SeeMoreButtonProps) {
    return (
        <button 
            ref={getRef("seeMoreBtn")}
            className={styles.seeMoreBtn}
            style={{ cursor: 'pointer', pointerEvents: 'auto', zIndex: 9999, position: 'relative' }}
            onClick={(e) => {
                e.stopPropagation();
                onSeeMore();
            }}
        >
            <span className={styles.btnText}>See More</span>
            <span className={styles.btnIcon}>
                <FaChevronDown aria-hidden="true" />
            </span>
        </button>
    );
}

export default SeeMoreButton;
