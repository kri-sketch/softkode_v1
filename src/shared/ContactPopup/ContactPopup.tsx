import React, { useState, useEffect } from "react";
import styles from "./ContactPopup.module.css";
import girlpic from "../image/girl.png";
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

  const submit = async () => {
    if (!email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      setStatus({ type: "error", text: "Please enter a valid email" });
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({ type: "error", text: "Email service not configured" });
      return;
    }
    setSending(true);
    const params = {
      from_name: name || email.split("@")[0] || "",
      from_email: email,
      contact: phone,
      message,
      to_email: CONTACT_TO,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      setStatus({ type: "success", text: "Message sent — thank you!" });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      const text = err && (err.text || err.message || JSON.stringify(err));
      setStatus({ type: "error", text: text || "Failed to send" });
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
        <div>
          <img src={girlpic} alt="Get in touch" className={styles.leftImage} />
        </div>
        <div className={styles.form}>
          <h2>Get in touch</h2>
          <input
            className={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Contact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={styles.submitBtn}
            onClick={submit}
            disabled={sending}
          >
            {sending ? "Sending..." : "Get in touch"}
          </button>
          {status && (
            <div
              className={`${styles.status} ${
                status.type === "success" ? styles.success : styles.error
              }`}
            >
              {status.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
