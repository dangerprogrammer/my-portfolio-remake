'use client';

import Navbar from "@/components/navbar/navbar";
import Pages, { PagesHeader } from "@/components/pages/pages";
import pagesList from "@/components/pages/pagesList";
import { renderPage } from "@/scripts/start";
import { useContext, useEffect } from "react";
import { ContextApp } from "@/components/context/context";
import { Context } from "@/types";

function Home() {
  const { ...contexts } = useContext<Context>(ContextApp);

  useEffect(() => renderPage(contexts.setActivePage), []);

  return <>
    <Navbar />
    <Pages>
      {pagesList.map(({ Element, headerProps }, ind) => Element ? <Element {...contexts} key={ind} /> : <PagesHeader {...contexts} {...headerProps} key={ind} />)}
    </Pages>
  </>
}

export default Home;