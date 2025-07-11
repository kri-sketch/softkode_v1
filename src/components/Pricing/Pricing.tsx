import React from "react";
import styles from "./Pricing.module.css";

const Pricing: React.FC = () => {
  return (
    <div className={styles.pricingContainer}>
      <h2 className={styles.heading}>
        <span className={styles.highlight}>Pricing</span> plans
      </h2>

      <div className={styles.cardContainer}>
        {/* Card 1 */}
        <div className={`${styles.card} ${styles.pink}`}>
          <h3>Get a consultant</h3>
          <p>Get Instant Access to Top Talent!</p>
          <p className={styles.offer}>Limited Offer: Get 20% OFF on your first Quick Call Consultation!</p>
          <button className={styles.button}>Get in touch</button>
        </div>

        {/* Card 2 */}
        <div className={`${styles.card} ${styles.purple}`}>
          <h3>Yearly Services - Contact Sales</h3>
          <p>Scale Your Business with Dedicated Yearly Support</p>
          <p className={styles.offer}>Exclusive Offer: Get 3 Months FREE on an annual plan!</p>
          <button className={styles.button}>Get in touch</button>
        </div>

        {/* Card 3 */}
        <div className={`${styles.card} ${styles.blue}`}>
          <h3>Magic with Web Development</h3>
          <p>Stay Ahead with Cutting-Edge Web Technologies!</p>
          <p className={styles.offer}>Special Offer: Get 1 FREE Consultation when you add “Magic with Web Development” to your cart!</p>
          <button className={styles.button}>Get in touch</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
