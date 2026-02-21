import styles from './welcome.module.scss';

function WelcomeHeader() {
    const name = "Patrick";

    return (
        <div className={styles.welcomeContainer}>
            <div className={styles.decorativeElements}>
                <div className={styles.floatingOrb}></div>
                <div className={styles.floatingOrb}></div>
                <div className={styles.floatingOrb}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.greeting}>Welcome to my portfolio</div>
                
                <h1 className={styles.name}>
                    {name.split('').map((char, index) => (
                        <span key={index} className={styles.nameChar}>
                            {char}
                        </span>
                    ))}
                </h1>
                
                <h2 className={styles.title}>Full-Stack Developer & Designer</h2>
                
                <p className={styles.subtitle}>
                    Crafting beautiful digital experiences with modern technologies.
                    Passionate about building performant, user-friendly applications.
                </p>

                <div className={styles.scrollIndicator}>
                    <span className={styles.scrollText}>Explore</span>
                    <div className={styles.scrollIcon}></div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeHeader;