import React from "react";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — reach out for inquiries or support.</p>

        <div className={styles.cardRow}>
          <div className={styles.card}>
            <h3>Office</h3>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent (demo)");
            }}
          >
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
