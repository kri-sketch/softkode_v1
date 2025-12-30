import React from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Skode | Custom Software & Digital Products</title>
        <meta
          name="description"
          content="Skode builds custom software and digital products that help businesses grow. Located in Pune, India."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://softkode.io/" />
        <meta property="og:site_name" content="Skode | Softkode Technologies" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://softkode.io/" />
        <meta property="og:image" content="/logo192.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
