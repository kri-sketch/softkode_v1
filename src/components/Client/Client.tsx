import React from "react";
import styles from "./Client.module.css";
import { CLIENT_TESTIMONIAL, CLIENT_LOGOS } from "../../shared/constants/clientConstant.ts";

const Client: React.FC = () => {
  return (
    <div className={styles.testimonialsWrapper}>
      <div className={styles.testimonialCard}>
        <div className={styles.leftColumn}>
          <h2>
            What our <span className={styles.highlight}>clients</span> say
          </h2>
        </div>

        <div className={styles.rightColumn}>
          <span className={styles.quoteIcon}>❝</span>
          <p className={styles.feedback}>{CLIENT_TESTIMONIAL.message}</p>
          <p className={styles.clientName}>{CLIENT_TESTIMONIAL.name}</p>
          <p className={styles.clientRole}>{CLIENT_TESTIMONIAL.role}</p>
        </div>
      </div>

      {/* Client logos */}
      <div className={styles.logoRow}>
        {CLIENT_LOGOS.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.alt} />
        ))}
      </div>
    </div>
  );
};

export default Client;
