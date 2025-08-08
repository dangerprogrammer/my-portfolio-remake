import React from "react";
import AboutMe from "./about-me/about-me";
import Welcome from "./welcome/welcome";
import styles from './index.module.scss';

let pagesList = [
    Welcome,
    AboutMe,
    Welcome,
    AboutMe,
    Welcome,
    AboutMe
];

pagesList.forEach((Page, i) => {
    pagesList[i] = () => <section className={styles.page}>
        <Page/>
    </section>
});

export default pagesList;