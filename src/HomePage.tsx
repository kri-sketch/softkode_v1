import React from "react";
import Home from "./components/Home/Home.tsx";
import "./App.css";
import Software from "./components/Software/Software.tsx";

import Pricing from "./components/Pricing/Pricing.tsx";
import Client from "./components/Client/Client.tsx";
import GetForm from "./shared/GetForm/GetForm.tsx";
import Header from "./components/Header/Header.tsx";
// import OurStory from "./components/OurStory/OurStory.tsx";
const HomePage: React.FC = () => {
  return (
    <div className="App">
      {/* Background section */}
      <div className="heroWrapper" id="home">
        <Header />
        <Home />
      </div>

      <Software />
      <Pricing />
      <Client />
      <GetForm />
      {/* <OurStory /> */}

      {/* Footer is rendered globally in App.tsx */}
    </div>
  );
};

export default HomePage;
