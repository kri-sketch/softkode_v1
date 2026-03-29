// src/components/HeroTitle/HeroTitle.tsx
import React, { useEffect } from "react";
import { HOME_CONTENT } from "../../shared/constants/homeConstant.ts";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import initReveal from "../../shared/hooks/useReveal";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initReveal();

    document.body.classList.add("home-scroll-theme");
    return () => {
      document.body.classList.remove("home-scroll-theme");
    };
  }, []);

  return (
    <section className={styles.heroSection} data-reveal>
      <div className={styles.content}>
        <h1 className={styles.title}>{HOME_CONTENT.heroTitle}</h1>
        <p className={styles.subtitle}>
          We are a cross-disciplinary team, blending our expertise to deliver impactful digital solutions across industries.
        </p>
        <button className={styles.cta} onClick={() => navigate("/contact")}>
          {HOME_CONTENT.ctaButtonText}
        </button>

        <div className={styles.scrollIndicator}>↓</div>
      </div>
    </section>
  );
};

export default Home;
