import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import softkodeLogo from "../../shared/image/positive.png";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  

  return (
    <header className={styles.header}>
      <div className={styles.logo}> 
       <img src={softkodeLogo} alt="Softkode Logo" className={styles.softkode} />
        <span>Soft<br />Kode</span>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.show : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><Link to="/ourstory">Our story</Link></li>
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