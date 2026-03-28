import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BottomNav.module.css";
import { FaHome, FaConciergeBell, FaHistory, FaPhoneAlt, FaRocket } from "react-icons/fa";

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navItemContainer}>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className={`${styles.navItem} ${isActive("/") ? styles.active : ""}`}>
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/services" onClick={() => window.scrollTo(0, 0)} className={`${styles.navItem} ${isActive("/services") ? styles.active : ""}`}>
          <FaConciergeBell />
          <span>Services</span>
        </Link>
        
        <div className={styles.fabContainer}>
          <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className={styles.fab}>
            <FaRocket />
          </Link>
        </div>

        <Link to="/ourstory" onClick={() => window.scrollTo(0, 0)} className={`${styles.navItem} ${isActive("/ourstory") ? styles.active : ""}`}>
          <FaHistory />
          <span>Story</span>
        </Link>
        <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className={`${styles.navItem} ${isActive("/contact") ? styles.active : ""}`}>
          <FaPhoneAlt />
          <span>Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default memo(BottomNav);
