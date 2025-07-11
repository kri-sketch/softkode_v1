import React from "react";
import styles from "./GetForm.module.css";

const GetForm: React.FC = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Left: Form */}
      <div className={styles.formSection}>
        <h2>Get in touch</h2>
        <form>
          <label>
            Name
            <input type="text" placeholder="Enter name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter email" />
          </label>
          <label>
            Contact
            <input type="tel" placeholder="Enter mobile number" />
          </label>
          <label>
            Message
            <textarea placeholder="Please enter your message here" />
          </label>
          <button type="submit">Get in touch</button>
        </form>
      </div>

      {/* Right: Image */}
      <div className={styles.imageSection}>
        <img
          src="https://images.unsplash.com/photo-1639762688331-fb12e081aadf"
          alt="Team working"
        />
      </div>
    </div>
  );
};

export default GetForm;

