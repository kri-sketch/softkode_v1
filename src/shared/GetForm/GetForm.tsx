import React, { useRef, useState, useEffect } from "react";
import styles from "./GetForm.module.css";
import emailjs from "@emailjs/browser";
import FormHeader from "./FormHeader";
import FormField from "./FormField";
import FormSubmitButton from "./FormSubmitButton";
import StatusMessage from "./StatusMessage";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

interface FormErrors {
  name?: string;
  email?: string;
  contact?: string;
  message?: string;
}

const GetForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
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

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    const form = formRef.current;
    const formData = new FormData(form);

    if (!validateForm(formData)) {
      return;
    }

    setSending(true);
    setStatus(null);

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
      setErrors({});
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
        <div className={styles.formGrid}>
          <aside className={styles.visualPanel} aria-hidden="true">
            <h2 className={styles.sideTitle}>Let's Collaborate</h2>
            <p className={styles.sideSubtitle}>
              Share a brief overview of your needs — we'll follow up with next
              steps.
            </p>
            <div className={styles.sideContact}>
              <div className={styles.sideContactRow}></div>
              <div className={styles.sideContactRow}>
                <strong>Typical reply:</strong>
                <span>1–2 business days</span>
              </div>
            </div>
          </aside>

          <div className={styles.formPanel}>
            <FormHeader title={""} subtitle={""} />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className={styles.formContent}
              noValidate
            >
              <FormField
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                error={errors.name}
                id="getform-name"
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                error={errors.email}
                id="getform-email"
              />

              <FormField
                label="Contact Number"
                name="contact"
                type="tel"
                placeholder="+1 (555) 123-4567"
                id="getform-contact"
              />

              <FormField
                label="Message"
                name="message"
                type="textarea"
                placeholder="Tell us about your project or inquiry..."
                required
                error={errors.message}
                id="getform-message"
              />

              <FormSubmitButton
                isLoading={sending}
                loadingText="Sending..."
                submitText="Send Message"
                disabled={sending}
              />

              {status && (
                <StatusMessage
                  type={status.type}
                  text={status.text}
                  onClose={() => setStatus(null)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetForm;
