import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import OurStory from "./components/OurStory/OurStory";
import Header from "./components/Header/Header";
import Pricing from "./components/Pricing/Pricing";
import Software from "./components/Software/Software";
import Client from "./components/Client/Client";
import Footer from "./shared/Footer/Footer";
import Contact from "./components/Contact/Contact";
import BackButton from "./shared/BackButton/BackButton";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/pricing"
          element={
            <>
              <BackButton />
              <Header />
              <Pricing />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <BackButton />
              <Header /> <Software />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <BackButton />
              <Header />
              <Client />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <BackButton />
              <Header />
              <Contact />
            </>
          }
        />
        <Route
          path="/ourstory"
          element={
            <>
              <BackButton />
              <Header />
              <OurStory />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
