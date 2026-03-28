import React, { useState, useEffect } from "react";
import styles from "./Client.module.css";
import { CLIENT_TESTIMONIAL, CLIENT_LOGOS } from "../../shared/constants/clientConstant.ts";

const Client: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = CLIENT_TESTIMONIAL.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000); // 6s duration for smoother reading
    return () => clearInterval(interval);
  }, [total]);

  // Handlers for manual override
  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={styles.testimonialsWrapper} data-reveal>
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      <div className={styles.testimonialHeader}>
        <div className={styles.testimonialCardInner}>
          <div className={styles.leftColumn}>
            <h2>
              What our <br /> <span className={styles.highlight}>clients</span> say
            </h2>
            <p className={styles.subtext}>
              Don't just take our word for it—listen to the founders, builders, and visionaries scaling their business with us globally.
            </p>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.quotesBackgroundIcon}>“</div>
            <div className={styles.carousel}>
              {CLIENT_TESTIMONIAL.map((testimonial, index) => (
                <div
                  className={`${styles.slide} ${index === current ? styles.active : ""}`}
                  key={index}
                >
                  <div className={styles.slideInnerGlass}>
                    <p className={styles.feedback}>{testimonial.message}</p>
                    <div className={styles.clientProfile}>
                      <span className={styles.clientAvatar}>
                        {testimonial.name.charAt(0)}
                      </span>
                      <div className={styles.clientInfo}>
                        <p className={styles.clientName}>{testimonial.name}</p>
                        <p className={styles.clientRole}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className={styles.paginationDots}>
              {CLIENT_TESTIMONIAL.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.dot} ${idx === current ? styles.activeDot : ""}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.logoRowContainer}>
          <h3 className={styles.logoRowTitle}>Trusted by innovative teams</h3>
          <div className={styles.logoRow}>
            {CLIENT_LOGOS.map((logo, index) => (
              <div key={index} className={styles.logoWrap}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
