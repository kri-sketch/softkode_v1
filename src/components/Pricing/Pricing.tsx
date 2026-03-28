import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pricing.module.css";
import { PRICING_CARDS } from "../../shared/constants/pricingConstant.ts";

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pricingContainer} data-reveal>
      <div className={styles.pricingGlowBackground} />
      
      <div className={styles.pricingHeader}>
        <h2 className={styles.heading}>
          <span className={styles.highlight}>Pricing</span> plans
        </h2>
        <p className={styles.subheading}>
          Transparent and scalable options tailored precisely to your team's needs.
        </p>
      </div>

      <div className={styles.cardContainer}>
        {PRICING_CARDS.map((card, index) => (
          <div key={index} className={`${styles.card} ${styles[card.theme]}`}>
            <div className={styles.cardGlowEffect} />
            <div className={styles.cardContentWrapper}>
              <h3>
                {card.title.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              <p className={styles.subtitle}>{card.subtitle}</p>
              
              <div className={styles.offerBox}>
                <p className={styles.offer}>{card.offer}</p>
              </div>

              <button 
                className={styles.ctaButton}
                onClick={() => navigate("/contact")}
                aria-label={`Get in touch regarding the ${card.title.replace(/\n/g, ' ')} plan`}
              >
                <span>Get in touch</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
