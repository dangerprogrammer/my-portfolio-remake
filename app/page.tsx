'use client';

import Navbar from "@/components/navbar/navbar";
import Pages from "@/components/pages/pages";
import pagesList from "@/components/pages";
import { renderPage } from "@/scripts/start";
import { useContext, useEffect } from "react";
import { ContextApp } from "@/components/context/context";
import { Context } from "@/types";

function Home() {
  const { ...contexts } = useContext<Context>(ContextApp);

  useEffect(() => renderPage(contexts.setActivePage), []);

  return <>
    <Navbar {...contexts} />
    <Pages>
      {pagesList.map(({ Element }, ind) => <Element {...contexts} key={ind} />)}
    </Pages>
  </>
}

export default Home;