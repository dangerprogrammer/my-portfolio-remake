import { page } from '@/types';
import styles from '../pages-header.module.scss';
import { RefObject } from 'react';

interface PageDescriptionProps {
    pagesList: page[];
    getRef: <K extends string>(key: K, index?: number) => RefObject<any> | React.RefCallback<any>;
}

function PageDescription({ pagesList, getRef }: PageDescriptionProps) {
    return (
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
    );
}

export default PageDescription;
