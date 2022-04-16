import { useState, useEffect, useContext } from "react";
import { HomePageContext } from "../../context/HomePageContext";

import MemeContainer from "./MemeContainer";

export default function HomePageView() {

  const [homePageData, setHomePageData] = useContext(HomePageContext);

  return (
    <div className="container">
      <MemeContainer />
    </div>
  );
}
