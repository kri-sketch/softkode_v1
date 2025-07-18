import React from "react";
import styles from "./Footer.module.css";
import girlpic from "../../shared/image/girl.png";
const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
       
      <div className={styles.topSection}>
         
        {/* Left: Image + Newsletter */}
        <div className={styles.imageBox}>
          <img
            src={girlpic}
            alt="Woman digital portrait" className={styles.girlimage}
          />
         
  <div className={styles.newsletterBox}>
    <p className={styles.title}>Keep in touch</p>
    <div className={styles.inputGroup}>
      <input type="email" placeholder="Email address" className={styles.gmail}/>
      <button className={styles.btnn}>Get in touch</button>
    </div>
  
</div>


        </div>

        {/* Right: Footer Navigation */}
        <div className={styles.footerLinks}>
          <div className={styles.logoBox}>
            <h3>Soft Kode</h3>
            <p>Pune, Maharashtra, India, 411035</p>
            <p>📞 8237899069</p>
            <p>✉️ krishnasharma@softkode.io</p>
          </div>

          <div className={styles.linksGroup}>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className={styles.linksGroup}>
            <h4>Company</h4>
            <ul>
              <li>Our story</li>
              <li>Team</li>
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <p>2024 Softkode Technologies Pvt. Designed by Softkode</p>
        <div className={styles.socialIcons}>
          <span>📘</span>
          <span>❌</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
