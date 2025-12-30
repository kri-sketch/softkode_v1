import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import girlpic from "../../shared/image/girl.png";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const CONTACT_TO = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn("emailjs.init failed in Footer:", err);
      }
    }
  }, []);

  const submitNewsletter = async () => {
    if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address" });
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        type: "error",
        text: "Email service not configured. Please set EmailJS env vars.",
      });
      return;
    }

    setSending(true);
    const templateParams = {
      from_email: email,
      from_name: email.split("@")[0] || "",
      message: "Newsletter signup",
      to_email: CONTACT_TO,
    };

    try {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch {}
      const resp = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("Footer newsletter sent:", resp);
      setStatus({
        type: "success",
        text: `Thanks — we'll be in touch at ${email}`,
      });
      setEmail("");
      setTimeout(() => setStatus(null), 6000);
    } catch (err: any) {
      console.error("Newsletter send error:", err);
      const text = err && (err.text || err.message || JSON.stringify(err));
      setStatus({ type: "error", text: text || "Failed to send subscription" });
    } finally {
      setSending(false);
    }
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
      <div className="container">
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
                <button
                  className={styles.btnn}
                  onClick={submitNewsletter}
                  disabled={sending}
                  aria-disabled={sending}
                >
                  {sending ? "Sending..." : "Get in touch"}
                </button>
              </div>
              {status && (
                <div
                  className={`${styles.newsStatus} ${
                    status.type === "success"
                      ? styles.newsSuccess
                      : styles.newsError
                  }`}
                  role="status"
                >
                  {status.text}
                </div>
              )}
            </div>
                    
          </div>

          {/* Right: Footer Navigation */}
          <div className={styles.footerLinks}>
            <div className={styles.logoBox}>
              <h3>Soft Kode</h3>
              <div
                className={styles.contactItem}
                onClick={openMap}
                role="button"
              >
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
