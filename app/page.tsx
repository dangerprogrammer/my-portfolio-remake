'use client';

import Navbar from "@/components/navbar/navbar";
import Pages from "@/components/pages/pages";
import pagesList from "@/components/pages";
import { renderPage } from "@/scripts/start";
import { useContext, useEffect } from "react";
import { ContextApp } from "@/components/context/context";

function Home() {
  const { ...contexts }: any = useContext(ContextApp);

  useEffect(() => renderPage(contexts.setActivePage), []);

  return <>
    <Navbar {...contexts} />
    <Pages>
      {pagesList.map(({ Element }, ind) => <Element {...contexts} key={ind} />)}
    </Pages>
  </>
}

export default Home;