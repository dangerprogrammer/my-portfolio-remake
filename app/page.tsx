'use client';

import Navbar from "@/components/navbar/navbar";
import Pages from "@/components/pages/pages";
import pagesList from "@/components/pages/pages-list";
import { renderPage } from "@/scripts/start";
import { useEffect } from "react";
import { GlobalContext } from "@/components/context/context";
import PagesHeader from "@/components/pages/pages-header";
import { useRefs } from "@/components/context/ref-context";

function Home() {
  const contexts = GlobalContext();
  const refs = useRefs();

  useEffect(() => renderPage(contexts, refs), []);

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