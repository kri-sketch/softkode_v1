import React, { useState, useEffect } from "react";
import styles from "./ContactPopup.module.css";
import softkodeLogo from "../image/positive.png";
import bgImage from "../image/bg.png";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const CONTACT_TO = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

type Props = { open: boolean; onClose: () => void };

const ContactPopup: React.FC<Props> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (e) {}
    }
  }, []);

  const validate = () => {
    if (!name.trim()) {
      setStatus({ type: "error", text: "Please enter your name." });
      return false;
    }
    if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return false;
    }
    if (!message.trim()) {
      setStatus({ type: "error", text: "Please enter a message." });
      return false;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !CONTACT_TO) {
      setStatus({
        type: "error",
        text: "Email service is not configured properly.",
      });
      return false;
    }
    return true;
  };

  const sendForm = async () => {
    if (!validate()) {
      return;
    }

    setSending(true);
    const params = {
      from_name: name.trim(),
      from_email: email.trim(),
      contact: phone.trim(),
      message: message.trim(),
      to_email: CONTACT_TO,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      setStatus({ type: "success", text: "Message sent — thank you!" });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => onClose(), 1600);
    } catch (err: any) {
      const text = err && (err.text || err.message || JSON.stringify(err));
      setStatus({
        type: "error",
        text: text || "Failed to send, please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div
          className={styles.brandPanel}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(5,11,33,.72), rgba(17,29,58,.75)), url(${bgImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className={styles.brandPanelContent}>
            <div className={styles.brandLogoRow}>
              <img
                src={softkodeLogo}
                alt="SoftKode logo"
                className={styles.brandLogo}
              />
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>📩</span>
                <span>Get in Touch</span>
              </div>
            </div>
            <h3>SoftKode Contact Hub</h3>
            <p>
              High-impact lead capture with the same rich visuals as the hero
              section. Stylishly consistent, simple, and strongly branded.
            </p>
          </div>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
          noValidate
        >
          <h2>Get in touch</h2>

          <div className={styles.fieldGroup}>
            <label htmlFor="popup-name">Name</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                👤
              </span>
              <input
                id="popup-name"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="popup-email">Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                ✉️
              </span>
              <input
                id="popup-email"
                className={styles.input}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="popup-contact">Contact (optional)</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                📞
              </span>
              <input
                id="popup-contact"
                className={styles.input}
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="popup-message">Message</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                📝
              </span>
              <textarea
                id="popup-message"
                className={styles.textarea}
                placeholder="Please enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <div
              className={`${styles.status} ${
                status.type === "success" ? styles.success : styles.error
              }`}
              role="alert"
            >
              {status.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
