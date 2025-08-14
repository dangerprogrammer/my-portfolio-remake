'use client';

import Navbar from "@/components/navbar/navbar";
import Pages from "@/components/pages/pages";
import pagesList from "@/components/pages/pages-list";
import { renderPage } from "@/scripts/start";
import { useContext, useEffect } from "react";
import { ContextApp } from "@/components/context/context";
import { Context } from "@/types";
import PagesHeader from "@/components/pages/pages-header";

function Home() {
  const { ...contexts } = useContext<Context>(ContextApp);

  useEffect(() => renderPage(contexts), []);

  return <>
    <Navbar />
    <Pages>
      {pagesList.filter(({ Element }) => Element).map(({ Element }, ind) => (Element = Element!, <Element globalContexts={contexts} key={ind} />))}
      <PagesHeader globalContexts={contexts} shadow={!0} />
      {pagesList.filter(({ Element }) => !Element).map(({ headerProps }, ind) => <PagesHeader globalContexts={contexts} headerProps={headerProps} key={ind} />)}
    </Pages>
  </>
}

export default Home;