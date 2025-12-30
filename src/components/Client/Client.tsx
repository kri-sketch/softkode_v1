import React, { useState, useEffect } from "react";
import styles from "./Client.module.css";
import {
  CLIENT_TESTIMONIAL,
  CLIENT_LOGOS,
} from "../../shared/constants/clientConstant.ts";

const Client: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = CLIENT_TESTIMONIAL.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000); // 5000ms = 5s

    return () => clearInterval(interval); // Clear on unmount
  }, [total]);

  return (
    <div className={`container ${styles.testimonialsWrapper}`}>
      <div className={styles.testimonialHeader}>
        <div className={styles.testimonialCard}>
          <div className={styles.leftColumn}>
            <h2>
              What our <br /> <span className={styles.highlight}>clients</span>{" "}
              say
            </h2>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.quotesColumn}>
              <span className={styles.quoteIcon}>,</span>
              <span className={styles.quoteIcon}>,</span>
            </div>

            <div className={styles.carousel}>
              {CLIENT_TESTIMONIAL.map((testimonial, index) => (
                <div
                  className={`${styles.slide} ${
                    index === current ? styles.active : ""
                  }`}
                  key={index}
                >
                  <p className={styles.feedback}>{testimonial.message}</p>
                  <p className={styles.clientName}>{testimonial.name}</p>
                  <p className={styles.clientRole}>{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client logos */}
        <div className={styles.logoRow}>
          {CLIENT_LOGOS.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
