import React from "react";
import Home from "./components/Home/Home.tsx"; 
import "./App.css";
import Software from "./components/Software/Software.tsx";

import Pricing from "./components/Pricing/Pricing.tsx";
import Client from "./components/Client/Client.tsx";
import GetForm from "./shared/GetForm/GetForm.tsx";
import Footer from "./shared/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import OurStory from "./components/OurStory/OurStory.tsx";
const App: React.FC = () => {
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
      <OurStory />
      
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default App;
