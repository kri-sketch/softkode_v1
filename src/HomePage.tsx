import React from "react";
import Home from "./components/Home/Home.tsx";
import "./App.css";
import Software from "./components/Software/Software.tsx";
import Hiring from "./components/Hiring/Hiring";
import LatestNews from "./components/LatestNews/LatestNews";

import Pricing from "./components/Pricing/Pricing.tsx";
import Client from "./components/Client/Client.tsx";
import GetForm from "./shared/GetForm/GetForm.tsx";
import CaseStudyList from "./components/CaseStudy/CaseStudyList";
// import OurStory from "./components/OurStory/OurStory.tsx";
const HomePage: React.FC = () => {
  return (
    <div className="App">
      <div className="heroWrapper" id="home">
        <Home />
      </div>

      <Hiring />
      <Software />
      <Pricing />
      <Client />
      <CaseStudyList />
      <GetForm />
      <LatestNews />
      {/* <OurStory /> */}

      {/* Footer is rendered globally in App.tsx */}
    </div>
  );
};

export default HomePage;
