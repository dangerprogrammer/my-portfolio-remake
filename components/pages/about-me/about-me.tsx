import { useContext, useEffect, useRef } from 'react';
import { RefContext } from '@/components/context/context';
import { useRefs } from '@/components/context/ref-context';
import { FiArrowDown } from 'react-icons/fi';
import styles from './about-me.module.scss';

function AboutMePage() {
    const contexts = useContext(RefContext);
    const expandedContent = contexts?.expandedContent;
    const isActive = contexts?.activePage?.url === '/about-me';
    const showExpanded = Boolean(expandedContent && isActive);
    const sectionRef = useRef<HTMLElement>(null);
    const expandedRef = useRef<HTMLDivElement>(null);
    const { getRef } = useRefs<{ "shadow": HTMLElement }>();
    const shadowRef = getRef("shadow");

    useEffect(() => {
        if (!showExpanded) return;
        // Scroll disabled for debugging
    }, [showExpanded]);

    useEffect(() => {
        const section = sectionRef.current;
        const shadow = shadowRef.current;

        if (!section || !shadow) return;

        if (!showExpanded) {
            shadow.style.transform = '';
            return;
        }

        const handleScroll = () => {
            shadow.style.transform = `translateY(${-section.scrollTop}px)`;
        };

        handleScroll();
        section.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            section.removeEventListener('scroll', handleScroll);
            shadow.style.transform = '';
        };
    }, [showExpanded, shadowRef]);

    return (
        <section ref={sectionRef} className={`${styles.pageSection}${showExpanded ? ` ${styles.expanded}` : ''}`}>
            <div className={styles.placeholder}>About Me Page!</div>
            
            {showExpanded && (
                <div ref={expandedRef} className={styles.expandedContent}>
                    <div className={styles.contentSection}>
                        <h3>About Me - Full Story</h3>
                        <p>I'm a passionate developer with years of experience building modern web applications. My journey started with curiosity and evolved into a deep love for creating elegant, performant solutions.</p>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.year}>2020</div>
                                <div className={styles.description}>Started my journey in web development</div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.year}>2022</div>
                                <div className={styles.description}>Specialized in React and Node.js</div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.year}>2024</div>
                                <div className={styles.description}>Full-stack developer at top companies</div>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        className={styles.closeBtn}
                        onClick={() => contexts?.setExpandedContent?.(false)}
                    >
                        <span>Back to main page</span>
                        <FiArrowDown aria-hidden="true" />
                    </button>
                </div>
            )}
        </section>
    );
}

export default AboutMePage;