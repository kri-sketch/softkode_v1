import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import softkodeLogo from "../../shared/image/softkode_icon_transparent.png";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExclusionMode, setExclusionMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("themeExclusion") === "true";
    setExclusionMode(saved);
    document.body.classList.toggle("theme-exclusion", saved);
  }, []);

  const toggleTheme = () => {
    const next = !isExclusionMode;
    setExclusionMode(next);
    localStorage.setItem("themeExclusion", String(next));
    document.body.classList.toggle("theme-exclusion", next);
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img
          src={softkodeLogo}
          alt="Softkode Logo"
          className={styles.softkode}
          loading="lazy"
          decoding="async"
        />
        <span>SoftKode</span>
      </div>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.show : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/ourstory">Our story</Link>
          </li>
          <li>
            <Link to="/#latest-news">Tech Updates</Link>
          </li>
          <li>
            <Link to="/caseStudy">Case Study</Link>
          </li>
          <li>
            <Link to="/jobservice" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Tech Jobs
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle dark/night blend mode"
        type="button"
      >
        <span className={styles.iconContainer}>
          {isExclusionMode ? <FaSun /> : <FaMoon />}
        </span>
        <span className={styles.themeLabel}>
          {isExclusionMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <FaBars />
      </div>
    </header>
  );
};

export default memo(Header);
