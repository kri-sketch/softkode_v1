import React, { useEffect, useState } from "react";
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
import ContactPopup from "./shared/ContactPopup/ContactPopup";
import BackButton from "./shared/BackButton/BackButton";
import ChatAssistant from "./shared/ChatAssistant/ChatAssistant";
import BottomNav from "./shared/BottomNav/BottomNav";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import CaseStudyList from "./components/CaseStudy/CaseStudyList";


const CONTACT_POPUP_SUPPRESS_KEY = "contactPopupSuppressedUntil";

const App: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [suppressUntil, setSuppressUntil] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(CONTACT_POPUP_SUPPRESS_KEY);
    if (saved) {
      const until = Number(saved);
      if (Number.isFinite(until) && until > Date.now()) {
        setSuppressUntil(until);
      }
    }
  }, []);

  useEffect(() => {
    const checkPopup = () => {
      if (Date.now() >= suppressUntil) {
        setPopupOpen(true);
      }
    };

    // show first time one minute after the user lands if not suppressed
    const initialTimer = setTimeout(checkPopup, 60_000);
    const interval = setInterval(checkPopup, 60_000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [suppressUntil]);

  const handlePopupClose = () => {
    setPopupOpen(false);
    const muteDuration = 60_000; // 1 minute
    const next = Date.now() + muteDuration;
    setSuppressUntil(next);
    localStorage.setItem(CONTACT_POPUP_SUPPRESS_KEY, String(next));
  };

  return (
    <>
      <Helmet>
        <title>Softkode | Custom Software & Digital Products</title>
        <meta
          name="description"
          content="Softkode builds custom software and digital products that help businesses grow. Located in Pune, India."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://softkode.io/" />
        <meta property="og:site_name" content="Softkode | Softkode Technologies" />
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
        <Route
          path="/case-study"
          element={
            <>
              <BackButton />
              <Header />
              <CaseStudyList />
            </>
          }
        />
        <Route
          path="/casestudy"
          element={
            <>
              <BackButton />
              <Header />
              <CaseStudyList />
            </>
          }
        />
        <Route
          path="/casestudy/:id"
          element={
            <>
              <BackButton />
              <Header />
              <CaseStudy />
            </>
          }
        />
      </Routes>

      <ChatAssistant />
      <ContactPopup open={popupOpen} onClose={handlePopupClose} />
      <BottomNav />
      <Footer />
    </>
  );
};

export default App;
