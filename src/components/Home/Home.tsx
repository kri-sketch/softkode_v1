// src/components/HeroTitle/HeroTitle.tsx
import React from "react";
import { HOME_CONTENT } from "../../shared/constants/homeConstant.ts";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      
      <div className={styles.content}>
        <h1 className={styles.title}>{HOME_CONTENT.heroTitle}</h1>
        <p className={styles.subtitle}>
          We are a cross-disciplinary team, blending our expertise <br />
          to deliver impactful digital solutions across industries.
        </p>
        <button className={styles.cta}>{HOME_CONTENT.ctaButtonText}</button>
        <div className={styles.scrollIndicator}>↓</div>
      </div>
    </section>
  );
};

export default Home;
