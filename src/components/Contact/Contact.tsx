import React, { useRef, useState, useEffect } from "react";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";

// IMPORTANT: create a free account at https://www.emailjs.com/ and
// configure a service + template. Provide the IDs below via environment
// variables when building the app so they are embedded at build time.
// Set these in a `.env` (or in your CI) as:
// REACT_APP_EMAILJS_SERVICE_ID=service_xxx
// REACT_APP_EMAILJS_TEMPLATE_ID=template_xxx
// REACT_APP_EMAILJS_PUBLIC_KEY=user_xxx
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL =
  process.env.REACT_APP_EMAILJS_ACCOUNT_EMAIL ||
  "ksharma.datascience@gmail.com";
const TO_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || ACCOUNT_EMAIL || "";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
        console.log("EmailJS initialized with public key.");
      } catch (err) {
        console.error("EmailJS init error:", err);
      }
    } else {
      console.warn(
        "EmailJS public key not set (REACT_APP_EMAILJS_PUBLIC_KEY)."
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "Email service is not configured. Please set EmailJS keys in your environment. See README or .env.example."
      );
      return;
    }

    setSending(true);
    const form = formRef.current;
    const formData = new FormData(form);
    const templateParams = {
      // keep fields your EmailJS template might expect
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      contact: (formData.get("contact") as string) || "",
      message: (formData.get("message") as string) || "",
      // also include the more explicit params we previously used
      from_name: (formData.get("name") as string) || "",
      from_email: (formData.get("email") as string) || "",
      reply_to: (formData.get("email") as string) || "",
      to_email: TO_EMAIL,
    };

    console.log("Attempting to send email with EmailJS", {
      service: SERVICE_ID,
      template: TEMPLATE_ID,
      to: TO_EMAIL,
      accountEmail: ACCOUNT_EMAIL,
      params: templateParams,
    });

    try {
      // ensure EmailJS is initialized (like your working example)
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (initErr) {
        console.warn("emailjs.init warning:", initErr);
      }

      const resp = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      console.log("EmailJS send success:", resp);
      setStatus({ type: "success", text: "Message sent — thank you!" });
      form.reset();
    } catch (err: any) {
      console.error("EmailJS send failed:", err);
      const statusCode = err && err.status;
      const text = err && (err.text || err.message || JSON.stringify(err));
      console.log("EmailJS error status:", statusCode, "text:", text);
      setStatus({
        type: "error",
        text: `Failed to send message: ${text || "unknown error"}`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.inner}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — reach out for inquiries or support.</p>

        <div className={styles.cardRow}>
          <div className={styles.card}>
            <h3>Office</h3>
            {status && (
              <div
                className={
                  status.type === "success"
                    ? styles.successMessage
                    : styles.errorMessage
                }
                role="status"
              >
                {status.text}
              </div>
            )}
            <p>Pune, Maharashtra, India, 411033</p>
          </div>

          <div className={styles.card}>
            <h3>Phone</h3>
            <p>8237989969</p>
          </div>

          <div className={styles.card}>
            <h3>Email</h3>
            <p>krishnasharma@softkode.io</p>
          </div>
        </div>

        <div className={styles.formBox}>
          <h3>Send a message</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" required />
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
