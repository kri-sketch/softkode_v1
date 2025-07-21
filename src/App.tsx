import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; 
import OurStory from "./components/OurStory/OurStory";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/our-story" element={<OurStory />} />
    </Routes>
  );
};

export default App;
