import React, { useRef, useState, useEffect } from "react";
import styles from "./GetForm.module.css";
import grouppic from "../../shared/image/group.png";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

const GetForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn("emailjs.init failed in GetForm:", err);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "Email service is not configured. Please set EmailJS keys in your environment."
      );
      return;
    }

    setSending(true);
    const form = formRef.current;
    const formData = new FormData(form);
    const templateParams = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      contact: (formData.get("contact") as string) || "",
      message: (formData.get("message") as string) || "",
      from_name: (formData.get("name") as string) || "",
      from_email: (formData.get("email") as string) || "",
      reply_to: (formData.get("email") as string) || "",
      to_email: ACCOUNT_EMAIL,
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
      console.log("GetForm email sent:", resp);
      alert("Message sent — thank you!");
      form.reset();
    } catch (err: any) {
      console.error("GetForm email error:", err);
      const text = err && (err.text || err.message || JSON.stringify(err));
      alert(`Failed to send message: ${text || "unknown error"}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      {/* Left: Form */}
      <div className={styles.formSection}>
        <h2>Get in touch</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              id="getform-name"
              name="name"
              type="text"
              placeholder="Enter name"
              required
            />
          </label>
          <label>
            Email
            <input
              id="getform-email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </label>
          <label>
            Contact
            <input
              id="getform-contact"
              name="contact"
              type="tel"
              placeholder="Enter mobile number"
            />
          </label>
          <label>
            Message
            <textarea
              id="getform-message"
              name="message"
              placeholder="Please enter your message here"
              required
            />
          </label>
          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Get in touch"}
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className={styles.imageSection}>
        <img src={grouppic} alt="Group Pic" />
      </div>
    </div>
  );
};

export default GetForm;
