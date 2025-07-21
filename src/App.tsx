import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; 
import OurStory from "./components/OurStory/OurStory";
import Header from "./components/Header/Header";
import Pricing from "./components/Pricing/Pricing";
import Software from "./components/Software/Software";
import Client from "./components/Client/Client";
import Footer from "./shared/Footer/Footer.tsx";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<><Header /><Pricing /></>} />
      
      
      <Route path="/about" element={<><Header /> <Software/></>} />
      <Route path="/services" element={<><Header /><Client /></>} />
      <Route path="/ourstory" element={<><Header /><OurStory /><Footer/></>} />
      
    </Routes>
  );
};

export default App;
