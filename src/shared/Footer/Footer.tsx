import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import girlpic from "../../shared/image/girl.png";
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const submitNewsletter = () => {
    if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // In a real app you'd call an API here
    alert(`Thanks — we'll be in touch at ${email}`);
    setEmail("");
  };

  const openPhone = () => (window.location.href = "tel:8237989969");
  const openMail = () =>
    (window.location.href = "mailto:krishnasharma@softkode.io");
  const openMap = () =>
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Pune,+Maharashtra,+India",
      "_blank"
    );

  const openSocial = (url: string) => window.open(url, "_blank", "noopener");

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topSection}>
        {/* Left: Image + Newsletter */}
        <div className={styles.imageBox}>
          <img
            src={girlpic}
            alt="Woman digital portrait"
            className={styles.girlimage}
          />
          <div className={styles.newsletterBox}>
            <p className={styles.title}>Keep in touch</p>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="newsletterEmail"
                name="newsletterEmail"
                placeholder="Email address"
                className={styles.gmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Newsletter email"
              />
              <button className={styles.btnn} onClick={submitNewsletter}>
                Get in touch
              </button>
            </div>
          </div>
                  
        </div>

        {/* Right: Footer Navigation */}
        <div className={styles.footerLinks}>
          <div className={styles.logoBox}>
            <h3>Soft Kode</h3>
            <div className={styles.contactItem} onClick={openMap} role="button">
              <span className={styles.icon}>📍</span>
              <span>Pune, Maharashtra, India, 411033</span>
            </div>
            <div
              className={styles.contactItem}
              onClick={openPhone}
              role="button"
            >
              <span className={styles.icon}>📞</span>
              <span>8237989969</span>
            </div>
            <div
              className={styles.contactItem}
              onClick={openMail}
              role="button"
            >
              <span className={styles.icon}>✉️</span>
              <span>krishnasharma@softkode.io</span>
            </div>
          </div>

          <div className={styles.linksGroup}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ourstory">About us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksGroup}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/ourstory">Our story</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p>2024 Softkode Technologies Pvt. Designed by Softkode</p>
        <div className={styles.socialIcons}>
          <div
            className={styles.btn}
            role="button"
            onClick={() => openSocial("https://www.facebook.com/")}
            aria-label="facebook"
          >
            f
          </div>
          <div
            className={styles.btn}
            role="button"
            onClick={() => openSocial("https://twitter.com/")}
            aria-label="x"
          >
            x
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
