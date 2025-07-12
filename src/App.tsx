import React from "react";
import Home from "./components/Home/Home.tsx"; 
import "./App.css";
import Software from "./components/Software/Software.tsx";

import Pricing from "./components/Pricing/Pricing.tsx";
import Client from "./components/Client/Client.tsx";
import GetForm from "./shared/GetForm/GetForm.tsx";
import Footer from "./shared/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Software />
      <Pricing/>
      <Client/>
      <GetForm/>
      <Footer/>
    </div>
  );
};

export default App;
