'use client';

import Navbar from "@/components/navbar/navbar";
import Pages from "@/components/pages/pages";
import pagesList from "@/components/pages";
import { renderPage } from "@/scripts/start";
import { useEffect } from "react";

function Home() {
  useEffect(renderPage, []);

  console.log(pagesList);

  return <>
    <Navbar />
    <Pages>
      { pagesList.map((Page, ind) => <Page key={ind}/>) }
    </Pages>
  </>
}

export default Home;