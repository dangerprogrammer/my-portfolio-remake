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
  const { getRef } = useRefs<{
    "items": HTMLElement,
    "shadow": HTMLElement
  }>();

  useEffect(() => renderPage(contexts, refs), []);
  const pagesWithElem = pagesList.filter(({ Element }) => Element),
    pagesWithoutElem = pagesList.filter(({ Element }) => !Element);

  return <>
    <Navbar />
    <Pages>
      {pagesWithElem.map(({ Element }, ind) => (Element = Element!, <Element ref={getRef("items", ind)} globalContexts={contexts} key={ind} />))}
      <PagesHeader ref={getRef("shadow")} refs={refs} globalContexts={contexts} shadow={!0} />
      {pagesWithoutElem.map(({ headerProps }, ind) => <PagesHeader ref={getRef("items", ind + pagesWithElem.length)} refs={refs} globalContexts={contexts} headerProps={headerProps} key={ind} />)}
    </Pages>
  </>
}

export default Home;