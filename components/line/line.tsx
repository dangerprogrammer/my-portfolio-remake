import styles from './line.module.scss';

function Line({ ref, orientation, origin, fixedStyles }: {
    ref?: React.RefObject<any>,
    orientation?: 'vertical' | 'horizontal',
    origin?: 'top' | 'bottom' | 'left' | 'right',
    fixedStyles?: React.CSSProperties
}) {
    orientation ??= 'horizontal';

    return <span
        ref={ref}
        className={`${styles.line} ${styles[orientation]}${origin ? ` ${styles[`origin-${origin}`]}` : ''}`}
        style={fixedStyles}
    ></span>
};

export default Line;