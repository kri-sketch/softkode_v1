// src/components/HeroTitle/HeroTitle.tsx
import React, { useEffect, useState } from "react";
import { HOME_CONTENT } from "../../shared/constants/homeConstant.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import ContactPopup from "../../shared/ContactPopup/ContactPopup";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPopupOpen(true), 60_000); // show after 60s
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <h1 className={styles.title}>{HOME_CONTENT.heroTitle}</h1>
        <p className={styles.subtitle}>
          We are a cross-disciplinary team, blending our expertise <br />
          to deliver impactful digital solutions across industries.
        </p>
        <button className={styles.cta} onClick={() => navigate("/contact")}>
          {HOME_CONTENT.ctaButtonText}
        </button>

        <div className={styles.scrollIndicator}>↓</div>
      </div>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
};

export default Home;
