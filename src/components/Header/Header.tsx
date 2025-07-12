import React, { useState } from "react";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo}> 
        <img src="/logo.png" alt="SoftKode Logo" />
        <span>Soft<br />Kode</span>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.show : ""}`}>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/ourStory">Our story</a></li>
          <li><a href="/caseStudy">Case Study</a></li>
        </ul>
      </nav>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>
    </header>
  );
};

export default Header;
