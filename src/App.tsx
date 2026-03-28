import React, { useEffect, useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";

// Global UI Components
import Footer from "./shared/Footer/Footer";
import ContactPopup from "./shared/ContactPopup/ContactPopup";
import BackButton from "./shared/BackButton/BackButton";
import ChatAssistant from "./shared/ChatAssistant/ChatAssistant";
import BottomNav from "./shared/BottomNav/BottomNav";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop";

// Optimized Lazy Loading for Components
const HomePage = lazy(() => import("./HomePage"));
const OurStory = lazy(() => import("./components/OurStory/OurStory"));
const Header = lazy(() => import("./components/Header/Header"));
const Pricing = lazy(() => import("./components/Pricing/Pricing"));
const Software = lazy(() => import("./components/Software/Software"));
const Client = lazy(() => import("./components/Client/Client"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const CaseStudy = lazy(() => import("./components/CaseStudy/CaseStudy"));
const CaseStudyList = lazy(() => import("./components/CaseStudy/CaseStudyList"));
const JobService = lazy(() => import("./components/JobService/JobService"));

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
      <ScrollToTop />
      <Header />
      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          fontWeight: '500',
          color: '#666',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div className="loading-spinner" style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0,0,0,0.1)',
            borderTop: '3px solid #000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '15px'
          }} />
          Loading Softkode...
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pricing"
            element={
              <>
                <BackButton />
                <Pricing />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <BackButton />
                <Software />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <BackButton />
                <Client />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <BackButton />
                <Contact />
              </>
            }
          />
          <Route
            path="/ourstory"
            element={
              <>
                <BackButton />
                <OurStory />
              </>
            }
          />
          <Route
            path="/case-study"
            element={
              <>
                <BackButton />
                <CaseStudyList />
              </>
            }
          />
          <Route
            path="/casestudy"
            element={
              <>
                <BackButton />
                <CaseStudyList />
              </>
            }
          />
          <Route
            path="/casestudy/:id"
            element={
              <>
                <BackButton />
                <CaseStudy />
              </>
            }
          />
          <Route
            path="/jobservice"
            element={
              <>
                <BackButton />
                <JobService />
              </>
            }
          />
        </Routes>
      </Suspense>

      <ChatAssistant />
      <ContactPopup open={popupOpen} onClose={handlePopupClose} />
      <BottomNav />
      <Footer />
    </>
  );
};

export default App;
