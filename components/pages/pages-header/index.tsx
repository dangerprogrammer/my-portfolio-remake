'use client';

import { Context, headerProps, page } from '@/types';
import indexStyles from '../index.module.scss';
import { useEffect } from 'react';

let prevActive: page;
function PagesHeader({ headerProps, shadow, globalContexts }: { headerProps?: headerProps, shadow?: boolean, globalContexts?: Context }) {
    useEffect(() => {
        globalContexts = globalContexts!;
        if (prevActive == globalContexts.activePage) return;

        console.log("activePage", globalContexts.activePage);

        prevActive = globalContexts.activePage;
    }, [globalContexts?.snapping]);

    return <section className={indexStyles.page + (shadow ? ` ${indexStyles.shadowPage}` : '')}>
        {headerProps ? <>{headerProps.title}</> : <>Shadow</>}
    </section>
}

export default PagesHeader;