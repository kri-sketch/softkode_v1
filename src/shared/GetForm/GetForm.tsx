import React, { useRef, useState, useEffect } from "react";
import styles from "./GetForm.module.css";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

const GetForm: React.FC = () => {
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
      } catch (err) {
        console.warn("emailjs.init failed in GetForm:", err);
      }
    }
  }, []);

  const sendEmail = async (payload: {
    name: string;
    email: string;
    contact: string;
    message: string;
  }) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      throw new Error("Email service is not configured.");
    }

    const templateParams = {
      ...payload,
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      to_email: ACCOUNT_EMAIL,
    };

    try {
      emailjs.init(PUBLIC_KEY);
    } catch {
      // ignore if already inited
    }

    const resp = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY,
    );
    return resp;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setStatus(null);

    const form = formRef.current;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      contact: (formData.get("contact") as string) || "",
      message: (formData.get("message") as string) || "",
    };

    try {
      await sendEmail(payload);
      setStatus({ type: "success", text: "Message sent — thank you!" });
      form.reset();
    } catch (err: any) {
      const text = err && (err.text || err.message || JSON.stringify(err));
      setStatus({
        type: "error",
        text: text || "Email send failed. Check configuration.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.contactContainer} data-reveal>
      <div className={styles.formSection}>
        <div className={styles.cardHeader}>
          <h2>Reach out to Us</h2>
          <p>
            Submit your request here or use the quick chat assistant in the
            corner.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={styles.formContent}
        >
          <label className={styles.fieldRow} htmlFor="getform-name">
            <span>Name</span>
            <input
              id="getform-name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>

          <label className={styles.fieldRow} htmlFor="getform-email">
            <span>Email</span>
            <input
              id="getform-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label className={styles.fieldRow} htmlFor="getform-contact">
            <span>Contact</span>
            <input
              id="getform-contact"
              name="contact"
              type="tel"
              placeholder="Enter mobile number"
            />
          </label>

          <label className={styles.fieldRow} htmlFor="getform-message">
            <span>Message</span>
            <textarea
              id="getform-message"
              name="message"
              placeholder="Please enter your message here"
              required
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className={styles.primaryButton}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

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
        </form>
      </div>
    </section>
  );
};

export default GetForm;
