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
      {pagesList.filter(({ Element }) => Element).map(({ Element }, ind) => (Element = Element!, <Element {...contexts} key={ind} />))}
      <PagesHeader shadow={!0} />
      {pagesList.filter(({ Element }) => !Element).map(({ headerProps }, ind) => <PagesHeader {...contexts} headerProps={headerProps} key={ind} />)}
    </Pages>
  </>
}

export default Home;