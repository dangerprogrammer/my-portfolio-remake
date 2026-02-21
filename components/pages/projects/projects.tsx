import { useContext, useEffect, useRef } from 'react';
import { RefContext } from '@/components/context/context';
import { useRefs } from '@/components/context/ref-context';
import { FiArrowDown } from 'react-icons/fi';
import styles from '../expanded-page.module.scss';

function ProjectsPage() {
    const contexts = useContext(RefContext);
    const expandedContent = contexts?.expandedContent;
    const isActive = contexts?.activePage?.url === '/projects';
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
        <section ref={sectionRef} className={`${styles.pageSection}${showExpanded ? ` ${styles.expanded} ${styles.expandedStart}` : ''}`}>
            <div className={styles.placeholder}>Projects Page!</div>
            
            {showExpanded && (
                <div ref={expandedRef} className={styles.expandedContent}>
                    <div className={styles.contentSection}>
                        <h3>Featured Projects</h3>
                        <div className={styles.projectsGrid}>
                            <div className={styles.projectCard}>
                                <div className={styles.projectImage}>🚀</div>
                                <h4>E-Commerce Platform</h4>
                                <p>Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory.</p>
                                <div className={styles.projectTags}>
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>Stripe</span>
                                </div>
                            </div>
                            <div className={styles.projectCard}>
                                <div className={styles.projectImage}>📱</div>
                                <h4>Social Media App</h4>
                                <p>Real-time social platform with messaging, feeds, and user interactions.</p>
                                <div className={styles.projectTags}>
                                    <span>Next.js</span>
                                    <span>Socket.io</span>
                                    <span>MongoDB</span>
                                </div>
                            </div>
                            <div className={styles.projectCard}>
                                <div className={styles.projectImage}>🎨</div>
                                <h4>Design System</h4>
                                <p>Comprehensive component library with documentation and theming support.</p>
                                <div className={styles.projectTags}>
                                    <span>React</span>
                                    <span>Storybook</span>
                                    <span>TypeScript</span>
                                </div>
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

export default ProjectsPage;
