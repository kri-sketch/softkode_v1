import React from "react";
import styles from "./Hiring.module.css";

interface FeatureCardProps {
  title: string;
  text: string;
  cta?: string;
  href?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  text,
  cta,
  href = "#",
  delay = 0,
}) => {
  return (
    <article
      className={styles.featureCard}
      style={{ transitionDelay: `${delay}ms` }}
      data-reveal
    >
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{text}</p>
      {cta && (
        <button
          className={styles.featureBtn}
          onClick={() => (window.location.href = href)}
        >
          {cta}
        </button>
      )}
    </article>
  );
};

export default FeatureCard;
