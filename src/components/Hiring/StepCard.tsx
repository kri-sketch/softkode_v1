import React from "react";
import styles from "./Hiring.module.css";

interface StepCardProps {
  number: number;
  title: string;
  desc?: string;
  delay?: number;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  desc,
  delay = 0,
}) => {
  return (
    <div
      className={styles.stepCard}
      style={{ transitionDelay: `${delay}ms` }}
      data-reveal
    >
      <div className={styles.stepBadge}>{number}</div>
      <div className={styles.stepBody}>
        <div className={styles.stepTitle}>{title}</div>
        {desc && <div className={styles.stepDesc}>{desc}</div>}
      </div>
    </div>
  );
};

export default StepCard;
