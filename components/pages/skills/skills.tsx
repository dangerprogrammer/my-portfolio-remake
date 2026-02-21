import { useContext, useEffect, useRef } from 'react';
import { RefContext } from '@/components/context/context';
import { useRefs } from '@/components/context/ref-context';
import { FiArrowDown } from 'react-icons/fi';
import styles from './skills.module.scss';

function SkillsPage() {
    const contexts = useContext(RefContext);
    const expandedContent = contexts?.expandedContent;
    const isActive = contexts?.activePage?.url === '/skills';
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
            <div className={styles.placeholder}>Skills Page!</div>
            
            {showExpanded && (
                <div ref={expandedRef} className={styles.expandedContent}>
                    <div className={styles.contentSection}>
                        <h3>Technical Skills</h3>
                        <div className={styles.skillsGrid}>
                            <div className={styles.skillCategory}>
                                <h4>Frontend</h4>
                                <ul>
                                    <li>React / Next.js</li>
                                    <li>TypeScript</li>
                                    <li>SCSS / Tailwind</li>
                                    <li>GSAP Animations</li>
                                </ul>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Backend</h4>
                                <ul>
                                    <li>Node.js / Express</li>
                                    <li>Python / Django</li>
                                    <li>REST APIs</li>
                                    <li>GraphQL</li>
                                </ul>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Database</h4>
                                <ul>
                                    <li>PostgreSQL</li>
                                    <li>MongoDB</li>
                                    <li>Redis</li>
                                    <li>Prisma ORM</li>
                                </ul>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>Tools & Others</h4>
                                <ul>
                                    <li>Git / GitHub</li>
                                    <li>Docker</li>
                                    <li>AWS / Vercel</li>
                                    <li>CI/CD</li>
                                </ul>
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

export default SkillsPage;