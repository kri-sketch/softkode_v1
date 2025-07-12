import React from "react";
import styles from "./Pricing.module.css";
import { PRICING_CARDS } from "../../shared/constants/pricingConstant.ts";

const Pricing: React.FC = () => {
  return (
    <div className={styles.pricingContainer}>
      <h2 className={styles.heading}>
        <span className={styles.highlight}>Pricing</span> plans
      </h2>

      <div className={styles.cardContainer}>
        {PRICING_CARDS.map((card, index) => (
          <div key={index} className={`${styles.card} ${styles[card.theme]}`}>
            <h3>{card.title}</h3>
            <p>{card.subtitle}</p>
            <p className={styles.offer}>{card.offer}</p>
            <button className={styles.button}>Get in touch</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
