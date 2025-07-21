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
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/ourstory">Our story</Link></li>
          <li><Link to="/caseStudy">Case Study</Link></li>
        </ul>
      </nav>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>
    </header>
  );
};

export default Header;