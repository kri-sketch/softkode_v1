import React from "react";
import styles from "./GetForm.module.css";
import grouppic from "../../shared/image/group.png"
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
          src={grouppic}
          alt="Group Pic"
        />
      </div>
    </div>
  );
};

export default GetForm;

