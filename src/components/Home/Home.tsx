import React from "react";
import styles from "./Home.module.css";
import { HOME_CONTENT } from "../../shared/constants/homeConstant.ts";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>{HOME_CONTENT.logo}</div>
        <nav className={styles.nav}>
          <ul>
            {HOME_CONTENT.navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuIcon}>
          <span>☰</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>{HOME_CONTENT.heroTitle}</h1>
        <p>{HOME_CONTENT.heroDescription}</p>
        <button className={styles.ctaButton}>{HOME_CONTENT.ctaButtonText}</button>
        <div className={styles.scrollIndicator}>{HOME_CONTENT.scrollIndicator}</div>
      </section>
    </div>
  );
};

export default Home;
